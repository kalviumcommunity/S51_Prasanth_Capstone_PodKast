const mongoose = require("mongoose");

// Define the schema for publicProfile
const publicProfileSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  socialMedia: {
    type: {
      twitter: {
        type: String,
        required: false,
      },
      linkedin: {
        type: String,
        required: false,
      },
      instagram: {
        type: String,
        required: false,
      },
    },
  },
});

// Define the schema for user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  publicUserID: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  publicProfile: {
    type: publicProfileSchema,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  likedPosts: {
    type: [String],
    default: [],
  },
  queue: {
    type: [
      {
        audioSrc: { type: String, required: true },
        title1: { type: String, required: true },
        title2: { type: [String], required: false },
        coverpic: { type: String, required: false },
      },
    ],
    default: [],
  }
});

// Create the User model
const User = mongoose.model("users", userSchema);

module.exports = User;
