import { Demo, validateDemo } from "../../../model/Users/website/demo.js";
import {
  SmartProbe,
  validateRequest,
} from "../../../model/Users/website/smartProbe.js";
import {
  FarmRequest,
  validateFarmRequest,
} from "../../../model/Users/website/farmRequest.js";
import {
  NewsRequest,
  validateNews,
} from "../../../model/Users/website/news.js";
import {
  Notification,
  validateNotice,
} from "../../../model/Users/website/notification.js";
import _ from "lodash";

const requestDemo = async (req, res) => {
  const { error } = validateDemo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let demo = await Demo.findOne({ email: req.body.email });
  if (demo) return res.status(400).send("Demo already requested");

  demo = new Demo(req.body);

  await demo.save();

  res.status(200).send({ demo });
};

const requestSmartProbe = async (req, res) => {
  const { error } = validateRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let request = await SmartProbe.findOne({ phoneNumber: req.body.phoneNumber });
  if (request) return res.status(400).send("Request already sent");

  request = new SmartProbe(req.body);

  await request.save();

  res.status(200).send({ request });
};

const requestFarm = async (req, res) => {
  const { error } = validateFarmRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let request = await FarmRequest.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (request) return res.status(400).send("Request already sent");

  request = new FarmRequest(req.body);

  await request.save();

  res.status(200).send({ request });
};

const requestNews = async (req, res) => {
  const { error } = validateNews(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let newsRequest = await NewsRequest.findOne({ email: req.body.email });
  if (newsRequest) return res.status(400).send("Email already Subscribed");

  newsRequest = new NewsRequest({
    email: req.body.email,
  });

  await newsRequest.save();

  res.status(200).send({ newsRequest });
};

const sendConcern = async (req, res) => {
  const { error } = validateNotice(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const notification = new Notification(req.body);

  await notification.save();

  res.status(200).send({ notification });
};

export {
  requestDemo,
  requestSmartProbe,
  requestFarm,
  requestNews,
  sendConcern,
};
