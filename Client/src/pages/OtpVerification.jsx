import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import './style.css';

const OtpVerification = () => {
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    // Add logic to verify OTP here
    // If successful, navigate to reset-password or dashboard
    navigate('/reset-password'); 
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div className="icon-box" style={{ background: '#ecfdf5' }}>
              <ShieldCheck color="#10b981" size={28} />
            </div>
          </div>
          <h2>Verify Identity</h2>
          <p style={{ color: '#64748b' }}>
            Enter the 6-digit code sent to your email.
          </p>
        </div>

        <form onSubmit={handleVerify}>
          <div className="form-group">
            <label style={{textAlign: 'center', display: 'block', marginBottom: '12px'}}>One-Time Password</label>
            <input 
              type="text" 
              placeholder="123456" 
              maxLength="6"
              style={{ letterSpacing: '8px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
              required 
            />
          </div>

          <button type="submit" className="submit-btn">
            Verify Code
          </button>
        </form>

        <div className="auth-footer">
          <p style={{marginBottom: '12px'}}>Didn't receive code? <a href="#">Resend</a></p>
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;