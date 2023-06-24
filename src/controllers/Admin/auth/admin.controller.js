import bcrypt from "bcrypt";
import axios from "axios";
import _ from "lodash";
import dotenv from "dotenv";
import Joi from "joi";
import {
  validate,
  User,
  validateUpdate,
} from "../../../model/Admin/auth/admin.model.js";
import { generateConfirmationCode } from "../../../functions/generateCode.js";
import sendConfirmationCode from "../../../functions/Gmail/otp.js";
import asyncMiddleware from "../../../middleware/asyncMiddleware.js";
import sendWelcomeMessage from "../../../functions/Gmail/welcomeMessage.js";

dotenv.config();

const accountEmail = process.env.EMAIL;
const revokedTokens = [];

const createAdminAccount = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });

  const existUser = await User.findOne({
    personalEmail: req.body.personalEmail,
  });

  if (existUser) return res.status(400).send({ message: "Email already used" });

  if (req.body.email !== accountEmail)
    return res.status(400).send({ message: "Email not recognized by company" });

  const existingAdminAccountsCount = await User.countDocuments({
    email: accountEmail,
  });
  if (req.body.email === accountEmail && existingAdminAccountsCount >= 3) {
    return res
      .status(400)
      .send({ message: "Maximum number of admin accounts reached" });
  }

  user = new User(
    _.pick(req.body, ["name", "email", "password", "role", "personalEmail"])
  );
  if (req.body.email === accountEmail) {
    user.isAdmin = true;
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const result = _.pick(user, [
    "name",
    "email",
    "role",
    "personalEmail",
    "_id",
  ]);
  const token = user.generateAuthToken();

  res.status(200).send({ result, token });
};

const loginAdminAccount = async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findById(req.body.id);
  if (!user) return res.status(400).send({ message: "Invalid ID" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ message: "Invalid Password" });

  const token = user.generateAuthToken();

  // Get request details
  const ip = req.ip; // Assuming you want the IP address of the requester

  try {
    const locationResponse = await axios.get(
      `https://api.ipify.org?format=json`
    );
    const { ip } = locationResponse.data;

    const geolocationResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
    const { city, region, country_name } = geolocationResponse.data;

    const location = `${city}, ${region}, ${country_name}`;

    const device = req.headers["user-agent"]; // User Agent header contains device information
    const time = new Date().toISOString(); // Get the current time in ISO format

    const data = { location, device, time };

    res.status(200).send({ result: token, data });
  } catch (error) {
    console.error("Error retrieving location:", error);
    res.status(500).send({ message: "Error retrieving location" });
  }
};
const getAdminDetails = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.send(user);
};

const logoutAdminAccount = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (revokedTokens.includes(token)) {
    return res.status(401).send({ message: "Already logged out" });
  }

  revokedTokens.push(token);

  res.status(200).send({ message: "Successfully logged out" });
};

const getAdminAccounts = async (req, res) => {
  const users = await User.find({}).select("-password").sort("name");
  res.send(users);
};

const updateAdminAccount = async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!user) return res.status(404).send({ message: "The user was not found" });

  res.send(user);
};

const resetAdminPassword = async (req, res) => {
  const { error } = validatePassword(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { newPassword, oldPassword } = req.body;

  let user = await User.findOne({ personalEmail: req.body.personalEmail });
  if (!user) return res.status(404).send({ message: "User not found" });

  const validPassword = await bcrypt.compare(oldPassword, user.password);
  if (!validPassword)
    return res.status(400).send({ message: "Invalid password" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.status(200).send({ message: "Password reset successful" });
};

const sendOtp = async (req, res) => {
  const { personalEmail } = req.body;

  const confirmationCode = generateConfirmationCode().toString(); // convert to string
  console.log(`ConfirmationCode: ${confirmationCode}`);

  const user = await User.findOne({ personalEmail });

  if (!user) {
    res.status(400).send({ message: "User not found" });
  }

  user.confirmationCode = confirmationCode;
  await user.save();
  sendConfirmationCode(personalEmail, confirmationCode);

  res.status(200).json({ message: "Confirmation code sent." });
};

const verifyCode = async (req, res) => {
  const { personalEmail, code } = req.body;

  const user = await User.findOne({ personalEmail });

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  if (user.confirmationCode !== code) {
    return res.status(400).send({ message: "Invalid confirmation code" });
  }

  // Code is valid, perform further actions

  res.status(200).json({ message: "Code verified successfully." });
};

const welcomeMessage = async (req, res) => {
  const { personalEmail } = req.body;

  const user = await User.findOne({ personalEmail });

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  let email = user.personalEmail;
  let name = user.name;
  let role = user.role;
  let _id = user._id;

  try {
    await sendWelcomeMessage(email, name, role, _id);
    res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
};

function loginValidate(user) {
  const schema = Joi.object({
    id: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

function validatePassword(user) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(5).max(255).required(),
    newPassword: Joi.string().min(5).max(255).required(),
    personalEmail: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export {
  createAdminAccount,
  loginAdminAccount,
  getAdminDetails,
  logoutAdminAccount,
  getAdminAccounts,
  updateAdminAccount,
  sendOtp,
  verifyCode,
  welcomeMessage,
  resetAdminPassword,
};
