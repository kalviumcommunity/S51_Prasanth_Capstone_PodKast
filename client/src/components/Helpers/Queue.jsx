import React from "react";

function Queue() {
  return (
    <>
      <div className="helper-queue-content-area">
        <div className="helper-queue-next-one-area">
          <div className="helper-queue-podcast-cover-pic-and-title-with-artist-name">
            <div className="helper-queue-podcast-cover-pic"></div>
            <div className="helper-queue-podcast-title-with-artists-name">
              <p>Title of the Podcast</p>
              <p id="artists">Name of the artists</p>
            </div>
          </div>
          <div className="helper-queue-two-buttons-area">
            <p>Upcoming</p>
            <button>Skip</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Queue;
