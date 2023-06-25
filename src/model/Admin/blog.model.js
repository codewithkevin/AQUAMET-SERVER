import mongoose from "mongoose";
import Joi from "joi";
import { User } from "../../model/Admin/auth/admin.model.js";

const blogSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adminaccount",
    },
  },
  { timestamps: true }
);

// Populate the user properties when retrieving a blog
blogSchema.pre("findOne", function (next) {
  this.populate({ path: "user", model: "Adminaccount", select: "-password" });
  next();
});

const Blog = mongoose.model("adminBlog", blogSchema);

function validateBlog(blog) {
  const schema = Joi.object({
    heading: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string().required(),
  });

  return schema.validate(blog);
}

export { Blog, validateBlog };
