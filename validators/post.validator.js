const Joi = require('joi');

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
  postID: Joi.string().required().min(1),
  createdAt: Joi.date().default(Date.now),
  podcast: podcastValidationSchema.optional(),
  publicUserID: Joi.string().required(),
});

// Function to validate post data
const validatePost = (data) => {
  // Validate data using Joi, with options passed as an object
  const result = postValidationSchema.validate(data, { abortEarly: false });

  // Return validated data and any error details
  return {
    value: result.value,
    error: result.error ? result.error.details : null,
  };
};

module.exports = validatePost;
