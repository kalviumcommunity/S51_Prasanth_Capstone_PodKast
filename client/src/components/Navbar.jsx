import React from "react";

// Logo
import Logo from "../assets/logo.png"

// Icons
import HomeIcon from "../assets/Icons/Home.svg"
import SearchIcon from "../assets/Icons/Search.svg"
import MessageIcon from "../assets/Icons/Message.svg"
import GameIcon from "../assets/Icons/PS5.svg"
import SettingIocn from "../assets/Icons/Setting.svg"
import UserIcon from "../assets/Icons/Profile.svg"

function Navbar() {
  return (
    <>
      <nav>
        <div className="navbar-section-logo-area">
            <img src={Logo} alt="" />
        </div>
        <div className="navbar-section-menus-area">
            <div className="navbar-menu-active">
                <img src={HomeIcon} alt="home-icon" />
            </div>
            <div className="navbar-menu-in-active">
                <img src={SearchIcon} alt="search-icon" />
            </div>
            <div className="navbar-menu-in-active">
                <img src={MessageIcon} alt="send-icon" />
            </div>
            <div className="navbar-menu-in-active">
                <img src={GameIcon} alt="game-icon" />
            </div>
            <div className="navbar-menu-in-active">
                <img src={SettingIocn} alt="setting-icon" />
            </div>
        </div>
        <div className="navbar-login-content-area">
            <img src={UserIcon} alt="user-icon" />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
