import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Verified from "../assets/Icons/Verified.svg";
import Notification from "../assets/Icons/Notification.svg";
import Logout from "../assets/Icons/Logout.svg";
import SettingComponent from "./RSSComponent";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

function InsideNavbar() {
  const [currentDate, setCurrentDate] = useState("");
  const [uptime, setUptime] = useState("00:00:00");
  const [userName, setUserName] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // Function to update the current date and time
    const updateDateTime = () => {
      const now = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = days[now.getDay()];
      const date = now.getDate();
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const uptimeSeconds = now.getSeconds();
      const uptimeMinutes = now.getMinutes();
      const uptimeHours = now.getHours();

      setCurrentDate(`${day}, ${date}, ${year}`);
      setUptime(
        `${uptimeHours.toString().padStart(2, "0")}:${uptimeMinutes
          .toString()
          .padStart(2, "0")}:${uptimeSeconds.toString().padStart(2, "0")}`
      );
    };

    // Call the updateDateTime function every second
    const interval = setInterval(updateDateTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token");

      // Check if the token exists
      if (!token) {
        toast.error("User is not logged in: Token is missing.");
        return;
      }

      // Decode the token to get the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      try {
        // Fetch the user's data using their ID
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
        setUserName(data.name); // Set the user's name in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    setIsLoggedIn(false);
    toast.success("Logout successfull");
  };

  return (
    <>
      <div className="home-component">
        <div className="home-component-navbar-for-account-notification-and-others">
          <div className="home-component-navbar-user-with-date-and-uptime">
            <img src={Verified} alt="verified-icon" />
            <p id="username-area">Hey, {userName}</p>
            <p id="current-date">{currentDate}</p>
            <p className="uptime">{uptime} Uptime</p>
          </div>
          <div className="home-component-navbar-running-commands-area"></div>
          <div className="home-component-navbar-icons-area">
            <div className="navbar-notifications-icon-area">
              <img src={Notification} alt="notification-icon" />
            </div>
            <div className="navbar-logout-icon-area">
              <img src={Logout} alt="logout-icon" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InsideNavbar;
