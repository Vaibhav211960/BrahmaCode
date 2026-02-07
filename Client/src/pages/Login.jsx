import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import axios from "axios";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();

  const [athleteData, setAthleteData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/athlete/login",
        {
          email: athleteData.email,
          password: athleteData.password,
        }
      );

      console.log("Login success:", res.data);

      // Example: store token if backend sends it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Login successful! Redirecting to dashboard...");
      navigate("/athlete-dashboard");
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

            {/* UI kept as-is, value ignored */}
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
            Login to Dashboard
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
