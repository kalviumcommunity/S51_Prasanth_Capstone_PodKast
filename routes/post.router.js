const express = require("express");
const { v4: uuidv4 } = require("uuid");
const validatePost = require("../validators/post.validator");
const Comment = require("../models/comments.model");
const Post = require("../models/post.model");
const User = require("../models/users.model");
require("dotenv").config();

const postRouter = express.Router();


// POST route to create a new post with file upload
postRouter.post('/post', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { publicUserID, title, content, artists, audiosrc, coverpic } = req.body;

    // Validate required fields
    if (!publicUserID || !title || !audiosrc || !coverpic || !content || !artists) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find the user by publicUserID
    const user = await User.findOne({ publicUserID });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new post with podcast details
    const newPost = new Post({
      content,
      user: user._id,
      postID: uuidv4(),
      podcast: {
        title,
        audiosrc,
        artists,
        coverpic,
      },
    });

    // Save the post to the database
    await newPost.save();

    res.status(201).json({ message: 'Podcast created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

postRouter.get("/posts/get/:postID", async (req, res) => {
  try {
    const { postID } = req.params;
    const user = await Post.findOne({ postID: postID });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// PATCH route to like a post
postRouter.patch("/post/like/:postID/:publicUserID", async (req, res) => {
  const { postID, publicUserID } = req.params;

  try {
    // Find the user by their publicUserID
    const user = await User.findOne({ publicUserID });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findOne({ postID });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likedBy.includes(user._id)) {
      return res.status(400).json({ error: "User has already liked the post" });
    }

    // Add the user's ID to the likedBy array and increment likes
    post.likedBy.push(user._id);
    post.likes += 1;

    // Save the updated post
    await post.save();

    // Add the postID to the user's likedPosts array
    user.likedPosts.push(postID);
    await user.save();

    res.json({ message: "Liked the post", likes: post.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH route to unlike a post
postRouter.patch("/post/dislike/:postID/:publicUserID", async (req, res) => {
  const { postID, publicUserID } = req.params;

  try {
    // Find the user by their publicUserID
    const user = await User.findOne({ publicUserID });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findOne({ postID });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has not liked the post
    if (!post.likedBy.includes(user._id)) {
      return res.status(400).json({ error: "User has not liked the post" });
    }

    // Remove the user's ID from the likedBy array and decrement likes
    post.likedBy.pull(user._id);
    post.likes -= 1;

    // Save the updated post
    await post.save();

    // Remove the postID from the user's likedPosts array
    user.likedPosts.pull(postID);
    await user.save();

    res.json({ message: "Unliked the post", likes: post.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

postRouter.post("/post/:postId/comment", async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content, publicUserID } = req.body;

    // Find the post by postId
    const post = await Post.findOne({ postID: postId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Find the user by publicUserID
    const user = await User.findOne({ publicUserID: publicUserID });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const commentID = uuidv4();

    // Create a new comment
    const newComment = new Comment({
      content: content,
      user: user._id,
      commentID: commentID,
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    // Add the comment to the post's comments array
    post.comments.push(savedComment._id);
    await post.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: savedComment });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

postRouter.get("/post/:postId/comments", async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find the post by postId and populate the comments
    const post = await Post.findOne({ postID: postId }).populate("comments");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ comments: post.comments });
  } catch (err) {
    console.error("Error getting comments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

postRouter.delete("/post/comment/:commentID", async (req, res) => {
  try {
    const commentID = req.params.commentID;

    // Find the comment by commentId and delete it
    const deletedComment = await Comment.findOneAndDelete({ _id: commentID });

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Remove the comment from the post's comments array
    await Post.updateOne(
      { comments: commentID },
      { $pull: { comments: commentID } }
    );

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

postRouter.patch(
  "/post/comment/like/:commentID/:publicUserID",
  async (req, res) => {
    const { commentID, publicUserID } = req.params;

    try {
      // Find the user by their publicUserID
      const user = await User.findOne({ publicUserID });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const comment = await Comment.findOne({ commentID });

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      // Check if the user has already liked the post
      if (comment.likedBy.includes(user._id)) {
        return res
          .status(400)
          .json({ error: "User has already liked the comment" });
      }

      // Add the user's ID to the likedBy array and increment likes
      comment.likedBy.push(user._id);
      comment.likes += 1;

      // Save the updated post
      await comment.save();

      res.json({ message: "Liked the Comment", likes: comment.likes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

postRouter.patch(
  "/post/comment/dislike/:commentID/:publicUserID",
  async (req, res) => {
    const { commentID, publicUserID } = req.params;

    try {
      // Find the user by their publicUserID
      const user = await User.findOne({ publicUserID });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const comment = await Comment.findOne({ commentID });

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      // Check if the user has not liked the post
      if (!comment.likedBy.includes(user._id)) {
        return res
          .status(400)
          .json({ error: "User has not liked the Comment" });
      }

      // Remove the user's ID from the likedBy array and decrement likes
      comment.likedBy.pull(user._id);
      comment.likes -= 1;

      // Save the updated post
      await comment.save();

      res.json({ message: "Unliked the Comment", likes: comment.likes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

postRouter.patch("/post/comment/edit/:commentID", async (req, res) => {
  try {
    const { commentID } = req.params;
    const { content, publicUserID } = req.body;

    // Find the user by their publicUserID
    const user = await User.findOne({ publicUserID });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the comment by commentID
    const comment = await Comment.findOne({ commentID });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user is the author of the comment
    if (comment.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ error: "User not authorized to edit this comment" });
    }

    // Update the comment's content
    comment.content = content;

    // Save the updated comment
    const updatedComment = await comment.save();

    res.json({
      message: "Comment edited successfully",
      comment: updatedComment,
    });
  } catch (err) {
    console.error("Error editing comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = postRouter;
