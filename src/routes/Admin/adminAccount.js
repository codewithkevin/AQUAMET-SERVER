import express from "express";
import {
  createAdminAccount,
  loginAdminAccount,
  getAdminDetails,
} from "../../controllers/Admin/adminAccount.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

//Create Admin Account
router.post("/create", createAdminAccount);

//Login Admin Account
router.post("/login", loginAdminAccount);

//Get Admin Details
router.get("/me", auth, getAdminDetails);

export default router;
