const mongoose = require('mongoose');

// Define the schema for publicProfile
const publicProfileSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
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
    required: true
  }
});

// Define the schema for user
const userSchema = new mongoose.Schema({
  name: {
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
  publicProfile: {
    type: publicProfileSchema,
    required: true
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
