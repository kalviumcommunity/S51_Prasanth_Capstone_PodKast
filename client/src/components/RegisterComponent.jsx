import React, { useState } from "react";

import Back from "../assets/Icons/Back.svg";
import Register from "../assets/Icons/Register.svg";
import Google from "../assets/Icons/Google.png";
import EyeShow from "../assets/Icons/Eye-Show.svg";
import EyeHide from "../assets/Icons/Eye-Hide.svg";
import Logo from "../assets/logo-full.png";

function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="register-component">
        <div className="register-component-hamburger-type-area">
          <div className="register-component-back-to-home">
            <img src={Back} alt="back-to-home" />
            <p>Back to home</p>
          </div>
          <div className="register-component-register-page">
            <img src={Register} alt="register-here" />
            <p>Register here</p>
          </div>
        </div>
        <div className="register-component-content-area">
          <div className="register-component-left-content-area"></div>
          <div className="register-component-right-form-area">
            <div className="register-component-logo-area">
              <img src={Logo} alt="podkast-logo" />
            </div>
            <form action="#">
              <div className="register-component-welcome-message">
                <h1>Welcome to PodKast,</h1>
              </div>
              <div className="register-component-email-area">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="example@example.com"/>
              </div>
              <div className="register-component-password-area">
                <label htmlFor="password">Password:</label>
                <div className="register-component-show-password-area">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                  />
                  <img
                    src={showPassword ? EyeHide : EyeShow}
                    alt="toggle-password"
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>
              <div className="register-component-conform-password-area">
                <label htmlFor="conf-password">Conform Password:</label>
                <input
                  type="password"
                  name="conf-password"
                  id="conf-password"
                />
              </div>
              <div className="register-component-terms-and-conditions-area">
                <input type="checkbox" name="agree" id="agree"/>
                <label htmlFor="agree">I agree with the terms and conditions.</label>
              </div>
              <div className="register-component-register-button-area">
                <button className="poppins-bold">Sign up</button>
              </div>
              <div className="register-component-or-signup-area">
                <div className="register-component-dash-one"></div>
                <div className="register-component-or-text-area">Or</div>
                <div className="register-component-dash-one"></div>
              </div>
              <div className="register-component-sign-up-with-google-button-area">
                <div className="register-component-sign-up-with-google-button">
                  <img src={Google} alt="google-logo" />
                  <p>Sign up with google</p>
                </div>
              </div>
              <div className="register-component-already-have-an-account">
                <p>
                  Already have an account? <span>Login</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterComponent;
