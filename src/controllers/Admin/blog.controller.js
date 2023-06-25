import { Blog, validateBlog } from "../../model/Admin/blog.model.js";
import { User } from "../../model/Admin/auth/admin.model.js";

//Create a blog
const createBlog = async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let blog;
  try {
    // Create the blog
    blog = new Blog(req.body);
    blog.user = req.user._id;
    await blog.save();
  } catch (error) {
    res.status(500).send({ message: "Failed to create the blog" });
    console.error("Error creating the blog:", error);
    return;
  }

  try {
    // Increment the numberofPosts of the user by one
    await User.findByIdAndUpdate(req.user._id, { $inc: { numberofPosts: 1 } });

    res.status(200).send({ blog });
    console.log("Blog created successfully");
  } catch (error) {
    // Rollback the blog creation
    await Blog.findByIdAndDelete(blog._id);

    res.status(500).send({ message: "Failed to create the blog" });
    console.error("Error updating the user:", error);
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!blog) return res.status(404).send({ message: "Blog not found" });

  res.status(200).send({ blog });
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).send({ message: "Blog not found" });

  res.status(200).send({ message: "Blog deleted successfully" });
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().sort("-createdAt");
  res.status(200).send({ blogs });
};

// Get a blog
const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).send({ message: "Blog not found" });

  res.status(200).send({ blog });
};

export { createBlog, updateBlog, deleteBlog, getAllBlogs, getBlog };
