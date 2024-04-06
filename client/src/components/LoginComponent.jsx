import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo-full.png";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode library

import EyeShow from "../assets/Icons/Eye-Show.svg";
import EyeHide from "../assets/Icons/Eye-Hide.svg";

const quotes = [
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "It always seems impossible until it's done.",
  "The biggest risk is not taking any risk... In a world that's changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "The only limits that exist are the ones you place on yourself.",
  "Success is not about the destination, it's about the journey.",
  "Happiness is not something you postpone for the future; it is something you design for the present.",
  "Believe you can and you're halfway there.",
  "The only way to do great work is to do what you love.",
];

function LoginComponent({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [userAvatar, setUserAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // Check if token exists in local storage and is valid
    const token = localStorage.getItem("token");
    if (token) {
      // Validate the token (e.g., check expiration)
      // If the token is expired, remove it from local storage
      const decodedToken = jwtDecode(token); // Use jwtDecode instead of jwt.decode
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      } else {
        // Token is valid, close the popup
        setIsPopupOpen(false);
      }
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");

    // Validate input fields
    if (username.trim() === "") {
      setUsernameError("Username is required");
      return;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      return;
    }

    try {
      const response = await axios.post(
        "https://s51-prasanth-capstone-podkast.onrender.com/api/login",
        { username, password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      setIsPopupOpen(false);
      await fetchUserAvatar(username, token); // Fetch user avatar after successful login
      onLoginSuccess(userAvatar); // Call onLoginSuccess callback
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  const fetchUserAvatar = async (username, token) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/get/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserAvatar(response.data.avatar);
    } catch (error) {
      console.error("Error fetching user avatar:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      {isPopupOpen && (
        <div className="login-component">
          <div className="login-component-left-image-area"></div>
          <div className="login-component-right-form-area">
            <div className="login-component-close-popup-button">
              <p>Press (ESC) to Close.</p>
            </div>
            <div className="login-component-logo-area">
              <img src={Logo} alt="podkast-logo" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="login-component-welcome-message-area">
                <h1>Welcome Back,😍</h1>
              </div>
              <h1 className="login-component-random-quote">
                &quot;{randomQuote}&quot;
              </h1>
              <div className="login-component-username-area">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && <p className="error-message">{usernameError}</p>}
              </div>
              <div className="login-component-password-area">
                <label htmlFor="password">Password:</label>
                <div className="login-component-form-password-inputs">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src={showPassword ? EyeHide : EyeShow}
                    alt="toggle-password"
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
              </div>
              <div className="login-component-remember-me-and-forget-password-area">
                <div className="login-component-remember-me-button">
                  <input type="checkbox" name="remember-me" id="remember-me" />
                  <label htmlFor="remember-me">Remember Me</label>
                </div>
                <div className="login-component-forget-password-button">
                  <p>Forget Password?</p>
                </div>
              </div>
              <div className="login-component-form-submit-button">
                <button className="poppins-bold">Login</button>
              </div>
            </form>
            <div className="login-component-redirect-to-register-component">
              <p>Don&apos;t have an account? <span>Register Now!</span></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginComponent;
