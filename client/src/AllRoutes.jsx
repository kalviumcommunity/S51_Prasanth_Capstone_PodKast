import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./components/Home";

function AllRouter() {
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
    )
}

export default AllRouter;