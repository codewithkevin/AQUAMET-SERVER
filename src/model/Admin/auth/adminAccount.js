import mongoose from "mongoose";
import Joi from "joi";
import { default as passwordComplexity } from "joi-password-complexity";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import config from "config";

dotenv.config();

const jwt_key = config.get("jwtPrivateKey");

//ADMINS EMAILS
const admin1 = config.get("admin_user1");
const admin2 = config.get("admin_user2");
const admin3 = config.get("admin_user3");
const admin4 = config.get("admin_user4");

//ADMINS ROLE
const admin_role1 = config.get("admin_role1");
const admin_role2 = config.get("admin_role2");
const admin_role3 = config.get("admin_role3");

const validRoles = [admin_role1, admin_role2, admin_role3];
const allowedEmails = [admin1, admin2, admin3, admin4];

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
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      name: this.name,
      personalEmail: this.personalEmail,
    },
    jwt_key
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
