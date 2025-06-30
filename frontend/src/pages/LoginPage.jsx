import { RocketIcon,Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { authStore } from "../stores/authStore";
import { useState } from "react";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const {login, isLoggingIn} = authStore();
  const  handleSubmit =async (e) =>{
    e.preventDefault();
    login(formData);
  }
   return (
    <div className="min-h-screen bg-[#0D0D2B] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#161B3D] text-white rounded-xl p-8 shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <RocketIcon className="text-indigo-400" />
            <span className="text-white">
              <span className="text-indigo-400">0</span>Auth
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-[#1F254A] border border-[#2D3559] rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-[#1F254A] border border-[#2D3559] rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full mt-2 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition"
          >
           {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage
