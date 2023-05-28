import express from "express";
import { createAdminAccount, loginAdminAccount } from "../../controllers/Admin/adminAccount.js";

const router = express.Router();

//Create Admin Account
router.post("/create", createAdminAccount);

//Login Admin Account
router.post("/login", loginAdminAccount);

export default router;
