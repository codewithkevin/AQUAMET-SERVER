import mongoose from "mongoose";
import Joi from "joi";
import dotenv from "dotenv";

const newFarmRequest = new mongoose.Schema({
  fullName: {
    type: String,
    minLength: 2,
    maxLength: 250,
    required: true,
    maxlength: 50,
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
  age: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 1255,
  },
  idtype: {
    type: String,
    required: true,
  },
  idnumber: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  location: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1255,
  },
  farmlocationInfo: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 7980,
  },
  farmFacilities: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
    required: true,
    validate: {
      validator: function (array) {
        return array.length >= 1 && array.length <= 5;
      },
      message: "farmFacilities must have at least 1 and at most 5 elements",
    },
  },
  meetingVenue: {
    type: String,
    required: true,
  },
});

const FarmRequest = mongoose.model("newFarmRequest", newFarmRequest);

function validateFarmRequest(user) {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(250).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phoneNumber: Joi.string().min(5).max(255).required(),
    age: Joi.number().min(1).max(1255).required(),
    idtype: Joi.string().required(),
    idnumber: Joi.string().min(5).max(255).required(),
    location: Joi.string().min(1).max(1255).required(),
    farmlocationInfo: Joi.string().min(1).max(7980).required(),
    farmFacilities: Joi.array().items(Joi.string()).min(1).max(5).required(),
    meetingVenue: Joi.string().required(),
  });

  return schema.validate(user);
}

export { FarmRequest, validateFarmRequest };
