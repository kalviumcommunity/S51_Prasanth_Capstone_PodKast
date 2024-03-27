import React, { useState } from "react";

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

function Navbar() {
  const [activeIcon, setActiveIcon] = useState("home");

  // Map icon names to corresponding components
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

  return (
    <>
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
          <img src={UserIcon} alt="user-icon" />
        </div>
      </nav>
      {React.createElement(iconComponentMap[activeIcon].component)}
    </>
  );
}

export default Navbar;
