import mongoose from "mongoose";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const validRoles = ["CTO", "CEO", "CMO"];
const allowedEmails = [
  "frankowusuakw@gmail.com",
  "gabriellorlornyo@gmail.com",
  "priscybrems18@gmail.com",
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
  roles: {
    type: [String],
    required: true,
    validate: {
      validator: function (roles) {
        return roles.every((role) => validRoles.includes(role));
      },
      message: "Invalid role(s) provided.",
    },
    default: validRoles,
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
      .required(),
    password: passwordComplexity(complexityOptions).required(),
    role: Joi.string().valid("CTO", "CEO", "CMO").required(),
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
