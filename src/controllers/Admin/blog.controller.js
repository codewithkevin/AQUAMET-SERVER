import { Blog, validateBlog } from '../../model/Admin/blog.model.js';
import { User } from '../../model/Admin/auth/admin.model.js';
import mongoose from 'mongoose';

const createBlog = async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create the blog
    const blog = new Blog(req.body);

    // Associate the blog with the user
    blog.user = req.user._id;

    // Save the blog to the database
    await blog.save({ session });

    // Increment the numberofPosts of the user by one
    await User.findByIdAndUpdate(req.user._id, { $inc: { numberofPosts: 1 } }, { session });

    await session.commitTransaction();
    res.status(200).send({ blog });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).send({ message: 'An error occurred during the transaction.' });
  } finally {
    session.endSession();
  }
};

export { createBlog };
