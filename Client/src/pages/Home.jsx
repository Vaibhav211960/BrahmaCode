import React from 'react';
import './style.css';
import { Activity, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero">
        <span className="badge">Revolutionizing Grassroots Sports</span>
        <h1>Data-Driven Performance for <br /><span className="highlight">Every Athlete.</span></h1>
        <p className="hero-desc">
          Moving beyond intuition. We provide elite-level injury prevention and 
          performance analytics for schools and academies.
        </p>
        <div className="btn-group">
          <button className="btn-primary">Get Started <ArrowRight size={18} style={{marginLeft: '8px'}} /></button>
        </div>
      </section>

      {/* FEATURES */}
      <div className="features-grid">
        <div className="card">
          <div className="icon-box"><BarChart3 color="#2563eb" /></div>
          <h3>Performance Metrics</h3>
          <p>Track sprint times and stamina levels with standardized tests without expensive sensors.</p>
        </div>
        
        <div className="card">
          <div className="icon-box"><Activity color="#ef4444" /></div>
          <h3>Injury Prevention</h3>
          <p>Our algorithms analyze wellness logs to flag athletes at risk of burnout or injury.</p>
        </div>

        <div className="card">
          <div className="icon-box"><ShieldCheck color="#10b981" /></div>
          <h3>Coach Insights</h3>
          <p>Identify talent and manage entire teams from a single, intuitive data dashboard.</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <h2>Ready to optimize your team?</h2>
        <p style={{color: '#94a3b8', marginBottom: '32px'}}>Join the academies building the next generation of athletes.</p>
        <button className="btn-primary" style={{background: 'white', color: '#0f172a'}}>Start for Free</button>
      </footer>
    </div>
  );
};

export default Home;