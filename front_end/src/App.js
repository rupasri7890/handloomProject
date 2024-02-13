import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import ForgotPassword from "./Components/ForgotPassword"
import { Toaster } from "react-hot-toast"
import ResetPassword from "./Components/ResetPassword"
import WeaverPage from "./Components/WeaverPage"
import CustomerPage from "./Components/CustomerPage"

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/weaverHome" element={<WeaverPage />} />
          <Route path="customerHome" element={<CustomerPage />} />
          <Route path="*" element={<h1>Not Found</h1>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App