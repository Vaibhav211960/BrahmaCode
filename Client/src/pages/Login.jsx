import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import axios from "axios";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  // State for Role Selection
  const [role, setRole] = useState("athlete");

  const [athleteData, setAthleteData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Logic: Switch endpoint based on the selected role
      const endpoint = role === "coach" 
        ? "http://localhost:3000/api/coaches/login" 
        : "http://localhost:3000/api/athlete/login";

      const res = await axios.post(endpoint, {
        email: athleteData.email,
        password: athleteData.password,
      });

      console.log(`${role} login success:`, res.data);

      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      // If backend doesn't send role in user object, we use our state
      const userRole = user?.role || role;
      localStorage.setItem("role", userRole);

      alert("Login successful! Redirecting...");

      // Redirection logic based on the role
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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <div className="icon-box" style={{ background: "#eff6ff" }}>
              <LogIn color="#2563eb" size={28} />
            </div>
          </div>
          <h2>Welcome Back</h2>
          <p style={{ color: "#64748b" }}>Access your performance dashboard</p>
        </div>

        {/* Added Role Selector to match Register page style */}
        <div className="role-selector" style={{ marginBottom: '20px' }}>
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

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={athleteData.email}
              onChange={(e) =>
                setAthleteData({ ...athleteData, email: e.target.value })
              }
              placeholder="name@academy.com"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={athleteData.password}
                onChange={(e) =>
                  setAthleteData({ ...athleteData, password: e.target.value })
                }
                placeholder="••••••••"
                required
              />
            </div>

            {/* Keeping UI untouched as requested */}
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Link className="forgot-password" to="/forgot-password">
            Forgot password?
          </Link>

          <button type="submit" className="submit-btn">
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;