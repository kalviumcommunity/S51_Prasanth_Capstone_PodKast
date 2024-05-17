const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const authenticateToken = require("../middlewares/authMiddleware");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const loginRouter = express.Router();

// CORS Middleware
loginRouter.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Login endpoint
loginRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If the credentials are valid, generate a JWT
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });

    // Send the token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Profile Settings Update endpoint
loginRouter.patch("/profile", authenticateToken, async (req, res) => {
  const { name, bio, location, website, instagram, twitter, linkedin } =
    req.body;
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
        "publicProfile.socialMedia.linkedin": linkedin,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Account Settings Update endpoint
loginRouter.patch("/account", authenticateToken, async (req, res) => {
  const { email, password } = req.body;
  const userId = req.user.userId;

  try {
    const updateFields = {};
    if (email) updateFields.email = email;
    if (password) updateFields.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Account updated successfully", user });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = loginRouter;
