import { Routes,Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import { Toaster } from "react-hot-toast"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { authStore } from "./stores/authStore"
import { useEffect } from "react"
import DashboardPage from "./pages/DashboardPage"
function App() {
  const{user,checkAuth} = authStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  return (
    <>
       <Navbar />
        <Routes>
          <Route path="/" element={!user ? <HomePage/> : <Navigate to ="/Dashboard"/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/dashboard" element={user ? <DashboardPage/> : <Navigate to="/"/>} />
        </Routes>
        <Toaster/>
    </>
  )
}

export default App
