import React from "react";

import Profile from "../assets/Icons/Profile-Dark.svg";
import Acccount from "../assets/Icons/Account.svg";

function MessageComponent() {
  return (
    <>
      <div className="settings-component-main-content-area">
        <div className="settings-component-left-side-panel-area">
          <div className="settings-component-profile-setting-container">
            <img src={Profile} alt="" />
            <p>Profile Setting</p>
          </div>
          <div className="setting-component-account-setting-container">
            <img src={Acccount} alt="" />
            <p>Account Setting</p>
          </div>
        </div>
        <div className="setting-component-right-side-panel-area">
          <div className="setting-component-right-panel-profile-seting-container">
            <div className="profile-setting-container-profile-avatar-and-cover-art-area">
              <div className="profile-component-user-avatar-pattern"></div>
              <div className="profile-component-user-avatar"></div>
              <div className="profile-component-users-username-and-publicuserid">
                <p>@usename</p>
                <p id="publicUserID">publicuserid</p>
              </div>
            </div>
            <div className="profile-setting-container-changeable-datas-area">
              <form className="profile-seting-component">
                <div className="chaneable-data-area-name-container">
                  <label htmlFor="name">Name: </label>
                  <input type="text" name="name" id="name" />
                </div>
                <div className="changeable-data-area-bio-area">
                  <label htmlFor="bio">Bio: </label>
                  <input type="text" name="bio" id="bio" />
                </div>
                <div className="changeable-data-area-location-area">
                  <label htmlFor="location">Location: </label>
                  <input type="text" name="location" id="location" />
                </div>
                <div className="changeable-data-area-website-area">
                  <label htmlFor="website">Website: </label>
                  <input type="text" name="website" id="website" />
                </div>
                <div className="changeable-data-area-instagram-area">
                  <label htmlFor="instagram">Instagram: </label>
                  <input type="text" name="instagram" id="instagram" />
                </div>
                <div className="changeable-data-area-x-area">
                  <label htmlFor="x">X: </label>
                  <input type="text" name="x" id="x" />
                </div>
                <div className="changeable-data-area-linkedin-area">
                  <label htmlFor="linkedin">Linked In: </label>
                  <input type="text" name="linkedin" id="linkedin" />
                </div>
                <div className="changeable-data-area-buttons">
                    <button type="submit" className="save-button">Save</button>
                    <button type="submit" className="cancel-button">Cancel</button>
                </div>
              </form>
              <div className="form-action-patterns-for-ux"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageComponent;
