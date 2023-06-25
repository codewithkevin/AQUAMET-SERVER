import express from "express";
import auth from "../../middleware/auth.js";
import adminAuth from "../../middleware/admin.js";
import {
  getDemoRequests,
  getSmartProbeRequests,
  getFarmRequests,
} from "../../controllers/Admin/webrequest.controller.js";

const router = express.Router();

//Get All Demo Requests
router.get("/demo", [auth, adminAuth], getDemoRequests);

//Get All SmartProbe Requests
router.get("/smartprobe", [auth, adminAuth], getSmartProbeRequests);

//Get All Farm Requests
router.get("/farm", [auth, adminAuth], getFarmRequests);

export default router;
