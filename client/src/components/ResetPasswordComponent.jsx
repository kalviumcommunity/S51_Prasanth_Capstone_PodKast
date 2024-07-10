import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPasswordComponent() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        {
          token,
          newPassword,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error resetting password: " + error.response.data.message);
    }
  };

  return (
    <>
      <div className="reset-password-component">
        <div className="reset-password-component-card">
          <div className="reset-password-component-heading-area">
            <h1>Reset Password</h1>
          </div>
          <div className="reset-password-component-form-area">
            <form onSubmit={handlePasswordReset}>
              <div className="reset-password-component-form-new-password-input-area">
                <div className="new-password-input-area-label">
                  <label htmlFor="new-password">New Password</label>
                </div>
                <div className="new-password-input-area-input">
                  <input type="password" name="newPassword" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password"/>
                </div>
              </div>
              <div className="reset-password-component-form-conform-new-password-input-area">
                <div className="conform-new-password-input-area-label">
                  <label htmlFor="new-password">Confirm Password</label>
                </div>
                <div className="conform-new-password-input-area-input">
                  <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password"/>
                </div>
              </div>
              <div className="reset-password-component-form-submit-button">
              <button type="submit">Reset Password</button>
              </div>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordComponent;

{
  /* <div>
      <h2>Reset Password</h2>
      <form onSubmit={handlePasswordReset}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div> */
}
