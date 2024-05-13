import React from "react";

function Queue({ queue, removeTrackFromQueue }) {
  return (
    <div className="helper-queue-content-area">
      {queue.length > 0 ? (
        queue.map((track, index) => (
          <div key={track._id} className="helper-queue-next-one-area">
            <div className="helper-queue-podcast-cover-pic-and-title-with-artist-name">
              <div
                className="helper-queue-podcast-cover-pic"
                style={{ backgroundImage: `url(${track.coverpic})` }}
              ></div>
              <div className="helper-queue-podcast-title-with-artists-name">
                <p>{track.title1}</p>
                <p id="artists">{track.title2.join(", ")}</p>
              </div>
            </div>
            <div className="helper-queue-two-buttons-area">
              <p className={index === 0 ? "text-running" : "text-upcoming"}>{index === 0 ? 'Running' : 'Upcoming'}</p>
              <button onClick={() => removeTrackFromQueue(track._id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No tracks in queue</p>
      )}
    </div>
  );
}

export default Queue;