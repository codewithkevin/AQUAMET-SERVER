import bcrypt from "bcrypt";
import { validate, User } from "../../model/Admin/adminAccount.js";
import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import _ from "lodash";
import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const accountEmail = process.env.ADMIN_MAIL2;
const revokedTokens = [];

const createAdminAccount = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (req.body.email !== accountEmail)
    return res.status(400).send("Used Approved Email Accounts Only.");

  const existingAdminAccountsCount = await User.countDocuments({
    email: accountEmail,
  });
  if (req.body.email === accountEmail && existingAdminAccountsCount >= 5) {
    return res
      .status(400)
      .send("Maximum admin accounts reached for this email.");
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  if (req.body.email === accountEmail) {
    user.isAdmin = true;
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const result = _.pick(user, ["_id", "name", "email", "isAdmin"]);
  const token = user.generateAuthToken();

  res.status(200).send({ result, token });
};

const loginAdminAccount = async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.body.id);
  if (!user) return res.status(400).send("Invalid ID");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  const token = user.generateAuthToken();

  res.status(200).send({ result: token });
};

const getAdminDetails = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.send(user);
};

const logoutAdminAccount = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (revokedTokens.includes(token)) {
    return res.status(401).send("Token has already been revoked");
  }

  revokedTokens.push(token);

  res.status(200).send({ message: "Successfully logged out" });
};

function loginValidate(user) {
  const schema = Joi.object({
    id: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export {
  createAdminAccount,
  loginAdminAccount,
  getAdminDetails,
  logoutAdminAccount,
};
