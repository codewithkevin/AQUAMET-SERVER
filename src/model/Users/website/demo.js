import mongoose from "mongoose";
import Joi from "joi";
import dotenv from "dotenv";

const demoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

const Demo = mongoose.model("demoRequest", demoSchema);

function validateDemo(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phoneNumber: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export { Demo, validateDemo };
