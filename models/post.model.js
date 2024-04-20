const mongoose = require('mongoose');

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
  dislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  podcast: {
    type: PodcastSchema,
    required: false,
  },
});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;
