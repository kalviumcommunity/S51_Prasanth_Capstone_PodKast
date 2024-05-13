const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'users',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  commentID: {
    type: String,
    unique: true,
    required: true
  }
});

const Comment = mongoose.model('comments', CommentSchema); // Ensure the model name is 'Comment'

module.exports = Comment;