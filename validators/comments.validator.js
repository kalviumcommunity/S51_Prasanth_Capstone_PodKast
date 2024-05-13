const Joi = require('joi');

// Define Joi validation schema for comments
const commentValidationSchema = Joi.object({
  content: Joi.string().required(),
  user: Joi.string().required(),
  createdAt: Joi.date().default(Date.now),
  likes: Joi.number().default(0),
});

// Function to validate comment data
const validateComment = (data) => {
  // Validate data using Joi, with options passed as an object
  const result = commentValidationSchema.validate(data, { abortEarly: false });

  // Return validated data and any error details
  return {
    value: result.value,
    error: result.error ? result.error.details : null,
  };
};

module.exports = validateComment;