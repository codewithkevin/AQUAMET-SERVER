import mongoose from "mongoose";
import Joi from "joi";
import dotenv from "dotenv";

const smartProbe = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
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
  numberOfProbes: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 1255,
  },
  location: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1255,
  },
});

const SmartProbe = mongoose.model("smartProbeRequest", smartProbe);

function validateRequest(user) {
  const schema = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    location: Joi.string().min(1).max(255).required(),
    numberOfProbes: Joi.number().min(1).max(1255).required(),
    phoneNumber: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export { SmartProbe, validateRequest };
