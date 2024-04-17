import React, { useEffect, useState } from "react";

import Verified from "../assets/Icons/Verified.svg";
import Notification from "../assets/Icons/Notification.svg";
import Logout from "../assets/Icons/Logout.svg";

function HomeComponent() {
  const [currentDate, setCurrentDate] = useState("");
  const [uptime, setUptime] = useState("00:00:00");
  const [isScrolling, setIsScrolling] = useState(false);

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
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="home-component">
        <div className={`home-component-navbar-for-account-notification-and-others${isScrolling ? " scrolled" : ""}`}>
          <div className="home-component-navbar-user-with-date-and-uptime">
            <img src={Verified} alt="verified-icon" />
            <p>Hey, User</p>
            <p>{currentDate}</p>
            <p className="uptime">{uptime} Uptime</p>
          </div>
          <div className="home-component-navbar-running-commands-area"></div>
          <div className="home-component-navbar-icons-area">
            <div className="navbar-notifications-icon-area">
              <img src={Notification} alt="notification-icon" />
            </div>
            <div className="navbar-logout-icon-area">
              <img src={Logout} alt="logout-icon" />
            </div>
          </div>
        </div>
        <div className="home-component-main-content-area">

        </div>
      </div>
    </>
  );
}

export default HomeComponent;
