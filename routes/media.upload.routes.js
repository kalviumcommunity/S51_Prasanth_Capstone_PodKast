const express = require('express');
const axios = require('axios');
const fileUpload = require('express-fileupload');
const FormData = require('form-data');
require('dotenv').config();

const uploadRouter = express.Router();

uploadRouter.use(fileUpload());

uploadRouter.post('/upload', async (req, res) => {
    try {
        // Get the authorization token and API URL from Backblaze authorization data
        const authToken = req.headers.authorization;
        const apiUrl = process.env.API_URL;

        if (!authToken || !apiUrl) {
            return res.status(400).json({ error: 'Missing authorization token or API URL.' });
        }

        // Validate that files are present in the request
        if (!req.files || !req.files.audiosrc || !req.files.coverpic) {
            return res.status(400).json({ error: 'Missing required files.' });
        }

        // Extract files from the request
        const audioFile = req.files.audiosrc;
        const coverFile = req.files.coverpic;

        // Create FormData object and append files
        const formData = new FormData();
        formData.append('audiosrc', audioFile.data, {
            filename: audioFile.name,
            contentType: audioFile.mimetype,
        });
        formData.append('coverpic', coverFile.data, {
            filename: coverFile.name,
            contentType: coverFile.mimetype,
        });

        // Set headers for the request
        const headers = {
            Authorization: authToken,
            ...formData.getHeaders(),
        };

        // Make the request to upload the files
        const response = await axios.post(`${apiUrl}/b2api/v2/b2_upload_file`, formData, { headers });

        // Check the response status
        if (response.status !== 200) {
            console.error('Non-200 response from Backblaze B2:', response.status);
            return res.status(response.status).json({ error: 'Failed to upload files.' });
        }

        // Extract audio and cover URLs from the response data
        const audioURL = response.data.fileUrl;
        const coverURL = response.data.fileUrl;

        // Send the URLs in the response
        res.json({ audioURL, coverURL });
    } catch (error) {
        console.error('Error uploading files to Backblaze B2:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = uploadRouter;