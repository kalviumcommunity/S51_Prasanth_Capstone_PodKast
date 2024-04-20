import React, { useEffect, useState } from "react";
import "./style.css";

// Components
import HomeComponent from "./HomeComponent";
import SearchComponent from "./SearchComponent";
import MessageComponent from "./MessageComponent";
import GameComponent from "./GameComponent";
import RSSComponent from "./RSSComponent";

// Logo
import Logo from "../assets/logo.png";

// Icons
import HomeIcon from "../assets/Icons/Home.svg";
import HomeDarkIcon from "../assets/Icons/Home-Dark.svg";
import SearchIcon from "../assets/Icons/Search.svg";
import SearchDarkIcon from "../assets/Icons/Search-Dark.svg";
import MessageIcon from "../assets/Icons/Message.svg";
import MessageDarkIcon from "../assets/Icons/Message-Dark.svg";
import GameIcon from "../assets/Icons/PS5.svg";
import GameDarkIcon from "../assets/Icons/PS5-Dark.svg";
import SettingIocn from "../assets/Icons/Setting.svg";
import SettingDarkIcon from "../assets/Icons/Setting-Dark.svg";
import UserIcon from "../assets/Icons/Profile.svg";
import LoginComponent from "./LoginComponent";
import OnboardingComponent from "./OnboardingComponent";

function Navbar({ isLoggedIn }) {
  const [activeIcon, setActiveIcon] = useState("home");
  const [showPopup, setShowPopup] = useState(false);
  const [isNewVisitor, setIsNewVisitor] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const iconComponentMap = {
    home: {
      component: HomeComponent,
      icon: { light: HomeIcon, dark: HomeDarkIcon },
    },
    search: {
      component: SearchComponent,
      icon: { light: SearchIcon, dark: SearchDarkIcon },
    },
    message: {
      component: MessageComponent,
      icon: { light: MessageIcon, dark: MessageDarkIcon },
    },
    game: {
      component: GameComponent,
      icon: { light: GameIcon, dark: GameDarkIcon },
    },
    setting: {
      component: RSSComponent,
      icon: { light: SettingIocn, dark: SettingDarkIcon },
    },
  };

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visitedBefore");
    if (!visitedBefore) {
      setIsNewVisitor(true);
      localStorage.setItem("visitedBefore", true);
    }
    const avatar = localStorage.getItem("avatar");
    if (avatar) {
      setUserAvatar(avatar);
    }
  }, []);

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  const togglePopup = () => {
    setShowPopup((prevShowPopup) => !prevShowPopup);
  };

  const closePopupOnEsc = (event) => {
    if (event.keyCode === 27) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", closePopupOnEsc);
    return () => {
      window.removeEventListener("keydowan", closePopupOnEsc);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
  };

  const handleAvatarClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="navbar-container">
      <nav>
        <div className="navbar-section-logo-area">
          <img src={Logo} alt="" />
        </div>
        <div className="navbar-section-menus-area">
          {Object.keys(iconComponentMap).map((icon) => (
            <div
              key={icon}
              className={
                activeIcon === icon
                  ? "navbar-menu-active"
                  : "navbar-menu-in-active"
              }
              onClick={() => handleIconClick(icon)}
            >
              <img
                src={
                  activeIcon === icon
                    ? iconComponentMap[icon].icon.dark
                    : iconComponentMap[icon].icon.light
                }
                alt={`${icon}-icon`}
              />
            </div>
          ))}
        </div>
        <div className="navbar-login-content-area">
          {isLoggedIn && userAvatar ? (
            <img
              src={userAvatar}
              alt="user-avatar"
              className="user-avatar"
              onClick={handleAvatarClick}
              title="User Settings"
            />
          ) : (
            <img
              src={UserIcon}
              alt="user-icon"
              onClick={togglePopup}
              title="User Settings"
            />
          )}
        </div>
        {showOptions && (
          <div className="user-options">
            <div className="option" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
        {showPopup && (
          <div className="navbar-component-popup-area">
            <LoginComponent/>
          </div>
        )}
      </nav>
      <div className={`content ${showPopup ? "blur-background" : ""}`}>
        {isNewVisitor ? (
          <OnboardingComponent />
        ) : (
          React.createElement(iconComponentMap[activeIcon].component)
        )}
      </div>
    </div>
  );
}

export default Navbar;
