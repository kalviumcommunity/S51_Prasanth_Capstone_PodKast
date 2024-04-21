import React from "react";
import AudioPlayer from "podkast-audio-player";
import { audioData } from "../AudioData";

import Menu from "./assets/Menu.svg";
import Like from "./assets/Heart.svg";
import DisLike from "./assets/Heart-Full.svg";
import Share from "./assets/Send.svg";
import Comments from "./assets/Message.svg";
import Users from "./assets/Users.svg";

function Posts() {
  return (
    <>
      <div className="helper-post-content-area">
        <div className="helper-post-top-content-area">
          <div className="user-details-content-area">
            <div className="user-avatar-area"></div>
            <div className="users-username-episode-title">
              <p>@username</p>
              <p id="tags">Enna da Podcast</p>
            </div>
          </div>
          <div className="menu-bar-with-total-time-frame">
            <p>14 hrs</p>
            <img src={Menu} alt="" />
          </div>
        </div>
        <div className="border-text-demo-div"></div>
        <div className="helper-post-main-player-details">
          <div className="podcast-main-details-with-play-button">
            <div className="podcast-cover-pic"></div>
            <div className="podcast-title-artissts-details">
              <p>Title of the podcast</p>
              <p id="artists">Artist Name</p>
            </div>
          </div>
          <div className="play-button-of-that-audio-uploaded">
            <button>Listen Now</button>
          </div>
        </div>
        <div className="helper-post-bottom-content-area">
            <div className="no-of-likes-with-like-button">
                <img src={Like} alt="" />
                <p>1.2K Likes</p>
            </div>
            <div className="no-of-comments-recived-with-comments-button">
                <img src={Comments} alt="" />
                <p>12 Comments</p>
            </div>
            <div className="no-of-shares-with-share-now-button">
                <img src={Share} alt="" />
                <p>Share</p>
            </div>
        </div>
      </div>
    </>
  );
}

export default Posts;
