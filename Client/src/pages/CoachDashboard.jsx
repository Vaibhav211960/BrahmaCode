import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Mail, GraduationCap, Building2, Briefcase, 
  Activity, AlertTriangle, TrendingUp, Users, Calendar, 
  ChevronRight, ShieldAlert, Award
} from 'lucide-react';

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

  const handleLogout = () => navigate('/login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR: COACH PROFILE */}
        <aside className="w-full lg:w-80 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&fit=crop&q=80" 
                  alt="Coach" 
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl mx-auto"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                  <Award size={16} />
                </div>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">{profile.name}</h2>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{profile.sport} Head Coach</p>
            </div>

            <div className="space-y-4 border-t border-gray-50 pt-6">
              <SidebarItem icon={<Mail size={18}/>} label="Email" value={profile.email} />
              <SidebarItem icon={<Activity size={18}/>} label="Coaching Level" value={profile.level} />
              <SidebarItem icon={<Briefcase size={18}/>} label="Experience" value={profile.experience} />
              <SidebarItem icon={<GraduationCap size={18}/>} label="Education" value={profile.education} />
              <SidebarItem icon={<Building2 size={18}/>} label="Institute" value={profile.institute} />
            </div>

            <button 
              onClick={handleLogout} 
              className="w-full mt-10 flex items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-2xl font-black text-xs uppercase transition-all duration-300 border border-gray-100"
            >
              <LogOut size={18} /> Logout Session
            </button>
          </div>
        </aside>

        {/* MAIN DASHBOARD */}
        <main className="flex-1 space-y-8">
          
          {/* HEADER */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest mb-4">
                Team Intelligence
              </span>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                Coach <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Dashboard.</span>
              </h1>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl font-black text-xs uppercase text-gray-500 hover:bg-gray-50 transition-all">
                Add Athlete
              </button>
              <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-3xl hover:shadow-2xl hover:shadow-blue-200 transition-all transform hover:-translate-y-1">
                 <Activity size={20} /> Generate Report
              </button>
            </div>
          </header>

          {/* QUICK STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Users size={24} />} value={stats.totalAthletes} label="Active Athletes" color="blue" />
            <StatCard icon={<AlertTriangle size={24} />} value={stats.atRisk} label="Injury Risks" color="red" />
            <StatCard icon={<TrendingUp size={24} />} value={stats.avgReadiness} label="Team Readiness" color="emerald" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-1 gap-8">
            
            {/* ATTENTION NEEDED SECTION */}
            <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-600">
                    <ShieldAlert size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Attention Needed</h3>
                </div>
                <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View Analytics</button>
              </div>

              <div className="grid gap-4">
                {riskAthletes.map((athlete) => (
                  <div key={athlete.id} className="flex items-center justify-between p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center font-black text-blue-600 shadow-sm">
                        {athlete.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-900">{athlete.name}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">{athlete.issue}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="hidden md:block text-right">
                          <p className="text-[10px] font-black text-gray-400 uppercase">Workload</p>
                          <p className={`text-xs font-black ${athlete.risk === 'High' ? 'text-red-500' : 'text-orange-500'}`}>{athlete.trend}</p>
                       </div>
                       <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${
                        athlete.risk === 'High' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-orange-50 border-orange-100 text-orange-600'
                       }`}>
                        {athlete.risk} Risk
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TRAINING PLAN */}
            <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Calendar size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Today's Training Plan</h3>
              </div>
              
              <div className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 border border-gray-100 group hover:border-blue-200 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm">
                    <Activity size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-lg">Endurance & Agility Drills</h4>
                    <p className="text-sm text-gray-500 font-bold">4:00 PM - 6:00 PM • University Ground</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-all">
                  Full Details <ChevronRight size={16} />
                </button>
              </div>
            </section>

          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto mt-20 py-10 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 opacity-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs">AFC</div>
          <p className="text-sm font-bold text-gray-400">Coach Performance Management</p>
        </div>
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
          © {new Date().getFullYear()} ArenaFitCheck. Manual Coder Edition.
        </p>
      </footer>
    </div>
  );
};

// HELPER COMPONENTS
const SidebarItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 text-gray-400">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-gray-800 break-all">{value}</p>
    </div>
  </div>
);

const StatCard = ({ icon, value, label, color }) => {
  const themes = {
    blue: "bg-blue-600 text-white shadow-blue-200",
    red: "bg-red-500 text-white shadow-red-200",
    emerald: "bg-emerald-500 text-white shadow-emerald-200"
  };

  return (
    <div className={`p-8 rounded-[2.5rem] shadow-2xl flex items-center gap-6 transition-all transform hover:-translate-y-1 ${themes[color]}`}>
      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-black tracking-tight">{value}</h3>
        <p className="text-sm font-medium opacity-80">{label}</p>
      </div>
    </div>
  );
};

export default CoachDashboard;