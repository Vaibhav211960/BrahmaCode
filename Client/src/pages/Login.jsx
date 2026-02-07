import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { LogIn } from 'lucide-react';
import './style.css';

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would verify credentials here.
    // For now, we redirect directly to the Coach Dashboard.
    navigate('/coach-dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div className="icon-box" style={{ background: '#eff6ff' }}>
              <LogIn color="#2563eb" size={28} />
            </div>
          </div>
          <h2>Welcome Back</h2>
          <p style={{ color: '#64748b' }}>Access your performance dashboard</p>
        </div>

        {/* Added onSubmit handler */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@academy.com" 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>

          <Link className="forgot-password" to="/forgot-password">Forgot password?</Link>

          <button type="submit" className="submit-btn">
            Login to Dashboard
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? 
          <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;