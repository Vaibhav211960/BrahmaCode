import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import './style.css';

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    // Add logic to update password here
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div className="icon-box" style={{ background: '#eff6ff' }}>
              <Lock color="#2563eb" size={28} />
            </div>
          </div>
          <h2>Set New Password</h2>
          <p style={{ color: '#64748b' }}>
            Your new password must be different to previously used passwords.
          </p>
        </div>

        <form onSubmit={handleReset}>
          <div className="form-group">
            <label>New Password</label>
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

          <button type="submit" className="submit-btn">
            Reset Password
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;