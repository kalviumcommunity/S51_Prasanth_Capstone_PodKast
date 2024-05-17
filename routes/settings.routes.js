const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const settingsRouter = express.Router();

// CORS Middleware
settingsRouter.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Profile Settings Update endpoint
settingsRouter.patch("/profile", authenticateToken, async (req, res) => {
  const { name, bio, location, website, instagram, twitter, linkedin } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        "publicProfile.name": name,
        "publicProfile.bio": bio,
        "publicProfile.location": location,
        "publicProfile.website": website,
        "publicProfile.socialMedia.instagram": instagram,
        "publicProfile.socialMedia.twitter": twitter,
        "publicProfile.socialMedia.linkedin": linkedin
      },
      { new: true }
    );
    res.status(200).json({ message: "Profile updated successfully!", user });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile settings." });
  }
});

// Account Settings Update endpoint
settingsRouter.patch("/account", authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect old password." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error updating account settings." });
  }
});

module.exports = settingsRouter;
