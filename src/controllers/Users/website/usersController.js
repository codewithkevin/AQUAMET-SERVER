import { User, validateUser } from "../../../model/Users/website/users.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import Joi from "joi";

//Create a new Account
const createUserAccount = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ message: "User already registered" });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const result = _.pick(user, ["_id", "name", "email"]);
  const token = user.generateAuthToken();

  res.status(200).send({ result, token });
};

//Login In User Account
const loginUserAccount = async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: "Invalid Email" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ message: "Invalid Password" });

  const token = user.generateAuthToken();

  res.status(200).send({ token });
};

//Get User credentials
const getUserAccount = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).send(user);
};

function loginValidate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export { createUserAccount, loginUserAccount, getUserAccount };
