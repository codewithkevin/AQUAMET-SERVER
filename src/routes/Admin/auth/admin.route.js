import express from "express";
import {
  createAdminAccount,
  loginAdminAccount,
  getAdminDetails,
  logoutAdminAccount,
  getAdminAccounts,
  updateAdminAccount,
  sendOtp,
  verifyCode,
  welcomeMessage,
  resetAdminPassword,
} from "../../../controllers/Admin/auth/admin.controller.js";
import auth from "../../../middleware/auth.js";
import adminAuth from "../../../middleware/admin.js";

const router = express.Router();

//Create Admin Account
router.post("/create", createAdminAccount);

//Login Admin Account
router.post("/login", loginAdminAccount);

//Get Admin Details
router.get("/me", [auth, adminAuth], getAdminDetails);

//Logout Admin Account
router.post("/logout", [auth, adminAuth], logoutAdminAccount);

//Get all Admin Account
router.get("/adminaccounts", [auth, adminAuth], getAdminAccounts);

//Update Admin Account
router.put("/update/:id", [auth, adminAuth], updateAdminAccount);

//Reset Admin Password
router.put("/resetpassword", resetAdminPassword);

//Send OTP
router.post("/sendotp", sendOtp);

//Verify Code
router.post("/verifycode", verifyCode);

//Send Welcome Message
router.post("/welcomemessage", welcomeMessage);

export default router;
