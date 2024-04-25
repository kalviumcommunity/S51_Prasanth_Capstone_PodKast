import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRouter from "./AllRoutes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer />
          <AllRouter />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
