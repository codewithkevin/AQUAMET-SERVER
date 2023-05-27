import mongoose from "mongoose";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
    trim: true,
    unique: true,
    default: [process.env.ADMIN_MAIL1, process.env.ADMIN_MAIL2],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,

    maxlength: 30,
    trim: true,
    lowercase: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const complexityOptions = {
    min: 5,
    max: 255,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    requirementCount: 4,
  };

  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(complexityOptions).required(),
  });

  return schema.validate(user);
}

export default User;
