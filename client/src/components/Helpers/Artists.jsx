import React from "react";

function Artists() {
  return(
    <>
      <div className="helper-artists-content-area">
        <div className="helper-artists-main-content-area-to-display-artists">
          <div className="helper-user-etails-with-user-avatar">
            <div className="helper-srtists-user-avatar"></div>
            <div className="helper-artists-users-details">
              <p>@username</p>
              <p id="tags">Enna da Podcast</p>
            </div>
          </div>
          <div className="helper-artists-view-progile-button">
            <button>View Profile</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Artists;
