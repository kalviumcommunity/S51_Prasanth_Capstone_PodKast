import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import Profile from "../assets/Icons/Profile-Dark.svg";
import Acccount from "../assets/Icons/Account.svg";

function MessageComponent() {
  const [selectedSetting, setSelectedSetting] = useState("profile");
  const [publicUserID, setPublicUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });
  const [accountData, setAccountData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        const userId = decodedToken.userId;
        fetchUserData(userId);
      }
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/get/userid/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setProfileData({
          name: result.name || "",
          bio: result.publicProfile.bio || "",
          location: result.publicProfile.location || "",
          website: result.publicProfile.website || "",
          instagram: result.publicProfile.socialMedia.instagram || "",
          twitter: result.publicProfile.socialMedia.twitter || "",
          linkedin: result.publicProfile.socialMedia.linkedin || "",
        });
        setAccountData({
          email: result.email || "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setPublicUserID(result.publicUserID);
        setUserName(result.username);
        setUserAvatar(result.avatar);
      } else {
        toast.error(`Error fetching user data: ${result.error}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountData({
      ...accountData,
      [name]: value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const decodedToken = jwtDecode(token);
    if (!decodedToken) {
      return;
    }
    const userId = decodedToken.userId;
    const dataToSend = { ...profileData, userId };
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    if (accountData.newPassword !== accountData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const decodedToken = jwtDecode(token);
    if (!decodedToken) {
      return;
    }
    const userId = decodedToken.userId;
    const dataToSend = {
      oldPassword: accountData.oldPassword,
      newPassword: accountData.newPassword,
      userId: userId,
    };

    try {
      const response = await fetch("http://localhost:3000/api/account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Account updated successfully!");
      } else {
        toast.error(`${result.error}`);
      }
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleReset = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const decodedToken = jwtDecode(token);
    if (!decodedToken) {
      return;
    }
    const userId = decodedToken.userId;
    fetchUserData(userId);
  };

  return (
    <>
      <div className="settings-component-main-content-area">
        <div className="settings-component-left-side-panel-area">
          <div
            className={`settings-component-profile-setting-container ${
              selectedSetting === "profile" ? "active" : ""
            }`}
            onClick={() => setSelectedSetting("profile")}
          >
            <img src={Profile} alt="" />
            <p>Profile Setting</p>
          </div>
          <div
            className={`setting-component-account-setting-container ${
              selectedSetting === "account" ? "active" : ""
            }`}
            onClick={() => setSelectedSetting("account")}
          >
            <img src={Acccount} alt="" />
            <p>Account Setting</p>
          </div>
        </div>
        <div className="setting-component-right-side-panel-area">
          {selectedSetting === "profile" ? (
            <div className="setting-component-right-panel-profile-seting-container">
              <div className="profile-setting-container-profile-avatar-and-cover-art-area">
                <div className="profile-component-user-avatar-pattern"></div>
                <div className="profile-component-user-avatar" style={{ backgroundImage: `url(${userAvatar})` }}></div>
                <div className="profile-component-users-username-and-publicuserid">
                  <p>@{userName}</p>
                  <p id="publicUserID">{publicUserID}</p>
                </div>
              </div>
              <div className="profile-setting-container-changeable-datas-area">
                <form
                  className="profile-seting-component"
                  onSubmit={handleProfileSubmit}
                >
                  <div className="chaneable-data-area-name-container">
                    <label htmlFor="name">Name: </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="changeable-data-area-bio-area">
                    <label htmlFor="bio">Bio: </label>
                    <input
                      type="text"
                      name="bio"
                      id="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="changeable-data-area-location-area">
                    <label htmlFor="location">Location: </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={profileData.location}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="changeable-data-area-website-area">
                    <label htmlFor="website">Website: </label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value={profileData.website}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="changeable-data-area-instagram-area">
                    <label htmlFor="instagram">Instagram: </label>
                    <input
                      type="text"
                      name="instagram"
                      id="instagram"
                      value={profileData.instagram}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="changeable-data-area-x-area">
                    <label htmlFor="x">X(twitter): </label>
                    <input
                      type="text"
                      name="x"
                      id="x"
                      value={profileData.twitter}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="changeable-data-area-linkedin-area">
                    <label htmlFor="linkedin">Linked In: </label>
                    <input
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      value={profileData.linkedin}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="changeable-data-area-buttons">
                    <button type="submit" className="save-button">
                      Save
                    </button>
                    <button
                      type="submit"
                      className="cancel-button"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  </div>
                </form>
                <div className="form-action-patterns-for-ux"></div>
              </div>
            </div>
          ) : (
            <div className="setting-component-right-panel-account-setting-container">
              <div className="account-setting-container-header">
                <h3>Account Settings</h3>
              </div>
              <div className="account-setting-container-content">
                <form
                  className="account-setting-component"
                  onSubmit={handleAccountSubmit}
                >
                  <div className="account-data-area-email-container">
                    <label htmlFor="email">Email: </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={accountData.email}
                      disabled
                    />
                  </div>
                  <div className="account-data-area-old-password-area">
                    <label htmlFor="oldPassword">Old Password: </label>
                    <input
                      type="password"
                      name="oldPassword"
                      id="oldPassword"
                      value={accountData.oldPassword}
                      onChange={handleAccountChange}
                    />
                  </div>
                  <div className="account-data-area-password-area">
                    <label htmlFor="newPassword">New Password: </label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={accountData.newPassword}
                      onChange={handleAccountChange}
                    />
                  </div>
                  <div className="account-data-area-confirm-password-area">
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={accountData.confirmPassword}
                      onChange={handleAccountChange}
                    />
                  </div>
                  <div className="account-data-area-buttons">
                    <button type="submit" className="save-button">
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  </div>
                </form>
                <div className="form-action-patterns-for-ux"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MessageComponent;
