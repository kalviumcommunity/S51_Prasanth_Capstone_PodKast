import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Back from "../assets/Icons/Back.svg";
import Register from "../assets/Icons/Register.svg";
import Google from "../assets/Icons/Google.png";
import EyeShow from "../assets/Icons/Eye-Show.svg";
import EyeHide from "../assets/Icons/Eye-Hide.svg";
import Logo from "../assets/logo-full.png";

function RegisterComponent() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    avatar: "",
    name: "",
    username: "",
    publicUserID: "",
    bio: "",
    location: "",
    website: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "conf-password") {
      setConfirmPassword(value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    const publicUserID = generatePublicUserID();
    setFormData((prevFormData) => ({
      ...prevFormData,
      publicUserID: publicUserID,
    }));
    setStep(2);
  };

  const generatePublicUserID = () => {
    const uuid = uuidv4();

    const publicUserID = uuid.replace(/-/g, "");

    return publicUserID;
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleBackToStep1 = () => {
    setStep(1); // Go back to Step 1
  };

  const handleBackToStep2 = () => {
    setStep(2); // Go back to Step 2
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
            {step === 1 && (
              <form onSubmit={handleSubmitStep1}>
                <div className="register-component-welcome-message">
                  <h1>Welcome to PodKast,</h1>
                </div>
                <div className="register-component-email-area">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-component-password-area">
                  <label htmlFor="password">Password:</label>
                  <div className="register-component-show-password-area">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
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
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                  {passwordError && (
                    <p className="error-message">{passwordError}</p>
                  )}
                </div>
                <div className="register-component-terms-and-conditions-area">
                  <input type="checkbox" name="agree" id="agree" />
                  <label htmlFor="agree">
                    I agree with the terms and conditions.
                  </label>
                </div>
                <div className="register-component-next-button-area">
                  <button className="poppins-bold">Next</button>
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
            )}
            {step === 2 && (
              <form onSubmit={handleSubmitStep2}>
                <div className="register-component-welcome-message">
                  <h1>One step left,</h1>
                </div>
                <div className="register-component-user-avatar-upload">
                  <label htmlFor="avatar">Upload Avatar:</label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                  />
                  {formData.avatar && (
                    <img src={formData.avatar} alt="avatar-preview" />
                  )}
                </div>
                <div className="register-component-name-area">
                  <label htmlFor="fullName">Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-component-username-area">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-component-public-user-id-area">
                  <label htmlFor="publicUserID">Public User ID:</label>
                  <input
                    type="text"
                    name="publicUserID"
                    id="publicUserID"
                    value={formData.publicUserID}
                    disabled
                  />
                </div>
                <div className="register-component-next-button-area">
                  <button className="poppins-bold">Next</button>
                </div>
                <div className="register-component-back-button-area">
                  <button className="poppins-bold" onClick={handleBackToStep1}>
                    Back
                  </button>
                </div>
                <div className="register-component-already-have-an-account">
                  <p>
                    Already have an account? <span>Login</span>
                  </p>
                </div>
              </form>
            )}
            {step === 3 && (
              <form onSubmit="">
                <div className="register-component-user-bio-area">
                  <label htmlFor="bio">Bio: (Optional)</label>
                  <input
                    type="text"
                    name="bio"
                    id="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-component-country-area">
                  <label htmlFor="country">Country:</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-component-website-area">
                  <label htmlFor="website">Website: (Optional)</label>
                  <input
                    type="text"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-component-liknked-in-link-area">
                  <label htmlFor="linkedInLink">LinkedIn: (Optional)</label>
                  <input
                    type="text"
                    name="linkedInLink"
                    id="linkedInLink"
                    value={formData.linkedin}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-component-x-link-area">
                  <label htmlFor="xLink">X (Twitter): (Optional)</label>
                  <input
                    type="text"
                    name="xLink"
                    id="xLink"
                    value={formData.twitter}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-component-insta-gram-link-area">
                  <label htmlFor="instagramLink">Instagram: (Optional)</label>
                  <input
                    type="text"
                    name="instagramLink"
                    id="instagramLink"
                    value={formData.instagram}
                    onChange={handleChange}
                  />
                </div>
                <div className="register-component-next-button-area">
                  <button className="poppins-bold">Sign up</button>
                </div>
                <div className="register-component-back-button-area">
                  <button className="poppins-bold" onClick={handleBackToStep2}>
                    Back
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterComponent;
