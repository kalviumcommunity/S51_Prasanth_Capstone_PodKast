import React, { useState } from "react";
import { storage } from "../firebase"; // Import Firebase Storage from your configuration file
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary functions from Firebase Storage

function AudioPopup({ onClose }) {
  const [artists, setArtists] = useState([]);
  const [currentArtist, setCurrentArtist] = useState("");
  const [formData, setFormData] = useState({
    audiosrc: null,
    coverpic: null,
    title: "",
  });

  // Handle the input change for the artist field
  const handleArtistChange = (event) => {
    setCurrentArtist(event.target.value);
  };

  // Handle the Enter key press in the artist input field
  const handleArtistKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (currentArtist.trim() !== "" && !artists.includes(currentArtist.trim())) {
        setArtists([...artists, currentArtist.trim()]);
        setCurrentArtist("");
      }
    }
  };

  // Handle deleting an artist tag
  const handleArtistDelete = (artistToDelete) => {
    setArtists(artists.filter((artist) => artist !== artistToDelete));
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  // Upload audio and cover pic files to Firebase Storage
  const uploadFiles = async () => {
    try {
      // Upload the audio file to Firebase Storage
      const audioRef = ref(storage, `audios/${Date.now()}.mp3`);
      const audioUploadResult = await uploadBytes(audioRef, formData.audiosrc);
      const audioURL = await getDownloadURL(audioUploadResult.ref);

      // Upload the cover picture file to Firebase Storage
      const coverPicRef = ref(storage, `coverpics/${Date.now()}.jpg`);
      const coverPicUploadResult = await uploadBytes(coverPicRef, formData.coverpic);
      const coverPicURL = await getDownloadURL(coverPicUploadResult.ref);

      // Create an object with the form data and the list of artists
      const podcastDetails = {
        audiosrc: audioURL,
        coverpic: coverPicURL,
        title: formData.title,
        artists: artists,
      };

      // Convert the podcast details object to a JSON string
      const podcastDetailsJSON = JSON.stringify(podcastDetails);

      // Save the podcast details in session storage
      sessionStorage.setItem("podcastDetails", podcastDetailsJSON);

      // Close the popup
      onClose();
    } catch (error) {
      console.error("Error saving podcast:", error);
    }
  };

  // Handle form submission
  const handleSavePodcast = (event) => {
    event.preventDefault();
    uploadFiles();
  };

  return (
    <div className="audio-popup-content-area">
      <div className="audio-popup-heading-area">
        <h1>Select your Audio</h1>
      </div>
      <div className="audio-popup-inputs-field-area">
        <form onSubmit={handleSavePodcast}>
          <div className="audio-popup-form-choose-file">
            <label htmlFor="audiosrc">Audio Source:</label>
            <input
              type="file"
              id="audiosrc"
              accept=".mp3,.wav"
              onChange={handleFileChange}
              name="audiosrc"
            />
          </div>
          <div className="audio-popup-form-choose-cover-pic">
            <label htmlFor="coverpic">Cover Picture:</label>
            <input
              type="file"
              id="coverpic"
              name="coverpic"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </div>
          <div className="audio-popup-podcast-name">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="audio-popup-podcast-artists">
            <label htmlFor="artists">Artists:</label>
            <input
              type="text"
              name="artists"
              id="artists"
              value={currentArtist}
              onChange={handleArtistChange}
              onKeyPress={handleArtistKeyPress}
              placeholder="Enter artist name and press Enter"
            />
            <div className="artist-tags">
              {artists.map((artist, index) => (
                <div key={index} className="artist-tag">
                  <span>{artist}</span>
                  <p onClick={() => handleArtistDelete(artist)}>
                    ×
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="audio-popup-save-button">
            <button type="submit">Save Podcast</button>
          </div>
          <div className="audio-popup-cancel-button">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AudioPopup;