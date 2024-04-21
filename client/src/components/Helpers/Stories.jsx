import React, { useState } from "react";

import Like from "./assets/Heart.svg";
import DisLike from "./assets/Heart-Full.svg";

function Stories() {
  const [isLiked, setIsLiked] = useState(false);

  // Function to handle like/dislike toggle
  const handleLikeClick = () => {
    // Toggle the isLiked state
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <>
      <div className="stories-area">
        <div className="helpers-stories-content-area">
          <div className="stories-bottom-like-username-area">
            <div className="users-name-avatar-area-and-time-frame">
              <div className="user-details-area">
                <div className="user-avatar-img"></div>
                <div className="username-and-time-frame-area">
                  <p>@User_name</p>
                  <p id="hours-gone">14Hrs</p>
                </div>
              </div>
              <div className="like-and-dislike-area">
                <img
                  src={isLiked ? DisLike : Like}
                  alt={isLiked ? "Dislike" : "Like"}
                  onClick={handleLikeClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stories;
