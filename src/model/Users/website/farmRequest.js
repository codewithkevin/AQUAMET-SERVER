import mongoose from "mongoose";
import Joi from "joi";
import dotenv from "dotenv";

dotenv.config();

const newFarmRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      minlength: 2,
      maxlength: 250,
      required: true,
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
      min: 1,
      max: 1255,
      required: true,
    },
    idtype: {
      type: String,
      required: true,
    },
    idnumber: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    location: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1255,
    },
    farmlocationInfo: {
      type: String,
      minlength: 1,
      maxlength: 7980,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    farmFacilities: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
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
  },
  { timestamps: true }
);

const FarmRequest = mongoose.model("newFarmRequest", newFarmRequestSchema);

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
