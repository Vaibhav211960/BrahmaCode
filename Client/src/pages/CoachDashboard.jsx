import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LogOut, Activity, AlertTriangle, TrendingUp, Users, 
  ChevronRight, ShieldAlert, Search, Dumbbell, Timer, Plus,
  FileText, ArrowUpRight, CheckCircle2, LayoutDashboard, Loader2
} from 'lucide-react';

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- REAL DATA STATES ---
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const profile = {
    name: "Rahul Sharma",
    sport: "Cricket",
    institute: "National Sports Institute"
  };

  // --- FETCH ATHLETES FROM BACKEND ---
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Ensure this URL matches your backend route (e.g., /api/coach/my-athletes)
        const res = await axios.get("http://localhost:3000/api/athlete/all", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAthletes(res.data.data);
        console.log(res.data.data);
        
        // Assuming response is the array of athletes
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load athlete data. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="font-bold text-slate-500">Syncing Athlete Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0 shadow-sm">
        <div className="p-8 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg">AFC</div>
            <span className="font-black text-xl tracking-tight text-slate-800">ArenaFitCheck</span>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
          <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          <NavButton active={activeTab === 'athletes'} onClick={() => setActiveTab('athletes')} icon={<Users size={20}/>} label="My Athletes" />
          <NavButton active={activeTab === 'assign'} onClick={() => setActiveTab('assign')} icon={<Plus size={20}/>} label="Assign Practice" />
        </div>

        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-1">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100" alt="Coach" className="w-10 h-10 rounded-xl object-cover" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{profile.name}</p>
                <p className="text-[10px] font-black text-blue-600 uppercase">Coach</p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-all">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 h-full overflow-y-auto p-8 md:p-12 relative">
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 animate-in fade-in">
            <AlertTriangle size={20} /> <span className="font-bold text-sm">{error}</span>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in">
            <header>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Intelligence <span className="text-blue-600">Overview.</span></h1>
              <p className="text-slate-500 mt-2 font-medium">Monitoring {athletes.length} active athletes.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard value={athletes.length} label="Enrolled Athletes" icon={<Users size={24}/>} color="blue" />
              <StatCard value={athletes.filter(a => a.status === 'High Risk').length} label="High Injury Risk" icon={<AlertTriangle size={24}/>} color="red" />
              <StatCard value="85%" label="Team Avg Readiness" icon={<TrendingUp size={24}/>} color="emerald" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><ShieldAlert size={18} className="text-red-500" /> Critical Attention</h3>
                </div>
                <div className="p-6 space-y-4">
                  {athletes.filter(a => a.status === "High Risk").map(a => (
                    <div key={a._id} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl group hover:border-red-200 transition-all">
                      <p className="font-bold text-slate-900">{a.name}</p>
                      <button onClick={() => setActiveTab('athletes')} className="p-2 rounded-xl bg-slate-50 group-hover:bg-red-50 text-slate-400 group-hover:text-red-600 transition-all">
                        <ArrowUpRight size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'athletes' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Athlete Directory</h1>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" placeholder="Search..." 
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Athlete Details</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Engine Score</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {athletes.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())).map(a => (
                    <tr key={a._id} className="hover:bg-blue-50/20 transition-colors group">
                      <td className="px-8 py-6">
                        <p className="font-bold text-slate-900 mb-1">{a.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{a.sport || 'General'}</p>
                      </td>
                      <td className="px-8 py-6 text-center font-black text-blue-600 text-xl">
                        {a.yoloScore || '--'}
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border ${
                          a.status === 'Active' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-red-50 border-red-100 text-red-600'
                        }`}>{a.status || 'Active'}</span>
                      </td>
                      <td className="px-8 py-6">
                        <button className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                          Analyze <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ... (Assign Practice Tab Content remains same) ... */}

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
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-8">
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