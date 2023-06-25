import express from "express";
import auth from "../../middleware/auth.js";
import adminAuth from "../../middleware/admin.js";
import { createBlog } from "../../controllers/Admin/blog.controller.js";

const router = express.Router();

//Get All Demo Requests
router.post("/create", [auth, adminAuth], createBlog);

export default router;
