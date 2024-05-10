const express = require("express");
const User = require("../models/users.model");
require("dotenv").config();

const queueRouter = express.Router();

// CORS Middleware
queueRouter.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// POST route to add an audio track to the user's queue
queueRouter.post("/users/:publicUserID/queue", async (req, res) => {
  try {
    const { publicUserID } = req.params;
    const audioTrack = req.body;

    const user = await User.findOne({ publicUserID });

    // If the user is not found, respond with a 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.queue.push(audioTrack);

    await user.save();

    // Respond with a success message
    res.status(200).json({ message: "Audio track added to queue", audioTrack });
  } catch (error) {
    console.error("Error adding to queue:", error);
    res.status(500).json({ error: "Failed to add to queue" });
  }
});

queueRouter.delete("/users/:publicUserID/queue/:trackId", async (req, res) => {
  try {
    const { publicUserID, trackId } = req.params; // Get the user's ID and track ID from the request parameters

    // Find the user by their ID
    const user = await User.findOne({ publicUserID });

    // If the user is not found, respond with a 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the track in the user's queue and remove it
    user.queue = user.queue.filter((track) => track._id.toString() !== trackId);

    // Save the updated user document
    await user.save();

    // Respond with a success message
    res.status(200).json({ message: "Track removed from queue" });
  } catch (error) {
    console.error("Error removing track from queue:", error);
    res.status(500).json({ error: "Failed to remove track from queue" });
  }
});

queueRouter.get("/users/:publicUserID/queue", async (req, res) => {
    try {
      const { publicUserID } = req.params;
      const user = await User.findOne({ publicUserID });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = queueRouter;
