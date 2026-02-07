import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Activity, Calendar, TrendingUp, Clock, 
  ChevronRight, Dumbbell, Moon, HeartPulse, User, Trophy, Scale, Timer
} from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR: PROFILE & QUICK INFO */}
        <aside className="w-full lg:w-80 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 border border-gray-100 text-center">
            <div className="relative inline-block mb-6">
              <img 
                src={athlete.img} 
                alt="Athlete" 
                className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                <Trophy size={16} />
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-gray-900 mb-1">{athlete.name}</h2>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">
              {athlete.sport} • {athlete.position}
            </p>

            <div className={`py-2 px-4 rounded-xl inline-block text-xs font-black uppercase tracking-widest border-2 ${
              athlete.readiness > 80 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'
            }`}>
              {athlete.readiness > 80 ? 'Ready to Train' : 'Recovery Needed'}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">Height</p>
                <p className="font-bold text-gray-800">182cm</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">Weight</p>
                <p className="font-bold text-gray-800">75kg</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">Age</p>
                <p className="font-bold text-gray-800">19</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">BMI</p>
                <p className="font-bold text-gray-800">22.6</p>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full mt-8 flex items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-2xl font-black text-xs uppercase transition-all duration-300 border border-gray-100"
            >
              <LogOut size={18} /> Logout Session
            </button>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT */}
        <main className="flex-1 space-y-8">
          
          {/* WELCOME HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{athlete.name.split(' ')[0]}</span> 👋
              </h1>
              <p className="text-gray-500 font-medium mt-2">Don't forget to log your recovery data today.</p>
            </div>
            <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-3xl hover:shadow-2xl hover:shadow-blue-200 transition-all transform hover:-translate-y-1">
               <Activity size={20} /> Daily Check-in
            </button>
          </div>

          {/* QUICK STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Activity size={24} />} value="850" label="Weekly Load (AU)" color="blue" />
            <StatCard icon={<HeartPulse size={24} />} value="92%" label="Recovery Score" color="emerald" />
            <StatCard icon={<Clock size={24} />} value="12.5" label="Hours Trained" color="orange" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* NEXT SESSION SECTION */}
            <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Calendar size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Next Session</h3>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group">
                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm text-center border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">FEB</p>
                  <p className="text-2xl font-black text-blue-600">07</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-gray-900 text-lg mb-1">{upcomingSession.title}</h4>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-bold">
                    <span className="flex items-center gap-1"><Clock size={14}/> {upcomingSession.time}</span>
                    <span className="flex items-center gap-1"><Dumbbell size={14}/> {upcomingSession.intensity}</span>
                  </div>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={24} />
              </div>

              {/* ALERT BOX */}
              <div className="mt-6 flex gap-4 p-6 rounded-3xl bg-orange-50 border border-orange-100">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white flex-shrink-0">
                  <Moon size={20} />
                </div>
                <p className="text-sm text-orange-800 font-medium leading-relaxed">
                  <span className="font-black uppercase text-[10px] block mb-1">Sleep Alert</span>
                  Your average sleep is down 1 hour this week. Prioritize recovery tonight to avoid injury risk.
                </p>
              </div>
            </section>

            {/* RECENT METRICS SECTION */}
            <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Recent Metrics</h3>
              </div>
              
              <div className="space-y-4 flex-1">
                {recentStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                    <span className="font-bold text-gray-500 text-sm">{stat.label}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-black text-gray-900">{stat.value}</span>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-md border ${
                        stat.status === 'good' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                         {stat.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-8 w-full py-4 bg-white border-2 border-gray-100 hover:border-blue-200 text-gray-500 font-black text-xs uppercase tracking-widest rounded-2xl transition-all">
                View Full Analytics
              </button>
            </section>

          </div>
        </main>
      </div>
      
      {/* CONSISTENT FOOTER */}
      <footer className="max-w-7xl mx-auto mt-20 py-10 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 opacity-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs">AFC</div>
          <p className="text-sm font-bold text-gray-400">Athlete Performance Ecosystem</p>
        </div>
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
          © {new Date().getFullYear()} ArenaFitCheck. Manual Coder Edition.
        </p>
      </footer>
    </div>
  );
};

// HELPER COMPONENT FOR STATS
const StatCard = ({ icon, value, label, color }) => {
  const colors = {
    blue: "bg-blue-600 text-white shadow-blue-200",
    emerald: "bg-emerald-500 text-white shadow-emerald-200",
    orange: "bg-orange-500 text-white shadow-orange-200"
  };

  return (
    <div className={`p-8 rounded-[2.5rem] shadow-2xl flex items-center gap-6 transition-all transform hover:-translate-y-1 ${colors[color]}`}>
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

export default AthleteDashboard;