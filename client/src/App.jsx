import React from "react"
import { BrowserRouter } from "react-router-dom"
import AllRouter from "./AllRoutes"
import { ToastContainer } from "react-toastify"

function App() {
  
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <AllRouter/>
      </BrowserRouter>
    </>
  )
}

export default App
