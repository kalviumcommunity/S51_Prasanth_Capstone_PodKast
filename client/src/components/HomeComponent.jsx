import React, { useEffect, useState } from "react";
import InsideNavbar from "./InsideNavbar";

import Story from "../assets/Icons/Story.svg";
import Add from "../assets/Icons/Add.svg";
import Microphone from "../assets/Icons/Microphone.svg";
import Send from "../assets/Icons/Send.svg";

import Stories from "./Helpers/Stories";
import Posts from "./Helpers/Posts";
import AudioPlayer from "podkast-audio-player";
import { audioData } from "./AudioData";
import Artists from "./Helpers/Artists";
import Queue from "./Helpers/Queue";
import AudioPopup from "./Helpers/AudioPopup";

function HomeComponent() {
  const [activeSection, setActiveSection] = useState("artists");
  const [postsData, setPostsData] = useState([]); // State to store posts data
  const [loading, setLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOptionClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await fetch(
          "https://s51-prasanth-capstone-podkast.onrender.com/api/users/media"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts data");
        }
        const data = await response.json();
        setPostsData(data);
        console.log("Fetched postsData:", data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching posts data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <div className={`home-component-with-navbar ${isPopupVisible ? "blur-background" : ""}`}>
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
                    <div className="home-component-user-avatar-img"></div>
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
                <div className="loading-spinner">Loading...</div> // Show loading indicator
              ) : (
                <Posts initialPostsData={postsData} />
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
                  onClick={() => handleOptionClick("artists")}
                >
                  <p>Podcast Artists</p>
                </div>
                <div
                  className={`option-two-queue-area ${
                    activeSection === "queue" ? "active" : ""
                  }`}
                  onClick={() => handleOptionClick("queue")}
                >
                  <p>Queue</p>
                </div>
              </div>
              <div className="home-component-content-area-with-the-optionals">
                {activeSection === "artists" && <Artists />}

                {activeSection === "queue" && <Queue />}
              </div>
            </div>
            <AudioPlayer songs={audioData} theme="light" />
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className="navbar-component-popup-area">
          <AudioPopup onclose={togglePopup}/>
        </div>
      )}
    </>
  );
}

export default HomeComponent;
