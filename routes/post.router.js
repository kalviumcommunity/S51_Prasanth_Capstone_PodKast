const express = require("express");
const mongoose = require("mongoose");
const validatePost = require("../validators/post.validator"); // Import your Joi validator function
const Post = require("../models/post.model"); // Import your Mongoose Post model

const postRouter = express.Router();

// POST route to create a new post
postRouter.post("/post", async (req, res) => {
  try {
    // Validate the request body using your Joi validation function
    const { error, value } = validatePost(req.body);
    if (error) {
      // Return a 400 Bad Request response if validation fails
      return res.status(400).json({ error: error.details });
    }

    const newPost = new Post(value);

    const savedPost = await newPost.save();

    // Return a 201 Created response with the saved post document
    res.status(201).json({message: "Post Created Successfully...", savedPost});
  } catch (err) {
    // Handle any other errors (e.g., database errors) and return a 500 Internal Server Error response
    res.status(500).json({ error: err.message });
  }
});

module.exports = postRouter;
