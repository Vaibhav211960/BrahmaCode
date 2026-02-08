import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  LogOut,
  Activity,
  AlertTriangle,
  TrendingUp,
  Users,
  ChevronRight,
  ShieldAlert,
  Search,
  Dumbbell,
  Timer,
  Plus,
  FileText,
  ArrowUpRight,
  CheckCircle2,
  LayoutDashboard,
  Loader2,
  Clock,
} from "lucide-react";

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("All"); // New state for filtering

  // Real Data States
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [assignedPractices, setAssignedPractices] = useState([]);
  const [practicesLoading, setPracticesLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    selectedAthlete: "",
    exerciseDrill: "Sprints (20m/40m)",
    duration: "",
    notes: "",
  });

  const profile = {
    name: "Rahul Sharma",
    sport: "Cricket",
    institute: "National Sports Institute",
  };

  // Get unique sports list for tabs
  const sportsCategories = ["All", ...new Set(athletes.map(a => a.sport || "General"))];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setPracticesLoading(true);
        const token = localStorage.getItem('token');

        // Fetch all athletes
        const res = await axios.get("http://localhost:3000/api/athlete/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAthletes(res.data.data);

        // Fetch coach profile
        const coachProfileRes = await axios.get("http://localhost:3000/api/coaches/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const coachId = coachProfileRes.data.data._id;

        // Fetch practices
        const practicesRes = await axios.get(
          `http://localhost:3000/api/practice/get?coachId=${coachId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAssignedPractices(practicesRes.data.data || []);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
        setPracticesLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAssignPractice = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const selectedAthleteData = athletes.find(a => a.name === formData.selectedAthlete);
      
      const coachProfileRes = await axios.get("http://localhost:3000/api/coaches/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const payload = {
        title: formData.exerciseDrill,
        athleteId: selectedAthleteData._id,
        coachId: coachProfileRes.data.data._id,
        activityName: formData.exerciseDrill,
        duration: formData.duration,
        note: formData.notes || "No additional notes",
      };

      await axios.post("http://localhost:3000/api/practice/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`Practice assigned!`);
      setFormData({ selectedAthlete: "", exerciseDrill: "Sprints (20m/40m)", duration: "", notes: "" });
      setActiveTab("overview");
    } catch (err) {
      toast.error("Failed to assign practice");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* SIDEBAR */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0 shadow-sm z-20">
        <div className="p-8 border-b border-slate-50 font-black text-xl text-blue-600">AFC Arena</div>
        <div className="flex-1 p-6 space-y-2">
          <NavButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")} icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavButton active={activeTab === "athletes"} onClick={() => setActiveTab("athletes")} icon={<Users size={20} />} label="Athlete Hub" />
          <NavButton active={activeTab === "assign"} onClick={() => setActiveTab("assign")} icon={<Plus size={20} />} label="Assign Practice" />
        </div>
        <div className="p-6 border-t border-slate-100">
           <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold transition-all"><LogOut size={16} /> Logout</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-full overflow-y-auto p-8 md:p-12 relative z-10">
        
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="max-w-6xl mx-auto space-y-10">
            <h1 className="text-4xl font-black text-slate-900">Team <span className="text-blue-600">Intelligence.</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard value={athletes.length} label="Total Athletes" icon={<Users size={24} />} color="blue" />
              <StatCard value="03" label="Warnings" icon={<AlertTriangle size={24} />} color="red" />
              <StatCard value="88%" label="Avg Performance" icon={<TrendingUp size={24} />} color="emerald" />
            </div>
          </div>
        )}

        {/* MY ATHLETES TAB - UPDATED WITH SPORT FILTER */}
        {activeTab === "athletes" && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Athlete <span className="text-blue-600">Hub</span></h1>
              <div className="relative w-full md:w-96 shadow-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search name..." className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none font-bold text-slate-700" onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            {/* Sport Categories Filter */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {sportsCategories.map(sport => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border ${
                    selectedSport === sport 
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200" 
                    : "bg-white text-slate-400 border-slate-100 hover:border-blue-200"
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>

            {/* Grouped Athletes Display */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Athlete</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sport Type</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Score</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {athletes
                    .filter(a => (selectedSport === "All" || a.sport === selectedSport) && a.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((a) => (
                      <tr key={a._id} className="hover:bg-blue-50/20 transition-colors group">
                        <td className="px-8 py-6">
                          <p className="font-bold text-slate-900 mb-1">{a.name}</p>
                          <p className="text-[10px] font-black text-slate-400 truncate w-40">{a.email}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg font-black text-[10px] uppercase border border-blue-100">
                            {a.sport || "General"}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center font-black text-slate-900 text-xl">
                          {a.yoloScore || '85'}
                        </td>
                        <td className="px-8 py-6 text-center">
                          <button onClick={() => navigate(`/athlete-profile/${a._id}`)} className="p-2 rounded-xl bg-slate-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                            <ArrowUpRight size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {athletes.filter(a => selectedSport === "All" || a.sport === selectedSport).length === 0 && (
                <div className="p-20 text-center text-slate-400 font-bold">No athletes found in this category.</div>
              )}
            </div>
          </div>
        )}

        {/* ASSIGN PRACTICE TAB */}
        {activeTab === "assign" && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in zoom-in-95">
            <header className="text-center">
               <h1 className="text-4xl font-black text-slate-900 tracking-tight">Assign <span className="text-blue-600">Protocol.</span></h1>
            </header>
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-12">
              <form className="space-y-8" onSubmit={handleAssignPractice}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Target Athlete</label>
                    <select name="selectedAthlete" value={formData.selectedAthlete} onChange={handleFormChange} required className="w-full p-4 bg-gray-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700">
                      <option value="">Select...</option>
                      {athletes.map(a => <option key={a._id} value={a.name}>{a.name} ({a.sport})</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Exercise Drill</label>
                    <select name="exerciseDrill" value={formData.exerciseDrill} onChange={handleFormChange} className="w-full p-4 bg-gray-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700">
                      <option>Sprints (20m/40m)</option>
                      <option>Long Jump Technique</option>
                      <option>Baton Synchronization</option>
                      <option>Recovery / Yoga</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Duration</label>
                    <input type="text" name="duration" value={formData.duration} onChange={handleFormChange} placeholder="e.g. 15 Mins" required className="w-full p-4 bg-gray-50 border border-slate-100 rounded-2xl outline-none shadow-inner font-bold text-slate-700" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Coaching Notes</label>
                  <textarea rows="4" name="notes" value={formData.notes} onChange={handleFormChange} className="w-full p-6 bg-gray-50 border border-slate-100 rounded-[2.5rem] outline-none focus:ring-2 focus:ring-blue-500 shadow-inner font-medium text-slate-600" placeholder="Instructions..."></textarea>
                </div>
                <button type="submit" disabled={submitting} className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-3xl shadow-xl hover:shadow-blue-200 transition-all flex items-center justify-center gap-3">
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />} PUBLISH TO DASHBOARD
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
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all group ${active ? "bg-blue-600 text-white shadow-xl shadow-blue-200" : "bg-transparent text-slate-500 hover:bg-slate-50"}`}>
    <span className={`${active ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`}>{icon}</span>
    <span className="text-sm">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto opacity-50" />}
  </button>
);

const StatCard = ({ value, label, icon, color }) => {
  const themes = { blue: "text-blue-600 bg-blue-50 shadow-blue-100", red: "text-red-600 bg-red-50 shadow-red-100", emerald: "text-emerald-600 bg-emerald-50 shadow-emerald-100" };
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-8 group">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${themes[color]}`}>{icon}</div>
      <div>
        <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-1">{value}</p>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
};

export default CoachDashboard;