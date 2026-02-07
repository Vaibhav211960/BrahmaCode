import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Activity, Calendar, TrendingUp, Clock, 
  ChevronRight, Dumbbell, Moon, HeartPulse 
} from 'lucide-react';
import './style.css';

const AthleteDashboard = () => {
  const navigate = useNavigate();

  const athlete = {
    name: "Arjun Mehta",
    sport: "Cricket",
    position: "Fast Bowler",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop&q=80",
    status: "Active",
    readiness: 92
  };

  const upcomingSession = {
    title: "Speed & Agility Drills",
    time: "4:00 PM - 5:30 PM",
    location: "Main Ground",
    coach: "Rahul Sharma",
    intensity: "High"
  };

  const recentStats = [
    { label: "Yo-Yo Test", value: "18.5", trend: "+2.1", status: "good" },
    { label: "100m Sprint", value: "11.2s", trend: "-0.1s", status: "good" },
    { label: "Sleep Avg", value: "6.5h", trend: "-1h", status: "warning" },
  ];

  const handleLogout = () => navigate('/login');

  return (
    <div className="home-container">
      <div className="dashboard-wrapper">
        
        <aside className="profile-sidebar">
          <div className="profile-main">
            <img 
              src={athlete.img} 
              alt="Athlete" 
              className="sidebar-avatar"
            />
            <h2 className="profile-name">{athlete.name}</h2>
            <span className="profile-sport">{athlete.sport} • {athlete.position}</span>
          </div>

          <div className="sidebar-details">
            <div className="sidebar-item" style={{justifyContent: 'center'}}>
               <span className={`status-badge ${athlete.readiness > 80 ? 'status-green' : 'status-red'}`}>
                 {athlete.readiness > 80 ? 'Ready to Train' : 'Recovery Needed'}
               </span>
            </div>

            <hr style={{borderColor: '#f1f5f9', margin: '16px 0'}} />

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
              <div className="mini-stat">
                <span className="label">Height</span>
                <span className="val">182cm</span>
              </div>
              <div className="mini-stat">
                <span className="label">Weight</span>
                <span className="val">75kg</span>
              </div>
              <div className="mini-stat">
                <span className="label">Age</span>
                <span className="val">19</span>
              </div>
              <div className="mini-stat">
                <span className="label">BMI</span>
                <span className="val">22.6</span>
              </div>
            </div>
          </div>

          <div className="logout-section" style={{marginTop: '32px'}}>
            <button onClick={handleLogout} className="btn-danger" style={{width: '100%', justifyContent: 'center'}}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>


        <main className="dashboard-content">
          
          <div className="welcome-header">
            <div>
              <h1 className="section-title" style={{fontSize: '1.8rem'}}>Hello, {athlete.name.split(' ')[0]} 👋</h1>
              <p style={{color: '#64748b'}}>Don't forget to log your recovery data today.</p>
            </div>
            <button className="btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
               <Activity size={18} /> Daily Check-in
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{background: '#eff6ff', color: '#2563eb'}}>
                <Activity size={24} />
              </div>
              <div className="stat-info">
                <h3>850</h3>
                <p>Weekly Load (AU)</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{background: '#ecfdf5', color: '#10b981'}}>
                <HeartPulse size={24} />
              </div>
              <div className="stat-info">
                <h3>92%</h3>
                <p>Recovery Score</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{background: '#fff7ed', color: '#f97316'}}>
                <Clock size={24} />
              </div>
              <div className="stat-info">
                <h3>12.5</h3>
                <p>Hours Trained</p>
              </div>
            </div>
          </div>

          <div className="dashboard-split">
            
            <section className="card-section">
              <div className="section-header">
                 <h3 className="card-title"><Calendar size={20} /> Next Session</h3>
              </div>
              
              <div className="session-card">
                <div className="session-date">
                  <span className="month">FEB</span>
                  <span className="day">07</span>
                </div>
                <div className="session-details">
                  <h4>{upcomingSession.title}</h4>
                  <div className="session-meta">
                    <span><Clock size={14}/> {upcomingSession.time}</span>
                    <span><Dumbbell size={14}/> {upcomingSession.intensity} Intensity</span>
                  </div>
                  <p className="coach-name">Coach: {upcomingSession.coach}</p>
                </div>
                <button className="btn-icon">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="alert-box warning">
                 <Moon size={18} />
                 <span><strong>Sleep Alert:</strong> Your average sleep is down 1 hour this week. Prioritize recovery tonight to avoid injury risk.</span>
              </div>
            </section>

            <section className="card-section">
              <div className="section-header">
                 <h3 className="card-title"><TrendingUp size={20} /> Recent Metrics</h3>
              </div>
              
              <div className="metrics-list">
                {recentStats.map((stat, index) => (
                  <div key={index} className="metric-row">
                    <span className="metric-label">{stat.label}</span>
                    <div className="metric-right">
                      <span className="metric-value">{stat.value}</span>
                      <span className={`metric-trend ${stat.status === 'good' ? 'trend-up' : 'trend-down'}`}>
                         {stat.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="btn-secondary" style={{width: '100%', marginTop: '16px'}}>View All Analytics</button>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AthleteDashboard;