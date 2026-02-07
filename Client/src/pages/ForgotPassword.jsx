import React from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft } from 'lucide-react';
import './style.css';

const ForgotPassword = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div className="icon-box" style={{ background: '#fff7ed' }}>
              <KeyRound color="#f97316" size={28} />
            </div>
          </div>
          <h2>Reset Password</h2>
          <p style={{ color: '#64748b' }}>
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <form>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@academy.com" 
              required 
            />
          </div>

          <button type="submit" className="submit-btn">
            Send Reset Link
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

export default ForgotPassword;