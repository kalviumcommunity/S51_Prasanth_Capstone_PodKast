import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import statement

const StoryPopup = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId); // Assuming 'userId' is stored in the token
    } else {
      toast.error("Token not found. Please login again.");
    }
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image to upload.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("userId", userId); // Assuming userId is correctly fetched from decoded token

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found. Please login again.");
      }

      const response = await axios.post(
        "http://localhost:3000/api/upload/story",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Story uploaded successfully!");
        onClose();
      } else {
        toast.error("Failed to upload story.");
      }
    } catch (error) {
      console.error("Error uploading story:", error);
      toast.error(`Failed to upload story: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="story-popup-component-content-area">
      <div className="story-popup-content">
        <h2>Upload Story</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default StoryPopup;