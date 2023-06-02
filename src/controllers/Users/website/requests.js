import { Demo, validateDemo } from "../../../model/Users/website/demo.js";
import {
  SmartProbe,
  validateRequest,
} from "../../../model/Users/website/smartProbe.js";
import {
  FarmRequest,
  validateFarmRequest,
} from "../../../model/Users/website/farmRequest.js";
import _ from "lodash";

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

const requestSmartProbe = async (req, res) => {
  const { error } = validateRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let request = new SmartProbe(
    _.pick(req.body, [
      "phoneNumber",
      "firstName",
      "lastName",
      "email",
      "location",
      "numberOfProbes",
    ])
  );
  await request.save();

  res.status(200).send({ request });
};

const requestFarm = async (req, res) => {
  const { error } = validateFarmRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let request = new FarmRequest(
    _.pick(req.body, [
      "phoneNumber",
      "firstName",
      "lastName",
      "email",
      "location",
      "numberOfProbes",
      "farmSize",
    ])
  );
  await request.save();

  res.status(200).send({ request });
};

export { requestDemo, requestSmartProbe };