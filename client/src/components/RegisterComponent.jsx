import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "./firebase";
import axios from "axios";
import md5 from "md5";
import { AuthContext } from "./AuthContext";

import Back from "../assets/Icons/Back.svg";
import Register from "../assets/Icons/Register.svg";
import Google from "../assets/Icons/Google.png";
import EyeShow from "../assets/Icons/Eye-Show.svg";
import EyeHide from "../assets/Icons/Eye-Hide.svg";
import Logo from "../assets/logo-full.png";
import { toast } from "react-toastify";

function RegisterComponent() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordMainError, setPasswordMainError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    publicUserID: "",
    avatar: "",
    password: "",
    publicProfile: {
      bio: "",
      location: "",
      website: "",
      socialMedia: {
        twitter: "",
        linkedin: "",
        instagram: "",
      },
    },
  });
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("publicProfile.socialMedia.")) {
      const childField = name.split(".")[2];
      setFormData((prevFormData) => ({
        ...prevFormData,
        publicProfile: {
          ...prevFormData.publicProfile,
          socialMedia: {
            ...prevFormData.publicProfile.socialMedia,
            [childField]: value,
          },
        },
      }));
    } else if (name.startsWith("publicProfile.")) {
      const parentField = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        publicProfile: {
          ...prevFormData.publicProfile,
          [parentField]: value,
        },
      }));
    } else if (name === "conf-password") {
      setConfirmPassword(value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // User object

      // After successful sign-in, you can update the formData with user details
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: user.email,
        name: user.displayName,
      }));

      // Proceed to the next step in your registration process
      setIsGoogleSignedIn(true);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Handle form submission for step 1
  const handleSubmitStep1 = async (e) => {
    e.preventDefault();

    // Validate email
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    // Validate password
    if (formData.password.length < 8) {
      setPasswordMainError("Password should be at least 8 characters long");
      return;
    } else {
      setPasswordMainError("");
    }

    if (formData.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    try {
      // Check if the email already exists
      const response = await fetch(
        `https://s51-prasanth-capstone-podkast.onrender.com/api/users/get/email/${formData.email}`
      );
      const data = await response.json();

      if (!response.ok) {
        console.error("Error checking email:", data.error);
        return;
      }

      if (data && data.email) {
        setEmailError("Email already exists. Please use a different one.");
        return;
      }

      setStep(2)

      // Email is available, proceed to the next step
      const publicUserID = generatePublicUserID();
      setFormData((prevFormData) => ({
        ...prevFormData,
        publicUserID: publicUserID,
      }));
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const generatePublicUserID = () => {
    const uuid = uuidv4();
    const publicUserID = uuid.replace(/-/g, "");
    return publicUserID;
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();

    // Validate avatar field
    if (!formData.avatar) {
      setAvatarError("Please upload an avatar image");
      return;
    } else {
      setAvatarError("");
    }

    // Validate name field
    if (!formData.name.trim()) {
      setNameError("Please enter your full name");
      return;
    } else {
      setNameError("");
    }

    // Validate username field
    if (!formData.username.trim()) {
      setUsernameError("Please enter a username");
      return;
    } else {
      setUsernameError("");
    }

    try {
      // Check if the username already exists
      const response = await fetch(
        `https://s51-prasanth-capstone-podkast.onrender.com/api/users/get/${formData.username}`
      );
      const data = await response.json();

      if (!response.ok) {
        console.error("Error checking username:", data.error);
        return;
      }

      if (data === null) {
        setUsernameError("");
        setStep(3);
        return;
      }

      if (!data.available) {
        setUsernameError(
          "Username already exists. Please choose a different one."
        );
        return;
      } else {
        setStep(3);
      }
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  const handleSubmitStep3 = async (e) => {
    e.preventDefault();

    try {
      // Register the user with Firebase Authentication
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Create a user profile using Firebase Authentication
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: formData.name,
          photoURL: formData.avatar,
        });
      }

      // Perform an API request to save additional user details
      const response = await axios.post(
        "https://s51-prasanth-capstone-podkast.onrender.com/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the request was successful
      if (response.status === 201) {
        const data = response.data;
        const token = data.token;

        // Store the token in local storage
        localStorage.setItem("token", token);

        // Update the authentication state
        setIsLoggedIn(true);

        // Navigate to the homepage after registration
        navigate("/");
      } else {
        console.error("Error:", response.statusText);
        toast.error("An error occurred during registration. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  const handleFileChange = () => {
    const email = formData.email.trim().toLowerCase();
    const hash = md5(email);
    const avatarURL = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

    setFormData((prevFormData) => ({
      ...prevFormData,
      avatar: avatarURL,
    }));
  };

  return (
    <div className="register-component">
      <div className="register-component-hamburger-type-area">
        <div
          className="register-component-back-to-home"
          onClick={() => navigate("/")}
        >
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
                {emailError && <p className="error-message">{emailError}</p>}
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
                {passwordMainError && (
                  <p className="error-message">{passwordMainError}</p>
                )}
              </div>
              <div className="register-component-conform-password-area">
                <label htmlFor="conf-password">Confirm Password:</label>
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
                <button type="submit" className="poppins-bold">
                  Next
                </button>
              </div>
              <div className="register-component-or-signup-area">
                <div className="register-component-dash-one"></div>
                <div className="register-component-or-text-area">Or</div>
                <div className="register-component-dash-one"></div>
              </div>
              {!isGoogleSignedIn && (
                <div className="register-component-sign-up-with-google-button-area">
                  <div
                    className="register-component-sign-up-with-google-button"
                    onClick={handleGoogleLogin}
                  >
                    <img src={Google} alt="google-logo" />
                    <p>Sign up with Google</p>
                  </div>
                </div>
              )}
              <div className="register-component-already-have-an-account">
                <p>
                  Already have an account?{" "}
                  <span onClick={() => navigate("/")}>Login</span>
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
                  type="button"
                  value="Generate Avatar"
                  onClick={handleFileChange}
                />
                {formData.avatar && (
                  <img src={formData.avatar} alt="avatar-preview" />
                )}
                {avatarError && <p className="error-message">{avatarError}</p>}
              </div>
              <div className="register-component-name-area">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {nameError && <p className="error-message">{nameError}</p>}
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
                {usernameError && (
                  <p className="error-message">{usernameError}</p>
                )}
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
                <button type="submit" className="poppins-bold">
                  Next
                </button>
              </div>
              <div className="register-component-back-button-area">
                <button
                  type="button"
                  className="poppins-bold"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
              </div>
              <div className="register-component-already-have-an-account">
                <p>
                  Already have an account?{" "}
                  <span onClick={() => navigate("/")}>Login</span>
                </p>
              </div>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={handleSubmitStep3}>
              <div className="register-component-user-bio-area">
                <label htmlFor="bio">Bio: (Optional)</label>
                <input
                  type="text"
                  name="publicProfile.bio"
                  id="bio"
                  value={formData.publicProfile.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="register-component-country-area">
                <label htmlFor="location">Country:</label>
                <input
                  type="text"
                  name="publicProfile.location"
                  id="location"
                  value={formData.publicProfile.location}
                  onChange={handleChange}
                />
              </div>
              <div className="register-component-website-area">
                <label htmlFor="website">Website: (Optional)</label>
                <input
                  type="text"
                  name="publicProfile.website"
                  id="website"
                  value={formData.publicProfile.website}
                  onChange={handleChange}
                />
              </div>
              <div className="register-component-liknked-in-link-area">
                <label htmlFor="linkedin">LinkedIn: (Optional)</label>
                <input
                  type="text"
                  name="publicProfile.socialMedia.linkedin"
                  id="linkedin"
                  value={formData.publicProfile.socialMedia.linkedin}
                  onChange={handleChange}
                />
              </div>
              <div className="register-component-x-link-area">
                <label htmlFor="twitter">X (Twitter): (Optional)</label>
                <input
                  type="text"
                  name="publicProfile.socialMedia.twitter"
                  id="twitter"
                  value={formData.publicProfile.socialMedia.twitter}
                  onChange={handleChange}
                />
              </div>
              <div className="register-component-insta-gram-link-area">
                <label htmlFor="instagramLink">Instagram: (Optional)</label>
                <input
                  type="text"
                  name="publicProfile.socialMedia.instagram"
                  id="instagram"
                  value={formData.publicProfile.socialMedia.instagram}
                  onChange={handleChange}
                />
              </div>
              <div className="register-component-next-button-area">
                <button type="submit" className="poppins-bold">
                  Sign up
                </button>
              </div>
              <div className="register-component-back-button-area">
                <button
                  type="button"
                  className="poppins-bold"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
