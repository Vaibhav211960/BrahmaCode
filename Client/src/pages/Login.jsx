import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, ChevronRight, Mail, Lock } from "lucide-react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("athlete");

  const [athleteData, setAthleteData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === "coach" 
        ? "http://localhost:3000/api/coaches/login" 
        : "http://localhost:3000/api/athlete/login";

      const res = await axios.post(endpoint, {
        email: athleteData.email,
        password: athleteData.password,
      });

      const { token, user } = res.data;
      if (token) localStorage.setItem("token", token);
      const userRole = user?.role || role;
      localStorage.setItem("role", userRole);

      alert("Login successful! Redirecting...");
      if (userRole === "coach") {
        navigate("/coach-dashboard");
      } else {
        navigate("/athlete-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500">
        
        {/* Header Section consistent with Home badges */}
        <div className="p-8 pb-0 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 mb-6">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 font-medium">Access your performance dashboard</p>
        </div>

        <div className="p-8">
          {/* Role Selector consistent with Home toggle styles */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
            <button
              type="button"
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                role === "athlete" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setRole("athlete")}
            >
              Athlete
            </button>
            <button
              type="button"
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                role === "coach" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setRole("coach")}
            >
              Coach
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={athleteData.email}
                  onChange={(e) => setAthleteData({ ...athleteData, email: e.target.value })}
                  placeholder="name@academy.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={athleteData.password}
                    onChange={(e) => setAthleteData({ ...athleteData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password - Visual only per your request */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-gray-400">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none cursor-not-allowed placeholder:text-gray-300"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" size={16} className="text-sm font-semibold text-blue-600 hover:text-cyan-600 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button consistent with Home primary buttons */}
            <button
              type="submit"
              className="group w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-bold hover:text-cyan-600 transition-colors">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;