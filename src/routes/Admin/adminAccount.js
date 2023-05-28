import express from "express";
import { createAdminAccount } from "../../controllers/Admin/adminAccount.js";

const router = express.Router();

//Create Admin Account
router.post("/create");

//Login Admin Account
router.post("/login");

export default router;
