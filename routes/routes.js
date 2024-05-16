const express = require("express");
const User = require("../models/users.model");
const Post = require("../models/post.model");
const app = express();

const getRouter = express.Router();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

getRouter.get("/get", async (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  try {
    const captions = await User.find();
    res.status(200).json(captions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

getRouter.get("/get/:username", async (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  try {
    const { username } = req.params;
    const caption = await User.findOne({ username: username });
    res.status(200).json(caption);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

getRouter.get("/get/userid/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const caption = await User.findById(userId);
    res.status(200).json(caption);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

getRouter.get('/suggestions/:input', async (req, res) => {
  try {
    const input = req.params.input.toLowerCase();
    const suggestions = await User.find({ username: { $regex: `^${input}`, $options: 'i' } });
    const usernames = suggestions.map(user => user.username);
    res.json(usernames);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


getRouter.get("/get/email/:email", async (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  try {
    const { email } = req.params;
    const caption = await User.findOne({ email: email });
    res.status(200).json(caption);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

getRouter.get("/get/username/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch the user based on their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's data (excluding sensitive information such as password)
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: err.message });
  }
});

getRouter.get("/media", async (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  try {
    const captions = await Post.find();
    res.status(200).json(captions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { getRouter };
