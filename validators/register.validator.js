const Joi = require('joi');

const publicProfileSchema = Joi.object({
  bio: Joi.string().optional(),
  location: Joi.string().optional(),
  website: Joi.string().optional(),
  socialMedia: socialMediaSchema.optional()
}).optional();

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  publicUserID: Joi.string().optional(),
  avatar: Joi.string().optional(),
  publicProfile: publicProfileSchema.optional(),
  password: Joi.string().required()
});


const userValidator = (data) => {
  return userSchema.validate(data, { abortEarly: false });
};

module.exports = userValidator;
