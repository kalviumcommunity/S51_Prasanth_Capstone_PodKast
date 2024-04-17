import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import RegisterComponent from "./components/RegisterComponent";

function AllRouter() {

    const token = localStorage.getItem('token');
    
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={token ? <Navigate to="/" replace /> : <RegisterComponent />} />
        </Routes>
    )
}

export default AllRouter;