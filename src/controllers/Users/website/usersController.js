import { User, validateUser } from "../../../model/Users/website/users.js";
import _ from "lodash";
import bcrypt from "bcrypt";

//Create a new Account
const createUserAccount = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Acoount Already Registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const result = _.pick(user, ["_id", "name", "email"]);
  const token = user.generateAuthToken();

  res.status(200).send({ result, token });
};

export { createUserAccount };
