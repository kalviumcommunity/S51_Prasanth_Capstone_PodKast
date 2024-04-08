const Joi = require('joi');

const publicProfileSchema = Joi.object({
  bio: Joi.string(),
  location: Joi.string(),
  website: Joi.string(),
  socialMedia: Joi.object({
    twitter: Joi.string().allow(''),
    linkedin: Joi.string().allow(''),
    instagram: Joi.string().allow('')
  }).required()
});

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  publicUserID: Joi.string(),
  avatar: Joi.string().required(),
  publicProfile: publicProfileSchema.required(),
  password: Joi.string().required()
});


const userValidator = (data) => {
  return userSchema.validate(data, { abortEarly: false });
};

module.exports = userValidator;
