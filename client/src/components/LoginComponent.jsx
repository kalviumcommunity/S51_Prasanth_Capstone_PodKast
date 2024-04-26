import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo-full.png";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import EyeShow from "../assets/Icons/Eye-Show.svg";
import EyeHide from "../assets/Icons/Eye-Hide.svg";
import { AuthContext } from "./AuthContext";

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

function LoginComponent({ popupClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          // Token is valid, close the popup and set isLoggedIn to true
          setIsLoggedIn(true);
          popupClose();
        }
      } catch (error) {
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, [popupClose, setIsLoggedIn]);

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
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      setIsLoggedIn(true)
      popupClose();
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegisterNow = () => {
    navigate("/register");
  };

  const handleESC = () => {
    popupClose();
  }

  return (
    <>
      <div className="login-component">
        <div className="login-component-left-image-area"></div>
        <div className="login-component-right-form-area">
          <div className="login-component-close-popup-button">
            <p onClick={handleESC}>Press (ESC) to Close. or Press this</p>
          </div>
          <div className="login-component-logo-area">
            <img src={Logo} alt="podkast-logo" />
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
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
                placeholder="rj_prasanthu"
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && (
                <p className="error-message">{usernameError}</p>
              )}
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
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
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
            <p>
              Don&apos;t have an account?{" "}
              <span onClick={handleRegisterNow}>Register Now!</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
