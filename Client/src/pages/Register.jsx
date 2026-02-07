import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Register = () => {
  const [role, setRole] = useState("athlete");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    sport: "", // For Athlete
    coachInstitute: "", // Matches your Coach Model
    category: "General", // Default for Coach Model
    level: "Junior", // Default for Coach Model
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
      // Determine endpoint based on role
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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create {role === 'coach' ? 'Coach' : 'Athlete'} Account</h2>
          <p style={{ color: "#64748b" }}>Join the SPTech01 platform</p>
        </div>

        <div className="role-selector">
          <button type="button" className={`role-btn ${role === "athlete" ? "active" : ""}`} onClick={() => setRole("athlete")}>Athlete</button>
          <button type="button" className={`role-btn ${role === "coach" ? "active" : ""}`} onClick={() => setRole("coach")}>Coach</button>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          {role === "athlete" ? (
            <div className="form-group">
              <label>Primary Sport</label>
              <select name="sport" value={formData.sport} onChange={handleChange} required>
                <option value="">Select Sport</option>
                <option value="Cricket">Cricket</option>
                <option value="Football">Football</option>
                <option value="Athletics">Athletics</option>
              </select>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Academy / Institute Name</label>
                <input type="text" name="coachInstitute" value={formData.coachInstitute} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Coaching Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="General">General</option>
                    <option value="Strength">Strength & Conditioning</option>
                    <option value="Tactical">Tactical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Level</label>
                  <select name="level" value={formData.level} onChange={handleChange}>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Register as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;