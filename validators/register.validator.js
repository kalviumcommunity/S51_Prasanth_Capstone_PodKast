const Joi = require('joi');

const socialMediaSchema = Joi.object({
  twitter: Joi.string().optional(),
  linkedin: Joi.string().optional(),
  instagram: Joi.string().optional()
}).optional();

const publicProfileSchema = Joi.object({
<<<<<<<<< Temporary merge branch 1
bio: Joi.string().optional(),
location: Joi.string().optional(),
website: Joi.string().optional(),
socialMedia: socialMediaSchema.optional()
}).optional();
=========
  bio: Joi.string().optional(),
  location: Joi.string().optional(),
  website: Joi.string().optional(),
  socialMedia: socialMediaSchema.optional()
}).optional();
>>>>>>>>> Temporary merge branch 2

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
<<<<<<<<< Temporary merge branch 1
  publicUserID: Joi.string(),
  avatar: Joi.string().required(),
  publicProfile: publicProfileSchema,
=========
  publicUserID: Joi.string().optional(),
  avatar: Joi.string().optional(),
  publicProfile: publicProfileSchema.optional(),
>>>>>>>>> Temporary merge branch 2
  password: Joi.string().required()
});

const userValidator = (data) => {
  return userSchema.validate(data, { abortEarly: false });
};

module.exports = userValidator;
