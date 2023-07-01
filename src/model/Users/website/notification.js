import mongoose from "mongoose";
import Joi from "joi";

const notificationSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    maxlength: 255,
  },
});

const Notification = mongoose.model("notification", notificationSchema);

function validateNotice(user) {
  const schema = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().max(255).required().email(),
    phoneNumber: Joi.string(),
    message: Joi.string().max(255).required(),
  });

  return schema.validate(user);
}

export { Notification, validateNotice };
