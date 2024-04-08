const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const userValidator = require("../validators/register.validator");

const registerRouter = express.Router();

// CORS Middleware
registerRouter.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Register Route
registerRouter.post("/register", async (req, res) => {
  try {
    // Validate user input
    const { error } = userValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.details.map(detail => detail.message) });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user object
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      publicUserID: req.body.publicUserID,
      avatar: req.body.avatar,
      publicProfile: req.body.publicProfile,
      password: hashedPassword
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h" // Token expires in 1 hour
    });

    // Send response
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = registerRouter;
