const express = require("express");
const User = require("../models/users.model");
const app = express();

const getRouter = express.Router();
const postRouter = express.Router();

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

module.exports = { getRouter, postRouter };
