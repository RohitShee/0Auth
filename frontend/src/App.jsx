import { Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import { Toaster } from "react-hot-toast"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
function App() {

  return (
    <>
       <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
        </Routes>
        <Toaster/>
    </>
  )
}

export default App
