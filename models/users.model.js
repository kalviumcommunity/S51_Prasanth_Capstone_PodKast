const mongoose = require('mongoose');

// Define the schema for publicProfile
const publicProfileSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  website: {
    type: String,
    required: false
  },
  socialMedia: {
    type: {
      twitter: {
        type: String,
        required: false
      },
      linkedin: {
        type: String,
        required: false
      },
      instagram: {
        type: String,
        required: false
      }
    },
<<<<<<<<< Temporary merge branch 1
=========
>>>>>>>>> Temporary merge branch 2
  }
});

// Define the schema for user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  publicUserID: {
    type: String,
    required: true
  },
  avatar:  {
    type: String,
    required: false
  },
  publicProfile: {
    type: publicProfileSchema,
    required: false
  },
  password: {
    type: String,
    required: true
  }
});

// Create the User model
const User = mongoose.model('users', userSchema);

module.exports = User;
