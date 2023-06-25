import { Blog, validateBlog } from "../../model/Admin/blog.model.js";
import { User } from "../../model/Admin/auth/admin.model.js";

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

export { createBlog };
