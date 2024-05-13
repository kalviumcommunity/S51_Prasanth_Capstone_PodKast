const mongoose = require('mongoose');
const CommentSchema = require("./comments.model");

const PodcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  audiosrc: {
    type: String,
    required: true,
  },
  artists: {
    type: [String],
    required: true,
  },
  coverpic: {
    type: String,
    required: true,
  },
});

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
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
  podcast: {
    type: PodcastSchema,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  postID: {
    type: String,
    unique: true,
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }],
});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;
