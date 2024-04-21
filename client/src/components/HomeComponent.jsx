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

function HomeComponent() {
  const [activeSection, setActiveSection] = useState("artists");

  // Function to handle option clicks
  const handleOptionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <div className="home-component-with-navbar">
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
                      <img src={Microphone} alt="" />
                    </div>
                    <div className="home-component-send-button">
                      <img src={Send} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home-component-posts-show-area">
              <Posts />
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
                {activeSection === "artists" && (
                  <Artists/>
                )}

                {activeSection === "queue" && (
                  <Queue/>
                )}
              </div>
            </div>
            <AudioPlayer songs={audioData} theme="light" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
