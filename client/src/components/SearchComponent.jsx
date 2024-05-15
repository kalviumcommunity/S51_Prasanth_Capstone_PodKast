import React, { useEffect, useState } from "react";

import Search from "../assets/Icons/Search-Dark.svg";
import Location from "../assets/Social/Location.svg";
import Website from "../assets/Social/Website.svg";
import Instagram from "../assets/Social/Instagram.svg";
import LinkedIn from "../assets/Social/Linkedin.svg";
import X from "../assets/Social/X.svg";
import Right from "../assets/Icons/Right.svg";
import RandomOne from "../assets/Slides/random-1.svg"

function SearchComponent() {
  const [searchUsername, setSearchUsername] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [randomUser, setRandomUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    fetch("http://localhost:3000/api/users/get")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch users data");
        }
      })
      .then((data) => {
        if (data && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const selectedUser = data[randomIndex];
          setRandomUser(selectedUser);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleUserSearch = () => {
    fetch(`http://localhost:3000/api/users/get/${searchUsername}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => setSearchedUser(data))
      .catch((error) => console.error("Error searching user:", error));
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  return (
    <>
      <div className="search-component-content-area">
        <div className="search-component-top-search-area">
          <div className="search-component-search-bar">
            <p>@</p>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search by username..."
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
            />
          </div>
          <div
            className="search-component-search-button"
            onClick={handleUserSearch}
          >
            <img src={Search} alt="" />
          </div>
          <div className="search-component-search-img">
            {randomUser && (
              <div className="top-search-peoples">
                <p>@{randomUser.username}</p>
                <p id="publicUserID">{randomUser.publicUserID}</p>
              </div>
            )}
          </div>
        </div>
        <div className="search-component-main-content-area">
          <div className="search-component-main-content-left-area">
            {searchedUser ? (
              <div className="user-search-has-the-searched-word">
                <div className="user-avatar-and-user-details-area">
                  <div
                    className="user-avatar"
                    style={{ backgroundImage: `url(${searchedUser.avatar})` }}
                  ></div>
                  <div className="user-details">
                    <p>@{searchedUser.username}</p>
                    <p id="publicUserID">{searchedUser.publicUserID}</p>
                  </div>
                </div>
                <div
                  className="show-the-details-button"
                  onClick={handleShowDetails}
                >
                  <img src={Right} alt="" />
                </div>
              </div>
            ) : (
              <p>No Data</p>
            )}
          </div>
          {showDetails && searchedUser ? (
            <div className="search-component-main-content-right-area">
              <div className="search-component-right-area-top-content">
                <div className="top-content-parten-area"></div>
                <div
                  className="top-content-user-avatar"
                  style={{ backgroundImage: `url(${searchedUser.avatar})` }}
                ></div>
              </div>
              <div className="search-component-right-area-down-content">
                <div className="down-content-user-bio">
                  <p>Bio: </p>
                  <div className="user-bio-content-area">
                    <p>{searchedUser.publicProfile.bio}</p>
                  </div>
                </div>
                <div className="user-location-and-website-link">
                  <div className="user-location">
                    <img src={Location} alt="" />
                    <p>{searchedUser.publicProfile.location}</p>
                  </div>
                  <div className="user-website">
                    <img src={Website} alt="" />
                    <p>{searchedUser.publicProfile.website}</p>
                  </div>
                </div>
                <div className="user-instagram-and-linkedin-link">
                  <div className="user-instagram">
                    <img src={Instagram} alt="" />
                    <p>{searchedUser.publicProfile.socialMedia.instagram}</p>
                  </div>
                  <div className="user-linkedin">
                    <img src={LinkedIn} alt="" />
                    <p>{searchedUser.publicProfile.socialMedia.linkedin}</p>
                  </div>
                </div>
                <div className="user-x-and-publicuser-id-area">
                  <div className="user-x">
                    <img src={X} alt="" />
                    <p>{searchedUser.publicProfile.socialMedia.twitter}</p>
                  </div>
                  <div className="user-publicUserID">
                    <p>{searchedUser.publicUserID}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="search-component-main-content-right-area">
                <div className="random-health-tips">
                    <img src={RandomOne} alt="" />
                    <p>Hi</p>
                </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchComponent;
