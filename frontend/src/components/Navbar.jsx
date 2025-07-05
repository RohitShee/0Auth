import { LogIn, RocketIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { authStore } from "../stores/authStore";

const Navbar = () => {
   const {user,logout} = authStore();
   const handleSubmit = () =>{
      logout();
   }
 return (
    <nav className="flex items-center justify-between px-6 py-4 backdrop-blur-md bg-gray-900/80  sticky top-0 z-50 text-white">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <RocketIcon className="text-indigo-400" />
        <span>
             <span className="text-indigo-400">0</span>Auth
        </span>
      </div>
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to='/tutorial' className="text-shadow-white opacity-90 hover:text-blue-600">Tutorial</Link>
        {
         user ? 
          <Link to="/dashboard" className="text-shadow-white opacity-90 hover:text-blue-600">Dashboard</Link>
         :
          <Link
          to="/login"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-500 hover:opacity-90 transition"
          >
          login
          </Link>
        }
        {
          user ?
          <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-500 hover:opacity-90 transition">
              Logout
          </button>
          :
          <Link
          to="/signup"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-500 hover:opacity-90 transition"
          >
            Get Started
          </Link>
        }
        
      </div>
    </nav>
  );
}

export default Navbar
