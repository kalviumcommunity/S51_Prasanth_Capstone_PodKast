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
    <div>
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
    </div>
  );
}

export default ResetPasswordComponent;
