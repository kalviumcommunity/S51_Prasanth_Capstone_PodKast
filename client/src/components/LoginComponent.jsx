import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo-full.png";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(true); // Track popup state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", { username, password });
      console.log(response.data);
      toast.success("Login successful!");
      setIsPopupOpen(false);
    } catch (error) {
      toast.error("Invalid username or password");
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
