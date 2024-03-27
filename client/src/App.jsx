import React from "react"
import { BrowserRouter } from "react-router-dom"
import AllRouter from "./AllRoutes"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <AllRouter/>
      </BrowserRouter>
    </>
  )
}

export default App
