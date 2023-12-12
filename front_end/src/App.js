import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import ForgotPassword from "./Components/ForgotPassword"
import { Toaster } from "react-hot-toast"
import ResetPassword from "./Components/ResetPassword"

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<div>Home</div>} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
  
}

export default App