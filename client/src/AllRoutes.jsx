import { Route, Routes, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import Home from "./components/Home";
import RegisterComponent from "./components/RegisterComponent";
import { AuthContext } from "./components/AuthContext";

function AllRouter() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Redirect logged-in users away from the registration page */}
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/" /> : <RegisterComponent />}
      />
    </Routes>
  );
}

export default AllRouter;
