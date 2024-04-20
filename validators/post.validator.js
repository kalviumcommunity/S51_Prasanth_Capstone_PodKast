const Joi = require("joi");

// Define Joi validation schemas
const podcastValidationSchema = Joi.object({
  title: Joi.string().required(),
  audiosrc: Joi.string().required(),
  artists: Joi.array().items(Joi.string()).required(),
  coverpic: Joi.string().required(),
});

const postValidationSchema = Joi.object({
  content: Joi.string().required(),
  likes: Joi.number().default(0),
  dislikes: Joi.number().default(0),
  createdAt: Joi.date().default(Date.now),
  podcast: podcastValidationSchema.optional(),
});

const validatePost = (data) => {
  const result = postValidationSchema.validate(data, { abortEarly: false });
  return {
    value: result.value,
    error: result.error ? result.error.details : null,
  };
};

module.exports = validatePost;