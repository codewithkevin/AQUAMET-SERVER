import express from "express";
import {
  createAdminAccount,
  loginAdminAccount,
  getAdminDetails,
  logoutAdminAccount,
} from "../../controllers/Admin/adminAccount.js";
import auth from "../../middleware/auth.js";
import adminAuth from "../../middleware/admin.js";

const router = express.Router();

//Create Admin Account
router.post("/create", createAdminAccount);

//Login Admin Account
router.post("/login", loginAdminAccount);

//Get Admin Details
router.get("/me", [auth, adminAuth], getAdminDetails);

//Logout Admin Account
router.post("/logout", logoutAdminAccount);

export default router;
