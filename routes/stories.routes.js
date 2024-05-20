// routes/upload.js
const express = require('express');
const axios = require('axios');
const fileUpload = require('express-fileupload');
const FormData = require('form-data');
const Story = require('../models/stories.model');
require('dotenv').config();

const storyUploadRouter = express.Router();

storyUploadRouter.use(fileUpload());

const getUploadUrl = async () => {
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

    // Calculate the expiration time (24 hours from now)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Save the story to the database
    const newStory = new Story({ imageURL, expiresAt });
    await newStory.save();

    // Send the image URL in the response
    res.json({ imageURL });
  } catch (error) {
    console.error('Error uploading image to Backblaze B2:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = storyUploadRouter;
