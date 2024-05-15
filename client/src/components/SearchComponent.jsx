import React from "react";

import Search from "../assets/Icons/Search-Dark.svg";
import Location from '../assets/Social/Location.svg'
import Website from '../assets/Social/Website.svg'
import Instagram from '../assets/Social/Instagram.svg'
import LinkedIn from '../assets/Social/Linkedin.svg'
import X from '../assets/Social/X.svg'
import Right from "../assets/Icons/Right.svg"

function SearchComponent() {
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
            />
          </div>
          <div className="search-component-search-button">
            <img src={Search} alt="" />
          </div>
          <div className="search-component-search-img">
            <div className="top-search-peoples">
              <p>@random_user</p>
              <p id="publicUserID">publicuserID</p>
            </div>
          </div>
        </div>
        <div className="search-component-main-content-area">
          <div className="search-component-main-content-left-area">
            <div className="user-search-has-the-searched-word">
                <div className="user-avatar-and-user-details-area">
                    <div className="user-avatar"></div>
                    <div className="user-details">
                        <p>@username</p>
                        <p id="publicUserID">publicUserID</p>
                    </div>
                </div>
                <div className="show-the-details-button">
                    <img src={Right} alt="" />
                </div>
            </div>
          </div>
          <div className="search-component-main-content-right-area">
            <div className="search-component-right-area-top-content">
              <div className="top-content-parten-area"></div>
              <div className="top-content-user-avatar"></div>
            </div>
            <div className="search-component-right-area-down-content">
              <div className="down-content-user-bio">
                <p>Bio: </p>
                <div className="user-bio-content-area">
                    <p>This a Bio area</p>
                </div>
              </div>
              <div className="user-location-and-website-link">
                <div className="user-location">
                    <img src={Location} alt="" />
                    <p>Tamil Nadu ,India</p>
                </div>
                <div className="user-website">
                    <img src={Website} alt="" />
                    <p>http://website.link</p>
                </div>
              </div>
              <div className="user-instagram-and-linkedin-link">
                <div className="user-instagram">
                    <img src={Instagram} alt="" />
                    <p>https://instgram.com/username</p>
                </div>
                <div className="user-linkedin">
                    <img src={LinkedIn} alt="" />
                    <p>https://linkedin.com/in/username</p>
                </div>
              </div>
              <div className="user-x-and-publicuser-id-area">
                <div className="user-x">
                    <img src={X} alt="" />
                    <p>https://x.com/username</p>
                </div>
                <div className="user-publicUserID">
                    <p>publicUserID</p> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchComponent;
