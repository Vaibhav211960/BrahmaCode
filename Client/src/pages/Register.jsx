import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Register = () => {
  const [role, setRole] = useState("athlete");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    sport: "",
    academyName: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role,
        ...(role === "athlete" && { sport: formData.sport }),
        ...(role === "coach" && { academyName: formData.academyName }),
      };

      const res = await axios.post(
        "http://localhost:3000/api/athlete/register",
        payload
      );

      console.log("Registration Success:", res.data);
      alert("Registered successfully!");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p style={{ color: "#64748b" }}>Start your data-driven journey</p>
        </div>

        {/* Role Selector */}
        <div className="role-selector">
          <button
            type="button"
            className={`role-btn ${role === "athlete" ? "active" : ""}`}
            onClick={() => setRole("athlete")}
          >
            Athlete
          </button>
          <button
            type="button"
            className={`role-btn ${role === "coach" ? "active" : ""}`}
            onClick={() => setRole("coach")}
          >
            Coach
          </button>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {role === "athlete" ? (
            <div className="form-group">
              <label>Primary Sport</label>
              <select
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                required
              >
                <option value="">Select Sport</option>
                <option value="Cricket">Cricket</option>
                <option value="Football">Football</option>
                <option value="Athletics">Athletics</option>
              </select>
            </div>
          ) : (
            <div className="form-group">
              <label>Academy Name</label>
              <input
                type="text"
                name="academyName"
                value={formData.academyName}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
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
