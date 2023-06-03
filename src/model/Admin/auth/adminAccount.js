import mongoose from "mongoose";
import Joi from "joi";
import { default as passwordComplexity } from "joi-password-complexity";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const validRoles = [
  process.env.ADMIN_ROLE1,
  process.env.ADMIN_ROLE2,
  process.env.ADMIN_ROLE3,
];
const allowedEmails = [
  process.env.ADMIN_USER1,
  process.env.ADMIN_USER2,
  process.env.ADMIN_USER3,
  process.env.ADMIN_USER4,
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  role: {
    type: String,
    required: true,
  },
  personalEmail: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    validate: {
      validator: function (personalEmail) {
        return allowedEmails.includes(personalEmail); // Use personalEmail instead of email
      },
      message: "Access denied. Invalid email.",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  confirmationCode: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin, name: this.name },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("Adminaccount", userSchema);

function validate(user) {
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
    personalEmail: Joi.string()
      .valid(...allowedEmails)
      .required()
      .messages({
        "any.only": "Email not recognized, use a valid email address",
        "any.required": "Personal email is required",
      }),
    password: passwordComplexity(complexityOptions).required(),
    role: Joi.string()
      .valid(...validRoles)
      .required()
      .messages({
        "any.only": "Role not recognized, use a valid role",
        "any.required": "Role is required",
      }),
  });

  return schema.validate(user);
}

function validateUpdate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(user);
}

export { User, validate, validateUpdate };
