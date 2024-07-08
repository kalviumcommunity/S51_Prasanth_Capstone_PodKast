const express = require("express");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const FormData = require("form-data");
require("dotenv").config();

const uploadRouter = express.Router();

uploadRouter.use(fileUpload());

uploadRouter.post("/upload", async (req, res) => {
  try {
    const authToken = req.headers.authorization;
    const apiUrl = process.env.API_URL;

    if (!authToken || !apiUrl) {
      return res
        .status(400)
        .json({ error: "Missing authorization token or API URL." });
    }

    if (!req.files || !req.files.audiosrc || !req.files.coverpic) {
      return res.status(400).json({ error: "Missing required files." });
    }

    const audioFile = req.files.audiosrc;
    const coverFile = req.files.coverpic;

    const formData = new FormData();
    formData.append("file", audioFile.data, {
      filename: audioFile.name,
      contentType: audioFile.mimetype,
    });
    formData.append("file", coverFile.data, {
      filename: coverFile.name,
      contentType: coverFile.mimetype,
    });

    const headers = {
      Authorization: authToken,
      ...formData.getHeaders(),
      "X-Bz-File-Name": audioFile.name, // Ensure X-Bz-File-Name is correctly set
      "X-Bz-Content-Type": audioFile.mimetype, // Optional: Content-Type header
    };

    const response = await axios.post(
      `${apiUrl}/b2api/v2/b2_upload_file`,
      formData,
      { headers }
    );

    if (response.status !== 200) {
      console.error("Non-200 response from Backblaze B2:", response.status);
      return res
        .status(response.status)
        .json({ error: "Failed to upload files." });
    }

    const audioURL = response.data.audioURL; // Adjust according to your API response
    const coverURL = response.data.coverURL; // Adjust according to your API response

    res.json({ audioURL, coverURL });
  } catch (error) {
    console.error("Error uploading files to Backblaze B2:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = uploadRouter;
