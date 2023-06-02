import express from "express";
import { requestDemo, requestSmartProbe } from "../../../controllers/Users/website/requests.js";

const router = express.Router();

//Request Demo
router.post("/demo", requestDemo);


//Request Smart Probe
router.post("/smartProbe", requestSmartProbe);

export default router;
