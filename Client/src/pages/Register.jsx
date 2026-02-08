import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, ChevronRight, User, Mail, Lock, Trophy, School, ShieldCheck } from "lucide-react";
import axios from "axios";

const Register = () => {
  const [role, setRole] = useState("athlete");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    sport: "", 
    coachInstitute: "", 
    category: "General", 
    level: "Junior", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const endpoint = role === "coach" 
        ? "http://localhost:3000/api/coaches/register" 
        : "http://localhost:3000/api/athlete/register";

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        ...(role === "athlete" ? { sport: formData.sport } : { 
          coachInstitute: formData.coachInstitute,
          category: formData.category,
          level: formData.level 
        }),
      };

      const res = await axios.post(endpoint, payload);
      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-8 pb-0 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 mb-6">
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create {role === 'coach' ? 'Coach' : 'Athlete'} Account</h2>
          <p className="text-gray-500 font-medium tracking-wide">Join the ArenaFitCheck data-driven ecosystem</p>
        </div>

        <div className="p-8">
          {/* Role Selector consistent with Login/Home */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-10 shadow-inner">
            <button
              type="button"
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${
                role === "athlete" ? "bg-white text-blue-600 shadow-md" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setRole("athlete")}
            >
              <Trophy size={18} /> Athlete
            </button>
            <button
              type="button"
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${
                role === "coach" ? "bg-white text-blue-600 shadow-md" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setRole("coach")}
            >
              <ShieldCheck size={18} /> Coach
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@academy.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Role Fields */}
            {role === "athlete" ? (
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Primary Sport</label>
                <div className="relative">
                  <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none transition-all"
                    required
                  >
                    <option value="">Select Sport</option>
                    <option value="Running">Running</option>
                    <option value="LongJump">Long-Jump</option>
                    <option value="Realy">Realy</option>
                    <option value="Javelin">Javelin</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Academy / Institute Name</label>
                  <div className="relative">
                    <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="coachInstitute"
                      value={formData.coachInstitute}
                      onChange={handleChange}
                      placeholder="Elite Performance Center"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Coaching Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                      <option value="General">General Coaching</option>
                      <option value="Strength">Strength & Conditioning</option>
                      <option value="Tactical">Tactical Specialist</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Exp Level</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                      <option value="Junior">Junior Coach</option>
                      <option value="Senior">Senior Coach</option>
                      <option value="Professional">Professional / Pro</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Passwords */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group w-full flex items-center justify-center px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mt-4"
            >
              Create {role.charAt(0).toUpperCase() + role.slice(1)} Account
              <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600 font-medium italic">
              Already using ArenaFitCheck?{" "}
              <Link to="/login" className="text-blue-600 font-bold not-italic hover:text-cyan-600 transition-colors">
                Log In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;