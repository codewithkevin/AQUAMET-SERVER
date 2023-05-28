import bcrypt from "bcrypt";
import { validate, User } from "../../model/Admin/adminAccount.js";
import asyncMiddleware from "../../middleware/asyncMiddleware.js";

const createAdminAccount = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user != process.env.ADMIN_MAIL1)
    return res.status(400).send("Account Forbiden, use approved email account");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const result = _.pick(user, ["_id", "name", "email"]);
  res.send(result);
});

export { createAdminAccount };
