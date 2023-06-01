import express from "express";
import { requestDemo } from "../../../controllers/Users/website/demoController.js";

const router = express.Router();

//Create Admin Account
router.post("/requestdemo", requestDemo);

export default router;
