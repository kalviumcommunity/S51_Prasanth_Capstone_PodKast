import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  }

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setMessage("Failed to send password reset email.");
    }
  };

  return (
    <>
      <div className="forgot-password-component">
        <div className="forgot-password-component-card">
          <div className="forget-password-component-heading-area">
            <h1 className="forget-password-component-heading">
              Forgot Password
            </h1>
            <div className="forgot-password-back-to-home-buttton">
              <button onClick={backToHome}>Back to Home</button>
            </div>
          </div>
          <div className="forgot-password-component-input-area">
            <div className="forgot-password-component-input-label-area">
              <label>Email</label>
            </div>
            <div className="forgot-password-component-input-field-area">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Registered E-Mail ID"/>
            </div>
            {message && <p>{message}</p>}
          </div>
          <div className="forgot-password-component-submit-button">
            <button onClick={handleForgotPassword}>Send Reset Link</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordComponent;