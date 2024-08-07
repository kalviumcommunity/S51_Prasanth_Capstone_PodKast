const express = require('express');
const axios = require('axios');
const fileUpload = require('express-fileupload');
const FormData = require('form-data');
const Story = require('../models/stories.model');
require('dotenv').config();

const storyUploadRouter = express.Router();

// Middleware configuration
storyUploadRouter.use(fileUpload());

const getUploadUrl = async () => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/b2api/v2/b2_get_upload_url`,
      { bucketId: process.env.B2_BUCKET_ID },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.B2_APPLICATION_KEY_ID}:${process.env.B2_APPLICATION_KEY}`).toString('base64')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting upload URL:', error);
    throw new Error('Failed to get upload URL');
  }
};

storyUploadRouter.post('/upload/story', async (req, res) => {
  try {
    // Validate that the image file is present in the request
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'Missing required image file.' });
    }

    const imageFile = req.files.image;

    // Get upload URL and authorization token
    const { uploadUrl, authorizationToken } = await getUploadUrl();

    // Create FormData object and append the image file
    const formData = new FormData();
    formData.append('file', imageFile.data, {
      filename: imageFile.name,
      contentType: imageFile.mimetype,
    });

    const headers = {
      Authorization: authorizationToken,
      ...formData.getHeaders(),
    };

    // Upload the image file
    const response = await axios.post(uploadUrl, formData, { headers });

    if (response.status !== 200) {
      console.error('Non-200 response from Backblaze B2:', response.status);
      return res.status(response.status).json({ error: 'Failed to upload image.' });
    }

    const imageURL = response.data.fileUrl;

    // Save the story to the database
    const newStory = new Story({ userId, imageUrl: imageURL });
    await newStory.save();

    // Send the image URL in the response
    res.json({ imageURL });
  } catch (error) {
    console.error('Error uploading image to Backblaze B2:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

storyUploadRouter.post('/stories/:storyId/like', async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    story.isLiked = !story.isLiked;
    await story.save();

    res.json({ message: story.isLiked ? 'Story liked' : 'Story disliked' });
  } catch (error) {
    console.error('Error updating like status:', error);
    res.status(500).json({ error: 'Failed to update like status' });
  }
});

storyUploadRouter.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

module.exports = storyUploadRouter;