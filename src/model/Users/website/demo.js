import mongoose from "mongoose";
import Joi from "joi";
import dotenv from "dotenv";

const demoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
  phoneNumber: {
    type: String,
  },
});

const Demo = mongoose.model("demoRequest", demoSchema);

function validateDemo(user) {
  const schema = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().max(255).required().email(),
    phoneNumber: Joi.string().optional(),
  });

  return schema.validate(user);
}

export { Demo, validateDemo };
