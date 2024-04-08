import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import RegisterComponent from "./components/RegisterComponent";

function AllRouter() {
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<RegisterComponent/>} />
        </Routes>
    )
}

export default AllRouter;