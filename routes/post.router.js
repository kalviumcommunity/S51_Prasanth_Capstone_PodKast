const express = require("express");
const validatePost = require("../validators/post.validator"); // Import your Joi validator function
const Post = require("../models/post.model"); // Import your Mongoose Post model
const User = require("../models/users.model"); // Import your Mongoose User model

const postRouter = express.Router();

// POST route to create a new post
postRouter.post("/post", async (req, res) => {
  try {
    // Validate the request body using your Joi validation function
    const { error, value } = validatePost(req.body);
    console.log("Validation error:", error);
    console.log("Validation value:", value);
    if (error) {
      // Return a 400 Bad Request response if validation fails
      return res.status(400).json({ error: error.details });
    }

    console.log("Received request body:", req.body);
    // Find the user by publicUserID
    const user = await User.findOne({ publicUserID: value.publicUserID });

    if (!user) {
      // Return a 404 Not Found response if the user does not exist
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure the postID is unique before creating a new post
    const existingPost = await Post.findOne({ postID: value.postID });
    if (existingPost) {
      return res.status(400).json({ error: "postID must be unique" });
    }

    // Create a new post using the validated data
    const newPost = new Post({
      ...value,
      user: user._id, // Use the user's _id (ObjectId) in the post
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    // Associate the post with the user
    user.posts.push(savedPost._id);
    await user.save();

    // Return a 201 Created response with the saved post document
    res
      .status(201)
      .json({ message: "Post Created Successfully", post: savedPost });
  } catch (err) {
    // Handle any other errors (e.g., database errors) and return a 500 Internal Server Error response
    console.error("Error creating post:", err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH route to update post by postID
postRouter.patch("/posts/:id", async (req, res) => {
  try {
    // Extract the post ID from the request URL
    const postId = req.params.id;

    // Extract the update fields from the request body
    const { likeCountChange } = req.body;

    // Validate likeCountChange is a number
    if (typeof likeCountChange !== "number") {
      return res.status(400).json({ error: "Invalid like count change" });
    }

    // Find the post by ID and update it
    const post = await Post.findOne({ postID: postId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update the like count
    post.likes += likeCountChange;

    // Ensure likes are not negative
    if (post.likes < 0) {
      post.likes = 0;
    }

    // Save the updated post
    await post.save();

    // Return the updated post as the response
    res.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = postRouter;
