import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Mail, GraduationCap, Building2, Briefcase, 
  Activity, AlertTriangle, TrendingUp, Users, Calendar
} from 'lucide-react';
import './style.css';

const CoachDashboard = () => {
  const navigate = useNavigate();

  const profile = {
    name: "Rahul Sharma",
    sport: "Cricket",
    email: "rahul.s@academy.com",
    level: "College Level",
    experience: "8 Years",
    education: "B.P.Ed (Physical Education)",
    institute: "National Sports Institute"
  };

  const stats = {
    totalAthletes: 42,
    atRisk: 3,
    avgReadiness: "85%",
  };

  const riskAthletes = [
    { id: 1, name: "Arjun Mehta", issue: "High Acute Workload", risk: "High", trend: "+15%" },
    { id: 2, name: "Vihaan Patel", issue: "Poor Sleep Recovery", risk: "Medium", trend: "-5%" },
    { id: 3, name: "Rohan Das", issue: "Reporting Muscle Soreness", risk: "Medium", trend: "Stable" },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="dashboard-wrapper">
        
        <aside className="profile-sidebar">
          <div className="profile-main">
            <img 
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&fit=crop&q=80" 
              alt="Coach" 
              className="sidebar-avatar"
            />
            <h2 className="profile-name">{profile.name}</h2>
            <span className="profile-sport">{profile.sport} Coach</span>
          </div>

          <div className="sidebar-details">
            <div className="sidebar-item">
              <Mail size={18} className="text-muted" />
              <div>
                <span className="sidebar-label">Email</span>
                <span className="sidebar-value">{profile.email}</span>
              </div>
            </div>

            <div className="sidebar-item">
              <Activity size={18} className="text-muted" />
              <div>
                <span className="sidebar-label">Coaching Level</span>
                <span className="sidebar-value">{profile.level}</span>
              </div>
            </div>

            <div className="sidebar-item">
              <Briefcase size={18} className="text-muted" />
              <div>
                <span className="sidebar-label">Experience</span>
                <span className="sidebar-value">{profile.experience}</span>
              </div>
            </div>

            <div className="sidebar-item">
              <GraduationCap size={18} className="text-muted" />
              <div>
                <span className="sidebar-label">Education</span>
                <span className="sidebar-value">{profile.education}</span>
              </div>
            </div>

            <div className="sidebar-item">
              <Building2 size={18} className="text-muted" />
              <div>
                <span className="sidebar-label">Institute</span>
                <span className="sidebar-value">{profile.institute}</span>
              </div>
            </div>
          </div>

          <div className="logout-section" style={{marginTop: '32px', paddingTop: '24px'}}>
            <button onClick={handleLogout} className="btn-danger" style={{width: '100%', justifyContent: 'center'}}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>


        <main className="dashboard-content">
          
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '8px'}}>Dashboard</h1>
            <p style={{color: '#64748b', marginBottom: '24px'}}>
              Monitoring athlete performance and injury risks.
            </p>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{background: '#eff6ff', color: '#2563eb'}}>
                  <Users size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalAthletes}</h3>
                  <p>Active Athletes</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{background: '#fef2f2', color: '#ef4444'}}>
                  <AlertTriangle size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.atRisk}</h3>
                  <p>Injury Risks</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{background: '#ecfdf5', color: '#10b981'}}>
                  <TrendingUp size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.avgReadiness}</h3>
                  <p>Team Readiness</p>
                </div>
              </div>
            </div>
          </div>

          <section className="risk-section">
            <div className="risk-header">
              <span className="risk-title">
                <Activity size={20} /> Attention Needed (Injury Risk)
              </span>
              <button className="btn-secondary" style={{padding: '8px 16px', fontSize: '0.85rem'}}>
                View Full Analysis
              </button>
            </div>
            
            <div className="athlete-list">
              {riskAthletes.map((athlete) => (
                <div key={athlete.id} className="athlete-row">
                  <div className="athlete-info">
                    <div className="athlete-avatar">
                      {athlete.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{fontWeight: '700', marginBottom: '2px'}}>{athlete.name}</p>
                      <p style={{fontSize: '0.85rem', color: '#64748b'}}>{athlete.issue}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`risk-badge ${athlete.risk === 'High' ? 'risk-high' : 'risk-med'}`}>
                      {athlete.risk} Risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="section-header">
              <span className="section-title">Today's Training Plan</span>
            </div>
            <div className="card" style={{padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                <div className="icon-box" style={{background: '#f8fafc', marginBottom: 0}}>
                   <Calendar color="#64748b" />
                </div>
                <div>
                  <h4 style={{fontSize: '1.1rem', marginBottom: '4px'}}>Endurance & Agility Drills</h4>
                  <p style={{color: '#64748b', fontSize: '0.9rem'}}>4:00 PM - 6:00 PM • University Ground</p>
                </div>
              </div>
              <button className="btn-primary">View Details</button>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default CoachDashboard;