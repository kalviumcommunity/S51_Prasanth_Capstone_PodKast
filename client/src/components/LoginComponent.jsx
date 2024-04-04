import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo-full.png";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode library

function LoginComponent({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [userAvatar, setUserAvatar] = useState(null);

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const response = await axios.get(`http://localhost:3000/api/users/get/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserAvatar(response.data.avatar);
    } catch (error) {
      console.error("Error fetching user avatar:", error);
    }
  };

  return (
    <>
      {isPopupOpen && (
        <div className="login-component">
          <div className="login-component-logo-area">
            <p>Press (ESC) to close the popup</p>
            <img src={Logo} alt="logo-full" />
          </div>
          <div className="login-component-login-fields-area">
            <form onSubmit={handleSubmit}>
              <div className="login-component-username-area">
                <label htmlFor="username" className="poppins-light">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="@rj_prasathu"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="login-component-password-area">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-component-submit-button-area">
                <button type="submit">Login</button>
              </div>
              <div className="login-component-register-call-to-action-area">
                <p>Forget Password?</p>
                <p>
                  Already have an account? <a href="">Register here!</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginComponent;