import express from "express";
import { createUserAccount } from "../../../controllers/Users/website/usersController.js";
import auth from "../../../middleware/auth.js";

const router = express.Router();

//Create Admin Account
router.post("/signup", createUserAccount);

export default router;
