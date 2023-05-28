import bcrypt from "bcrypt";
import { validate, User } from "../../model/Admin/adminAccount.js";
import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import _ from "lodash";
import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const accountEmail = process.env.ADMIN_MAIL2;

const createAdminAccount = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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

  let user = new User(_.pick(req.body, ["name", "email", "password"]));
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

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const vaildPAssword = await bcrypt.compare(req.body.password, user.password);
  if (!vaildPAssword) return res.status(400).send("Invalid password");

  const token = user.generateAuthToken();

  res.status(200).send({ result: token });
};

function loginValidate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export { createAdminAccount, loginAdminAccount };
