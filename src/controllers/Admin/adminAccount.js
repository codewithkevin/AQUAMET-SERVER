import bcrypt from "bcrypt";
import { validate, User } from "../../model/Admin/adminAccount.js";
import asyncMiddleware from "../../middleware/asyncMiddleware.js";
import _ from "lodash";
import dotenv from "dotenv";

dotenv.config();

const accountEmail = process.env.ADMIN_MAIL1;

const createAdminAccount = asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userWithEmail = await User.findOne({ email: req.body.email });
  if (userWithEmail && userWithEmail.email !== accountEmail) {
    return res.status(400).send("Used Approved Email Accounts Only.");
  }

  const existingAdminAccountsCount = await User.countDocuments({
    email: accountEmail,
  });
  if (req.body.email === accountEmail && existingAdminAccountsCount >= 5) {
    return res
      .status(400)
      .send("Maximum admin accounts reached for this email.");
  }

  const user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const result = _.pick(user, ["_id", "name", "email"]);
  res.send(result);
});

export { createAdminAccount };
