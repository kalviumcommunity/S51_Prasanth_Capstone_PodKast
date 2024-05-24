import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Location from "./assets/Social/Location.svg";
import Instagram from "./assets/Social/Instagram.svg";
import X from "./assets/Social/X.svg";
import Website from "./assets/Social/Website.svg";
import LinkedIn from "./assets/Social/Linkedin.svg";

function UserProfile() {
  const { username } = useParams(); // Get the username from the URL
  const [user, setUser] = useState(null); // State to store the user data

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch the user's data based on their username
        const response = await fetch(
          `http://localhost:3000/api/users/get/username/${username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data); // Set the user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <>
      {user ? (
        <div className="user-profile-component-content-area">
          <div className="user-profile-component-header-area">
            <div className="header-area-pattern-format-area"></div>
            <div className="header-area-user-profile-area" style={{ backgroundImage: `url(${user.avatar})` }}></div>
            <div className="header-area-user-details-area">
              <p>@ {username}</p>
              <span>{user.publicUserID}</span>
            </div>
          </div>
          <div className="user-profile-component-main-content-area">
            <div className="main-content-area-bio-area">
              <label htmlFor="bio">Bio : </label>
              <div className="bio-area-box-content">
                <p>{user.publicProfile.bio}</p>
              </div>
            </div>
            <div className="main-content-area-location-area">
              <label htmlFor="location"> <img src={Location} alt="" /> Location :</label>
              <p>{user.publicProfile.location}</p>
            </div>
            <div className="main-content-area-website-area">
              <label htmlFor="website"> <img src={Website} alt="" /> Website :</label>
              <div className="website-area-content-area">
                <a href={user.publicProfile.website} target="_blank" rel="noreferrer">{user.publicProfile.website}</a>
              </div>
            </div>
            <div className="main-content-area-instagram-area">
              <label htmlFor="instagram"> <img src={Instagram} alt="" /> Instagram :</label>
              <p>{user.publicProfile.socialMedia.instagram}</p>
            </div>
            <div className="main-content-area-linkedin-area">
              <label htmlFor="instagram"> <img src={LinkedIn} alt="" /> Linkedin :</label>
              <p>{user.publicProfile.socialMedia.instagram}</p>
            </div>
            <div className="main-content-area-x-area">
              <label htmlFor="instagram"> <img src={X} alt="" /> Instagram :</label>
              <p>{user.publicProfile.socialMedia.instagram}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-spinner"></div>
      )}
    </>
  );
}

export default UserProfile;