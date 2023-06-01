import { Demo, validateDemo } from "../../../model/Users/website/demo.js";
import _ from "lodash";

//Create a new Account
const requestDemo = async (req, res) => {
  const { error } = validateDemo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let demo = await Demo.findOne({ phoneNumber: req.body.phoneNumber });
  if (demo) return res.status(400).send("Demo Already Submmitted");

  demo = new Demo(
    _.pick(req.body, ["phoneNumber", "firstName", "lastName", "email"])
  );
  await demo.save();

  res.status(200).send({ demo });
};

export { requestDemo };
