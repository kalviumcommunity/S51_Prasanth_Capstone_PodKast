import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
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
import { AuthContext } from "./AuthContext";

function Navbar() {
  const [activeIcon, setActiveIcon] = useState("home");
  const [showPopup, setShowPopup] = useState(false);
  const [isNewVisitor, setIsNewVisitor] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

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
    if (isLoggedIn) {
      const token = localStorage.getItem("token");

      // Check if the token exists
      if (!token) {
        console.error("User is not logged in: Token is missing.");
        return;
      }

      // Decode the token to get the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      // Fetch the user's data using their ID
      const fetchUserAvatar = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/users/get/userid/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            console.error("Failed to fetch user data:", response.statusText);
            return;
          }

          const data = await response.json();
          setUserAvatar(data.avatar); // Set the user's avatar URL
          setUsername(data.username); // Set the user's avatar URL
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserAvatar();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const visitedBefore = localStorage.getItem("visitedBefore");
    if (!visitedBefore) {
      setIsNewVisitor(true);
      localStorage.setItem("visitedBefore", true);
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

  const handleAvatarClick = () => {
    // Navigate to the user's profile page when the avatar is clicked
    navigate(`/user/profile/${username}`);
  };

  return (
    <>
      <div className="nav-bar-con-tai-ner">
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
                  title="User Settings"
                  onClick={handleAvatarClick}
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
          </nav>
        </div>
        {showPopup && (
          <div className="navbar-component-popup-area">
            <LoginComponent popupClose={togglePopup} />
          </div>
        )}
        <div className={`content ${showPopup ? "blur-background" : ""}`}>
          {isNewVisitor ? (
            <OnboardingComponent />
          ) : (
            React.createElement(iconComponentMap[activeIcon].component)
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
