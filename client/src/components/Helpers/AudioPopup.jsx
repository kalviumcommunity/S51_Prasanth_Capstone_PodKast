import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";
import { Buffer } from "buffer";
import backblazeConfig from "../backblaze";

function AudioPopup({ onClose }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [b2Auth, setB2Auth] = useState(null);
  const [artists, setArtists] = useState([]);
  const [currentArtist, setCurrentArtist] = useState("");
  const [formData, setFormData] = useState({
    audiosrc: null,
    coverpic: null,
    title: "",
  });

  useEffect(() => {
    const authorizeWithBackend = async () => {
      if (!isLoggedIn) {
        return;
      }

      const applicationKeyId = backblazeConfig.applicationKeyId;
      const applicationKey = backblazeConfig.applicationKey;
      const credentials = Buffer.from(
        `${applicationKeyId}:${applicationKey}`
      ).toString("base64");

      try {
        const response = await fetch("http://localhost:3000/api/authorize-b2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ credentials }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Authorized with Backblaze B2");
          setB2Auth(data); // Store B2 authorization data
        } else {
          console.error("Error authorizing with Backblaze B2:", data.error);
          toast.error(`Error authorizing with Backblaze B2: ${data.error}`);
        }
      } catch (error) {
        console.error("Error making request:", error);
        toast.error(`Error making request: ${error.message}`);
      }
    };

    authorizeWithBackend();
  }, [isLoggedIn]);

  // Handle the input change for the artist field
  const handleArtistChange = (event) => {
    setCurrentArtist(event.target.value);
  };

  // Handle the Enter key press in the artist input field
  const handleArtistKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (
        currentArtist.trim() !== "" &&
        !artists.includes(currentArtist.trim())
      ) {
        setArtists([...artists, currentArtist.trim()]);
        setCurrentArtist("");
      }
    }
  };

  // Handle deleting an artist tag
  const handleArtistDelete = (artistToDelete) => {
    setArtists(artists.filter((artist) => artist !== artistToDelete));
  };

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

  // Upload audio and cover pic files to Backblaze B2
  const uploadFiles = async () => {
    try {
      if (!b2Auth) {
        console.error("B2 authorization data is not available.");
        toast.error("Authorization data is not available.");
        return;
      }

      const authToken = b2Auth.authorizationToken;
      const apiUrl = "http://localhost:3000/api/upload";

      // Check if the files are present
      if (!formData.audiosrc || !formData.coverpic) {
        toast.error("Both audio and cover picture files must be provided.");
        return;
      }

      // Prepare FormData for audio and cover picture file upload
      const formDataObject = new FormData();
      formDataObject.append("audiosrc", formData.audiosrc);
      formDataObject.append("coverpic", formData.coverpic);

      // Upload both files through backend proxy
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formDataObject,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error uploading files:", errorData.error);
        toast.error(`Error uploading files: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      const audioURL = data.audioURL;
      const coverPicURL = data.coverURL;

      // Create podcast details and save to session storage
      const podcastDetails = {
        audiosrc: audioURL,
        coverpic: coverPicURL,
        title: formData.title,
        artists,
      };

      const podcastDetailsJSON = JSON.stringify(podcastDetails);
      sessionStorage.setItem("podcastDetails", podcastDetailsJSON);

      // Close the popup
      onClose();
    } catch (error) {
      console.error("Error saving podcast:", error);
      toast.error(`Error saving podcast: ${error.message}`);
    }
  };

  // Handle form submission
  const handleSavePodcast = (event) => {
    event.preventDefault();

    if (!formData.audiosrc || !formData.coverpic) {
      toast.error("Please select an audio source and a cover picture.");
      return;
    }

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
                  <p onClick={() => handleArtistDelete(artist)}>×</p>
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
