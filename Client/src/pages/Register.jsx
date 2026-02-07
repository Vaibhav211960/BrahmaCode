import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Register = () => {
  const [role, setRole] = useState('athlete');

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p style={{color: '#64748b'}}>Start your data-driven journey</p>
        </div>

        <div className="role-selector">
          <button 
            className={`role-btn ${role === 'athlete' ? 'active' : ''}`}
            onClick={() => setRole('athlete')}
          >
            Athlete
          </button>
          <button 
            className={`role-btn ${role === 'coach' ? 'active' : ''}`}
            onClick={() => setRole('coach')}
          >
            Coach
          </button>
        </div>

        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@academy.com" required />
          </div>

          {role === 'athlete' ? (
            <div className="form-group">
              <label>Primary Sport</label>
              <select>
                <option>Cricket</option>
                <option>Football</option>
                <option>Athletics</option>
              </select>
            </div>
          ) : (
            <div className="form-group">
              <label>Academy Name</label>
              <input type="text" placeholder="e.g. Sports Academy" />
            </div>
          )}

          {/* Password Fields */}
          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••" required />
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