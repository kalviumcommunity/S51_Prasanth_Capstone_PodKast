import React, { useEffect, useState } from "react";

// Components
import HomeComponent from "./HomeComponent";
import SearchComponent from "./SearchComponent";
import MessageComponent from "./MessageComponent";
import GameComponent from "./GameComponent";
import SettingComponent from "./SettingComponent";

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

function Navbar() {
  const [activeIcon, setActiveIcon] = useState("home");
  const [showPopup, setShowPopup] = useState(false);

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
      component: SettingComponent,
      icon: { light: SettingIocn, dark: SettingDarkIcon },
    },
  };

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
      window.removeEventListener("keydown", closePopupOnEsc);
    };
  }, []);

  return (
    <>
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
            <img src={UserIcon} alt="user-icon" onClick={togglePopup}/>
          </div>
          {showPopup && <div className="navbar-component-popup-area"><LoginComponent/></div>}
        </nav>
        <div className="content">
          {React.createElement(iconComponentMap[activeIcon].component)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
