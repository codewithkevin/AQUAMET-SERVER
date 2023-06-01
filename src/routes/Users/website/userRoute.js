import express from "express";
import {
  createUserAccount,
  loginUserAccount,
  getUserAccount,
} from "../../../controllers/Users/website/usersController.js";
import auth from "../../../middleware/auth.js";

const router = express.Router();

//Create Web User Account
router.post("/signup", createUserAccount);

//Login User Account
router.post("/login", loginUserAccount);

//Get User Account Profile
router.get("/me", auth, getUserAccount);

export default router;
