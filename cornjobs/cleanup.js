// cleanup.js
const cron = require('node-cron');
const mongoose = require('mongoose');
const axios = require('axios');
const Story = require('./models/Story');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to delete file from Backblaze B2
const deleteFile = async (fileId) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/b2api/v2/b2_delete_file_version`,
      {
        fileId,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.B2_APPLICATION_KEY_ID}:${process.env.B2_APPLICATION_KEY}`).toString('base64')}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error('Error deleting file from Backblaze B2:', error);
    return false;
  }
};

// Schedule a cron job to run every hour
cron.schedule('0 * * * *', async () => {
  try {
    const expiredStories = await Story.find({ expiresAt: { $lte: new Date() } });

    for (const story of expiredStories) {
      const fileId = story.imageURL.split('/').pop(); // Extract fileId from the URL
      const success = await deleteFile(fileId);

      if (success) {
        await Story.deleteOne({ _id: story._id });
        console.log(`Deleted expired story: ${story._id}`);
      }
    }
  } catch (error) {
    console.error('Error during cleanup job:', error);
  }
});
