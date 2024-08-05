import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../firebase"; // Adjust the import path based on your project structure
import { onAuthStateChanged } from "firebase/auth";

function AudioPopup({ onClose }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [artists, setArtists] = useState([]);
  const [currentArtist, setCurrentArtist] = useState("");
  const [formData, setFormData] = useState({
    audiosrc: null,
    coverpic: null,
    title: "",
    description: "",
  });
  const [publicUserID, setPublicUserID] = useState("");
  const [user, setUser] = useState(null); // For storing authenticated user

  useEffect(() => {
    // Check user authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        toast.error("Please log in to upload files.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPublicUserID = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the JWT token is stored in local storage
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.userId; // Adjust based on your JWT payload structure

          const response = await fetch(
            `http://localhost:3000/api/users/get/userid/${userId}`
          );
          if (response.ok) {
            const data = await response.json();
            setPublicUserID(data.publicUserID);
          } else {
            console.error("Failed to fetch public user ID");
          }
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error fetching public user ID:", error);
      }
    };

    fetchPublicUserID();
  }, []);

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

  // Upload file to Firebase and get the download URL
  const uploadFile = async (file, filePath) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const fileRef = ref(storage, filePath);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  };

  // Handle form submission
  const handleSavePodcast = async (event) => {
    event.preventDefault();

    if (!formData.audiosrc || !formData.coverpic) {
      toast.error("Please select an audio source and a cover picture.");
      return;
    }

    try {
      const audioURL = await uploadFile(
        formData.audiosrc,
        `audios/${formData.audiosrc.name}`
      );
      const coverPicURL = await uploadFile(
        formData.coverpic,
        `coverpics/${formData.coverpic.name}`
      );

      const postData = {
        publicUserID: publicUserID,
        title: formData.title,
        content: formData.description,
        artists: artists,
        audiosrc: audioURL,
        coverpic: coverPicURL,
      };

      const response = await fetch("http://localhost:3000/api/media/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating post:", errorData.error);
        toast.error(`Error creating post: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      toast.success("Podcast created successfully!");

      // Close the popup
      onClose();
    } catch (error) {
      console.error("Error saving podcast:", error);
      toast.error(`Error saving podcast: ${error.message}`);
    }
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
              placeholder="Enter Podcast title"
            />
          </div>
          <div className="audio-popup-podcast-name">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
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
