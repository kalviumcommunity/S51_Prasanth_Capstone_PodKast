import { Route, Routes, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import Home from "./components/Home";
import RegisterComponent from "./components/RegisterComponent";
import { AuthContext } from "./components/AuthContext";
import UserProfile from "./components/Helpers/UserProfile";
import ForgetPasswordComponent from "./components/ForgetPasswordComponent";
import ResetPasswordComponent from "./components/ResetPasswordComponent";

function AllRouter() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Redirect logged-in users away from the registration page */}
      <Route path="/user/profile/:username" element={<UserProfile />} />
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/" /> : <RegisterComponent />}
      />
      <Route path="/forgot-password" element={<ForgetPasswordComponent/>} />
      <Route path="/reset-password/:token" element={<ResetPasswordComponent/>} />
    </Routes>
  );
}

export default AllRouter;
