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
  Trophy,
  ClipboardList,
  Clock,
} from "lucide-react";

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

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

        // Fetch coach profile to get coachId
        const coachProfileRes = await axios.get("http://localhost:3000/api/coaches/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const coachId = coachProfileRes.data.data._id;

        // Fetch practices for this coach
        const practicesRes = await axios.get(
          `http://localhost:3000/api/practice/get?coachId=${coachId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setAssignedPractices(practicesRes.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAssignPractice = async (e) => {
    e.preventDefault();

    if (
      !formData.selectedAthlete ||
      !formData.exerciseDrill ||
      !formData.duration
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const coachToken = localStorage.getItem("token");

      // Get the selected athlete ID
      const selectedAthleteData = athletes.find(
        (a) => a.name === formData.selectedAthlete,
      );
      if (!selectedAthleteData) {
        toast.error("Invalid athlete selected");
        return;
      }

      // Get coach data to extract coach ID
      const coachRes = await axios.get(
        "http://localhost:3000/api/coaches/profile",
        {
          headers: { Authorization: `Bearer ${coachToken}` },
        },
      );
      const coachId = coachRes.data.data._id;

      const payload = {
        title: formData.exerciseDrill,
        athleteId: selectedAthleteData._id,
        coachId: coachId,
        activityName: formData.exerciseDrill,
        duration: formData.duration,
        note: formData.notes || "No additional notes",
      };

      const response = await axios.post(
        "http://localhost:3000/api/practice/create",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        toast.success(`Practice assigned to ${formData.selectedAthlete}!`);
        // Reset form
        setFormData({
          selectedAthlete: "",
          exerciseDrill: "Sprints (20m/40m)",
          duration: "",
          notes: "",
        });
        
        // Refetch practices to show the newly assigned practice
        try {
          const token = localStorage.getItem("token");
          const coachRes = await axios.get(
            "http://localhost:3000/api/coaches/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const coachId = coachRes.data.data._id;

          const practicesRes = await axios.get(
            `http://localhost:3000/api/practice/get?coachId=${coachId}`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          setAssignedPractices(practicesRes.data.data || []);
        } catch (err) {
          console.error("Error refetching practices:", err);
        }
        
        setActiveTab("overview");
      }
    } catch (err) {
      console.error("Error assigning practice:", err);
      toast.error(err.response?.data?.message || "Failed to assign practice");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="font-black text-slate-400 uppercase tracking-widest text-xs">
            Syncing Engine...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0 shadow-sm relative z-20">
        <div className="p-8 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200">
              AFC
            </div>
            <span className="font-black text-xl tracking-tight text-slate-800">
              ArenaFitCheck
            </span>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Main Menu
          </p>
          <NavButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
          />
          <NavButton
            active={activeTab === "athletes"}
            onClick={() => setActiveTab("athletes")}
            icon={<Users size={20} />}
            label="My Athletes"
          />
          <NavButton
            active={activeTab === "assign"}
            onClick={() => setActiveTab("assign")}
            icon={<Plus size={20} />}
            label="Assign Practice"
          />
        </div>

        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100"
                alt="Coach"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {profile.name}
                </p>
                <p className="text-[10px] font-black text-blue-600 uppercase">
                  Head Coach
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 h-full overflow-y-auto p-8 md:p-12 relative z-10">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
            <header>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Team <span className="text-blue-600">Intelligence.</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium italic">
                Powered by real-time biomechanical analysis.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                value={athletes.length}
                label="Total Athletes"
                icon={<Users size={24} />}
                color="blue"
              />
              <StatCard
                value="03"
                label="Injury Warnings"
                icon={<AlertTriangle size={24} />}
                color="red"
              />
              <StatCard
                value="88%"
                label="Avg Performance"
                icon={<TrendingUp size={24} />}
                color="emerald"
              />
            </div>

            {/* ASSIGNED PRACTICES SECTION */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Dumbbell size={20} className="text-blue-600" /> Recent Assignments
                </h3>
              </div>
              <div className="p-6">
                {practicesLoading ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">Loading assignments...</p>
                  </div>
                ) : assignedPractices && assignedPractices.length > 0 ? (
                  <div className="space-y-3">
                    {assignedPractices.slice(0, 5).map((practice) => (
                      <div key={practice._id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group cursor-pointer border border-slate-100">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200">
                          <Activity size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900">{practice.activityName}</p>
                          <p className="text-xs text-slate-600 mt-1">
                            To: <span className="font-semibold">{practice.athleteId?.name || 'Athlete'}</span>
                          </p>
                          {practice.duration && (
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              <Clock size={12} /> {practice.duration}
                            </p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-bold text-slate-400">
                            {new Date(practice.createdAt).toLocaleDateString()}
                          </p>
                          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                            Active
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Dumbbell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">No practices assigned yet</p>
                    <p className="text-sm text-slate-500 mt-1">Start by clicking "Assign Practice" to create drills for your athletes</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* MY ATHLETES TAB */}
        {activeTab === "athletes" && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight text-blue-600">
                Athlete Directory
              </h1>
              <div className="relative w-full md:w-96">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Filter by name..."
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-bold text-slate-700"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Name & Sport
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Email
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Joined Date
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {athletes
                    .filter((a) =>
                      a.name.toLowerCase().includes(searchTerm.toLowerCase()),
                    )
                    .map((a) => (
                      <tr
                        key={a._id}
                        className="hover:bg-blue-50/20 transition-colors group"
                      >
                        <td className="px-8 py-6">
                          <p className="font-bold text-slate-900 mb-1">
                            {a.name}
                          </p>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                            {a.sport || "General"}
                          </p>
                        </td>
                        <td className="px-8 py-6 font-medium text-slate-500 text-sm">
                          {a.email}
                        </td>
                        <td className="px-8 py-6 text-center text-xs font-bold text-slate-400">
                          {new Date(a.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6">
                          <button
                            onClick={() =>
                              navigate(`/athlete-profile/${a._id}`)
                            }
                            className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform hover:text-blue-700"
                          >
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

        {/* ASSIGN PRACTICE TAB (FIXED & VISIBLE) */}
        {activeTab === "assign" && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in zoom-in-95 duration-300">
            <header className="text-center">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Publish <span className="text-blue-600">Protocol.</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Assign specific drills and technical focus points to your team.
              </p>
            </header>

            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-10 md:p-14">
              <form className="space-y-8" onSubmit={handleAssignPractice}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
                      Target Athlete
                    </label>
                    <div className="relative">
                      <Users
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <select
                        name="selectedAthlete"
                        value={formData.selectedAthlete}
                        onChange={handleFormChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 appearance-none shadow-inner"
                      >
                        <option value="">Select Athlete...</option>
                        {athletes.map((a) => (
                          <option key={a._id} value={a.name}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
                      Exercise Drill
                    </label>
                    <div className="relative">
                      <Dumbbell
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <select
                        name="exerciseDrill"
                        value={formData.exerciseDrill}
                        onChange={handleFormChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 appearance-none shadow-inner"
                      >
                        <option>Sprints (20m/40m)</option>
                        <option>Long Jump Technique</option>
                        <option>Baton Synchronization</option>
                        <option>Finnish Grip Drills</option>
                        <option>Recovery / Yoga</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
                      Duration / Volume
                    </label>
                    <div className="relative">
                      <Timer
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleFormChange}
                        placeholder="e.g. 15 Mins or 10 Throws"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-2xl outline-none shadow-inner font-bold text-slate-700 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
                    Specific Coaching Notes
                  </label>
                  <textarea
                    rows="4"
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    className="w-full p-6 bg-gray-50 border border-slate-100 rounded-[2.5rem] outline-none focus:ring-2 focus:ring-blue-500 shadow-inner font-medium text-slate-600"
                    placeholder="Focus on keeping the high elbow release..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-3xl shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 tracking-[0.2em] text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />{" "}
                      PUBLISHING...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} /> PUBLISH TO DASHBOARD
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const NavButton = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all group ${
      active
        ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
        : "bg-transparent text-slate-500 hover:bg-slate-50"
    }`}
  >
    <span
      className={`${active ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`}
    >
      {icon}
    </span>
    <span className="text-sm">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto opacity-50" />}
  </button>
);

const StatCard = ({ value, label, icon, color }) => {
  const themes = {
    blue: "text-blue-600 bg-blue-50 shadow-blue-100",
    red: "text-red-600 bg-red-50 shadow-red-100",
    emerald: "text-emerald-600 bg-emerald-50 shadow-emerald-100",
  };
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center gap-8 hover:shadow-lg hover:border-blue-100 transition-all group">
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${themes[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-1">
          {value}
        </p>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
      </div>
    </div>
  );
};

export default CoachDashboard;
