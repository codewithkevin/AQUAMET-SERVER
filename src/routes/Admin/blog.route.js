import express from "express";
import auth from "../../middleware/auth.js";
import adminAuth from "../../middleware/admin.js";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
} from "../../controllers/Admin/blog.controller.js";

const router = express.Router();

//Create a blog
router.post("/create", [auth, adminAuth], createBlog);

// Update a blog
router.put("/update/:id", [auth, adminAuth], updateBlog);

// Delete a blog
router.delete("/delete/:id", [auth, adminAuth], deleteBlog);

// Get all blogs
router.get("/all", [auth, adminAuth], getAllBlogs);

// Get a blog
router.get("/:id", [auth, adminAuth], getBlog);

export default router;
