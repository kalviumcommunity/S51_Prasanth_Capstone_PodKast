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
          <div className="user-profile-component-first-content-area">
            <div className="first-content-area-left-side-content">
              <div className="first-content-area-left-side-user-avatar-name-username-no-of-posts">
                <div className="first-content-area-left-side-user-avatar-name-username">
                  <div className="first-content-area-left-side-user-avatar"></div>
                  <div className="first-content-area-left-side-user-no-of-posts">
                    <p>No.of Posts : {user.posts}</p>
                  </div>
                </div>
                <div className="first-content-area-left-side-user-details">
                  <h1>{user.name}</h1>
                  <p>@{user.username}</p>
                </div>
              </div>
              <div className="first-content-area-left-side-user-location-webite">
                <div className="first-content-area-left-side-user-location">
                  <img src={Location} alt="location-icon" />
                  <p>Location</p>
                </div>
                <div className="first-content-area-left-side-user-website">
                  <img src={Website} alt="location-icon" />
                  <p>https://website.link/link</p>
                </div>
              </div>
              <div className="first-content-area-left-side-user-bio">
                <p>this is the area for users bio.</p>
              </div>
            </div>
          </div>
          <div className="user-profile-component-second-content-area"></div>
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
}

export default UserProfile;

// {user ? (
//     <>
//       <h1>{user.username}'s Profile</h1>
//       <p>Email: {user.email}</p>
//       <p>Posts count: {user.posts.length}</p>
//       <img src={user.avatar} alt={`${user.username}'s avatar`} />
//     </>
//   ) : (
//     <p>Loading...</p>
//   )}
