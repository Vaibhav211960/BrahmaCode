import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Activity, AlertTriangle, TrendingUp, Users, 
  ChevronRight, ShieldAlert, Search, Dumbbell, Timer, Plus,
  FileText, ArrowUpRight, CheckCircle2, LayoutDashboard
} from 'lucide-react';

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const profile = {
    name: "Rahul Sharma",
    sport: "Cricket",
    institute: "National Sports Institute"
  };

  const athletes = [
    { id: 1, name: "Arjun Mehta", sport: "Cricket", yolo: 88, running: 92, status: "High Risk", lastTest: "2 hrs ago" },
    { id: 2, name: "Vihaan Patel", sport: "Cricket", yolo: 75, running: 85, status: "Active", lastTest: "Yesterday" },
    { id: 3, name: "Rohan Das", sport: "Cricket", yolo: 62, running: 70, status: "Recovery", lastTest: "3 days ago" },
    { id: 4, name: "Sanya Iyer", sport: "Athletics", yolo: 95, running: 98, status: "Active", lastTest: "Today" },
  ];

  const handleLogout = () => navigate('/login');

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      
      {/* 1. LEFT SIDEBAR - FIXED WIDTH, NO COLLISION */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0 shadow-sm">
        {/* Logo Section */}
        

        {/* Navigation Section */}
        <div className="flex-1 p-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
          <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          <NavButton active={activeTab === 'athletes'} onClick={() => setActiveTab('athletes')} icon={<Users size={20}/>} label="My Athletes" />
          <NavButton active={activeTab === 'assign'} onClick={() => setActiveTab('assign')} icon={<Plus size={20}/>} label="Assign Practice" />
          <NavButton active={false} onClick={() => {}} icon={<FileText size={20}/>} label="Test Reports" />
        </div>

        {/* Coach Profile Card in Sidebar */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-3">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100" alt="Coach" className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{profile.name}</p>
                <p className="text-[10px] font-black text-blue-600 uppercase truncate">Head Coach</p>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-medium truncate italic">{profile.institute}</div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-all">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA - SCROLLABLE INDEPENDENTLY */}
      <main className="flex-1 h-full overflow-y-auto p-8 md:p-12 relative">
        
        {/* Tab Content: Dashboard Overview */}
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
            <header>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Intelligence <span className="text-blue-600">Overview.</span></h1>
              <p className="text-slate-500 mt-2 font-medium">Real-time team readiness and health insights from the YOLO engine.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard value="42" label="Enrolled Athletes" icon={<Users size={24}/>} color="blue" />
              <StatCard value="03" label="High Injury Risk" icon={<AlertTriangle size={24}/>} color="red" />
              <StatCard value="85%" label="Team Avg Readiness" icon={<TrendingUp size={24}/>} color="emerald" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><ShieldAlert size={18} className="text-red-500" /> Critical Attention</h3>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest tracking-tighter">Live Warning</span>
                </div>
                <div className="p-6 space-y-4">
                  {athletes.filter(a => a.status === "High Risk").map(a => (
                    <div key={a.id} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl hover:border-red-200 transition-colors group">
                      <div>
                        <p className="font-bold text-slate-900">{a.name}</p>
                        <p className="text-xs text-red-500 font-bold uppercase tracking-tighter">High Acute Workload Detected</p>
                      </div>
                      <button onClick={() => setActiveTab('athletes')} className="p-2 rounded-xl bg-slate-50 group-hover:bg-red-50 text-slate-400 group-hover:text-red-600 transition-all">
                        <ArrowUpRight size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 flex flex-col justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-inner">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Team Status: Stable</h3>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">Overall technique scores have improved by 12% across the team this week.</p>
                  <button onClick={() => setActiveTab('athletes')} className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">View Progress Maps</button>
              </section>
            </div>
          </div>
        )}

        {/* Tab Content: Athlete Directory */}
        {activeTab === 'athletes' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Athlete Directory</h1>
                <p className="text-slate-500 mt-1">Manage profiles and view detailed performance tests.</p>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name, sport, or status..." 
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Athlete Details</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">YOLO Score</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Technique %</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {athletes.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())).map(a => (
                    <tr key={a.id} className="hover:bg-blue-50/20 transition-colors group">
                      <td className="px-8 py-6">
                        <p className="font-bold text-slate-900 leading-none mb-1">{a.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{a.sport} • {a.lastTest}</p>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`text-xl font-black ${a.yolo > 80 ? 'text-emerald-500' : 'text-orange-500'}`}>{a.yolo}</span>
                      </td>
                      <td className="px-8 py-6 text-center font-black text-slate-600">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-500 text-xs">
                          {a.running}%
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                          a.status === 'Active' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'
                        }`}>{a.status}</span>
                      </td>
                      <td className="px-8 py-6">
                        <button className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                          View Analysis <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'assign' && (
          <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-300">
            <header className="text-center mb-10">
               <h1 className="text-4xl font-black text-slate-900 tracking-tight">Assign Training Protocol</h1>
               <p className="text-slate-500 mt-2 font-medium">Set goals, duration, and technical notes for specific athletes.</p>
            </header>

            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-12">
              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Training Assigned!'); setActiveTab('overview'); }}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Select Athlete</label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 appearance-none shadow-sm cursor-pointer">
                      <option>Select Athlete...</option>
                      {athletes.map(a => <option key={a.id}>{a.name}</option>)}
                      <option className="font-black text-blue-600">-- ENTIRE TEAM --</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Exercise Category</label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 appearance-none shadow-sm cursor-pointer">
                      <option>Endurance (Run/Sprint)</option>
                      <option>Technique (Long Jump/Relay)</option>
                      <option>Recovery (Yoga/Stretching)</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Session Volume</label>
                    <div className="relative">
                      <Timer className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" placeholder="e.g. 15 Minutes or 5 Sets" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none shadow-sm font-bold text-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Intensity Level</label>
                    <div className="flex gap-2">
                       {['Low', 'Mid', 'Max'].map(level => (
                         <button key={level} type="button" className="flex-1 py-4 rounded-2xl border border-slate-200 font-black text-[10px] uppercase text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
                           {level}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Technical Instructions</label>
                  <textarea rows="4" className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-medium" placeholder="Ex: Focus on mid-foot strike and arm swing synchronization during high-speed phase..."></textarea>
                </div>

                <button type="submit" className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-3xl shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 tracking-widest uppercase text-sm">
                  <Plus size={20} /> PUBLISH PROTOCOL
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

// UI HELPER COMPONENTS
const NavButton = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all group ${
      active ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-transparent text-slate-500 hover:bg-slate-50'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`}>{icon}</span>
    <span className="text-sm">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto opacity-50" />}
  </button>
);

const StatCard = ({ value, label, icon, color }) => {
  const themes = {
    blue: "text-blue-600 bg-blue-50",
    red: "text-red-600 bg-red-50",
    emerald: "text-emerald-600 bg-emerald-50"
  };
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-8 hover:shadow-md transition-shadow">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${themes[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-1">{value}</p>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
};

export default CoachDashboard;