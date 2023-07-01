import express from "express";
import {
  requestDemo,
  requestSmartProbe,
  requestFarm,
  requestNews,
  sendConcern,
} from "../../../controllers/Users/website/requests.js";

const router = express.Router();

//Request Demo
router.post("/demo", requestDemo);

//Request Smart Probe
router.post("/smartProbe", requestSmartProbe);

//Request Farm
router.post("/farm", requestFarm);

//Request News
router.post("/news", requestNews);

//Send Concern
router.post("/concern", sendConcern);

export default router;
