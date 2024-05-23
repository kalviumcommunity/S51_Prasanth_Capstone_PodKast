import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const StoryPopup = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

      const token = localStorage.getItem("token");

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
        <form onSubmit={handleSubmit}>
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
