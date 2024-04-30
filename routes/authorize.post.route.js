const express = require('express');
const axios = require('axios');
const { Buffer } = require('buffer'); // Import the Buffer module for encoding

const authorizePostRouter = express.Router();

// Define the route that handles authorization with Backblaze B2
authorizePostRouter.post('/authorize-b2', async (req, res) => {
    try {
        // Retrieve the base64-encoded credentials from the request body
        const { credentials } = req.body;

        // Make the POST request to the Backblaze B2 authorization endpoint
        const response = await axios.post(
            'https://api.backblazeb2.com/b2api/v2/b2_authorize_account',
            {},
            {
                headers: {
                    Authorization: `Basic ${credentials}`, // Include the encoded credentials in the Authorization header
                },
            }
        );

        // Return the response data, which contains the authorization token and other necessary information
        res.json(response.data);
        console.log(response.data)
    } catch (error) {
        console.error('Error authorizing with Backblaze B2:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

module.exports = authorizePostRouter;
