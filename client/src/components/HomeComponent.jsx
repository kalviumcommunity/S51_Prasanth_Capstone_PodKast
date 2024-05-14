import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AudioPlayer from "podkast-audio-player";

import Story from "../assets/Icons/Story.svg";
import Add from "../assets/Icons/Add.svg";
import Microphone from "../assets/Icons/Microphone.svg";
import Send from "../assets/Icons/Send.svg";

import InsideNavbar from "./InsideNavbar";
import Stories from "./Helpers/Stories";
import Posts from "./Helpers/Posts";
import Artists from "./Helpers/Artists";
import Queue from "./Helpers/Queue";
import AudioPopup from "./Helpers/AudioPopup";
import { useQueueData } from "./AudioData";

function HomeComponent() {
  const [activeSection, setActiveSection] = useState("artists");
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [publicUserID, setPublicUserID] = useState("");
  const [queue, setQueue] = useState([]);
  const navigate = useNavigate();
  const { queueData, isLoading } = useQueueData();

  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/get/userid/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setPublicUserID(userData.publicUserID);
        setUserAvatar(userData.avatar);
        setUsername(userData.username);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(`Failed to fetch user data: ${error.message}`);
    }
  };

  // Fetch Queue Data
  const fetchQueueData = async (publicUserID, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${publicUserID}/queue`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const queueData = await response.json();
        setQueue(queueData.queue || []);
      } else {
        throw new Error("Failed to fetch queue data");
      }
    } catch (error) {
      console.error("Error fetching queue data:", error);
      toast.error(`Failed to fetch queue data: ${error.message}`);
    }
  };

  // Fetch Posts Data
  const fetchPostsData = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/media", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPostsData(data);
      } else {
        throw new Error("Failed to fetch posts data");
      }
    } catch (error) {
      console.error("Error fetching posts data:", error);
      toast.error(`Failed to fetch posts data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Please login or sign up to turn off privacy mode.");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    fetchUserData(userId, token);
    if (publicUserID) {
      fetchQueueData(publicUserID, token);
    }
    fetchPostsData(token);
  }, [publicUserID, navigate]);

  const removeTrackFromQueue = async (trackId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${publicUserID}/queue/${trackId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove track from queue");
      }

      setQueue((prevQueue) =>
        prevQueue.filter((track) => track._id !== trackId)
      );
      toast.success("Track removed from queue");
    } catch (error) {
      console.error("Error removing track from queue:", error);
      toast.error(`Failed to remove track from queue: ${error.message}`);
    }
  };

  const togglePopup = () => {
    setIsPopupVisible((prevShowPopup) => !prevShowPopup);
  };

  const handleAvatarClick = () => {
    navigate(`/user/profile/${username}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className={`home-component-with-navbar ${
          isPopupVisible ? "blur-background" : ""
        }`}
      >
        <InsideNavbar />
        <div className="home-conponent-content-area">
          <div className="home-component-left-stories-area">
            <div className="stories-headign-and-add-yours-area">
              <div className="story-heading">
                <img src={Story} alt="" />
                <p>Launch</p>
              </div>
              <div className="add-yours">
                <img src={Add} alt="" />
                <p>New Launch</p>
              </div>
            </div>
            <Stories />
          </div>
          <div className="home-component-center-post-area">
            <div className="home-component-center-div">
              <div className="home-component-write-your-post-section">
                <div className="home-component-post-text-area">
                  <div className="home-component-inputs">
                    <div
                      className="home-component-user-avatar-img"
                      style={{ backgroundImage: `url(${userAvatar})` }}
                      onClick={handleAvatarClick}
                    ></div>
                    <div className="home-component-text-area-inputs">
                      <input
                        type="text"
                        name="posttext"
                        placeholder="Write something here..."
                      />
                    </div>
                    <div className="home-component-audio-choose">
                      <img src={Microphone} alt="" onClick={togglePopup} />
                    </div>
                    <div className="home-component-send-button">
                      <img src={Send} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home-component-posts-show-area">
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <div className="lot-of-post-content-area">
                  <Posts initialPostsData={postsData} />
                </div>
              )}
            </div>
          </div>
          <div className="home-component-right-suggestions-area">
            <div className="home-component-artists-suggestions">
              <div className="home-component-top-area">
                <div
                  className={`option-onee-artists-suggestions-area ${
                    activeSection === "artists" ? "active" : ""
                  }`}
                  onClick={() => setActiveSection("artists")}
                >
                  <p>Podcast Artists</p>
                </div>
                <div
                  className={`option-two-queue-area ${
                    activeSection === "queue" ? "active" : ""
                  }`}
                  onClick={() => setActiveSection("queue")}
                >
                  <p>Queue</p>
                </div>
              </div>
              <div className="home-component-content-area-with-the-optionals">
                {activeSection === "artists" && <Artists />}

                {activeSection === "queue" && (
                  <Queue
                    queue={queue}
                    removeTrackFromQueue={removeTrackFromQueue}
                  />
                )}
              </div>
            </div>
            <div className="home-component-audio-player">
              {queueData !== null ? (
                <AudioPlayer songs={queueData} theme="light" />
              ) : (
                <div>No songs in queue</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className="navbar-component-popup-area">
          <AudioPopup onClose={togglePopup} />
        </div>
      )}
    </>
  );
}

export default HomeComponent;
