import mongoose from "mongoose";
import Joi from "joi";

const newsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
});

const NewsRequest = mongoose.model("newsRequest", newsSchema);

function validateNews(user) {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
  });

  return schema.validate(user);
}

export { NewsRequest, validateNews };
