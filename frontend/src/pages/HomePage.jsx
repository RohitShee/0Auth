import React from 'react'
import { Link } from "react-router-dom";
import { KeyRound, User, BookOpenCheck } from "lucide-react";
const HomePage = () => {
   return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="text-center py-24 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-300">
          Authentication Made Simple
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Secure, scalable, and developer-friendly authentication service.
          Integrate powerful auth features into your applications with just a few
          lines of code.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to='/signup' className="px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-indigo-400 to-purple-500">
            Start Building
          </Link>
          <Link
            to="/tutorial"
            className="px-4 py-2 rounded-md bg-white/10 text-white opacity-70"
          >
            View Documentation
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose 0Auth?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-xl p-6 text-center">
            <KeyRound className="mx-auto text-indigo-400" size={40} />
            <h3 className="text-xl font-semibold mt-4">Secure API Keys</h3>
            <p className="text-gray-300 mt-2">
              Generate and manage secure API keys with built-in rate limiting and access controls.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 text-center">
            <User className="mx-auto text-purple-400" size={40} />
            <h3 className="text-xl font-semibold mt-4">User Management</h3>
            <p className="text-gray-300 mt-2">
              Complete user lifecycle management with detailed analytics and insights.
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 text-center">
            <BookOpenCheck className="mx-auto text-green-400" size={40} />
            <h3 className="text-xl font-semibold mt-4">Easy Integration</h3>
            <p className="text-gray-300 mt-2">
              Simple SDKs and comprehensive documentation to get you started in minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center py-20 px-4 bg-gradient-to-r from-indigo-400 to-purple-500">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-white text-lg mb-6">
          Join thousands of developers who trust 0Auth for their applications.
        </p>
        <button className="px-6 py-3 rounded-md text-indigo-600 font-semibold bg-white">
          Get Started
        </button>
      </section>
    </div>
  );
}

export default HomePage
