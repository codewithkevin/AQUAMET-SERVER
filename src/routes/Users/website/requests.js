import express from "express";
import {
  requestDemo,
  requestSmartProbe,
  requestFarm,
} from "../../../controllers/Users/website/requests.js";

const router = express.Router();

//Request Demo
router.post("/demo", requestDemo);

//Request Smart Probe
router.post("/smartProbe", requestSmartProbe);

//Request Farm
router.post("/farm", requestFarm);

export default router;
