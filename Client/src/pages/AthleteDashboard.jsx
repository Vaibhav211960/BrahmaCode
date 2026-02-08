import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Activity,
  Calendar,
  TrendingUp,
  Target,
  Trophy,
  Edit3,
  Award,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Bell,
  Mail,
  Check,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const AthleteDashboard = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [athlete, setAthlete] = useState({
    name: "Arjun Mehta",
    sport: "Track & Field",
    specialization: "100m Sprint",
    position: "Sprinter",
    img: "",
    status: "Competition Ready",
    readiness: 92,
    age: 19,
    height: "182 cm",
    weight: "75 kg",
    bmi: 22.6,
  });

  const [yoYoTestHistory, setYoYoTestHistory] = useState([]);

  const [technicalTestHistory] = useState([
    { test: "Reaction Time", date: "2024-02-09", score: "0.148s", status: "Elite" },
    { test: "Start Block Power", date: "2024-02-08", score: "85%", status: "Excellent" },
    { test: "Running Form", date: "2024-02-07", score: "92%", status: "Elite" },
    { test: "Acceleration Phase", date: "2024-02-06", score: "88%", status: "Poor" },
    { test: "Deceleration Control", date: "2024-02-05", score: "81%", status: "Good" },
  ]);

  const [recentPerformance] = useState([
    { metric: "100m Sprint PB", value: "11.24s", improvement: "-0.12s", trend: "up" },
    { metric: "60m Sprint", value: "6.89s", improvement: "-0.08s", trend: "up" },
    { metric: "Maximum Speed", value: "39.2 km/h", improvement: "+1.3", trend: "up" },
    { metric: "Ground Contact", value: "0.098s", improvement: "-0.005s", trend: "up" },
  ]);

  const [showCoachInvitations, setShowCoachInvitations] = useState(false);
  const [coachInvitations, setCoachInvitation] = useState([]);

  useEffect(() => {
    const fetchAthleteData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch invitations
        const invRes = await axios.post(
          "http://localhost:3000/api/athlete/invitations",
          {},
          {
            headers: {
              Authorization: token,
            },
          },
        
      )
      .then((res) => {
        setCoachInvitation(res.data);
      })
      .catch((err) => console.log(err));
    }
      catch (error) {
        console.log("Error fetching athlete data:", error);
      }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCoachInvitations(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => navigate("/login");
  const handleEditProfile = () => console.log("Edit profile clicked");

  const handleAcceptInvitation = (invitationId) => {
    axios
      .post("http://localhost:3000/api/athlete/manage-invitation", {
        invitationId,
        action: "accept",
      })
      .then(() => {
        toast.success("Invitation accepted!");
        setShowCoachInvitations(false);
      })
      .catch(() => toast.error("Invitation accept failed"));
  };

  const handleDeclineInvitation = (invitationId) => {
    axios
      .post("http://localhost:3000/api/athlete/manage-invitation", {
        invitationId,
        action: "decline",
      })
      .then(() => {
        toast.success("Invitation declined!");
        setShowCoachInvitations(false);
      })
      .catch(() => toast.error("Invitation decline failed"));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Elite": return "text-emerald-600 bg-emerald-50";
      case "Excellent": return "text-green-600 bg-green-50";
      case "Good": return "text-amber-600 bg-amber-50";
      case "Average": return "text-blue-600 bg-blue-50";
      case "Poor": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getTrendIcon = (trend) => {
    return trend === "up" ? (
      <ChevronRight className="w-4 h-4 text-emerald-500 rotate-90" />
    ) : (
      <ChevronRight className="w-4 h-4 text-red-500 -rotate-90" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back,
            </h1>
            <p className="text-gray-600 mt-2">Track your performance and stay connected</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowCoachInvitations(!showCoachInvitations)}
                className="relative flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                <Bell className="w-5 h-5" />
                {coachInvitations.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {coachInvitations.length}
                  </span>
                )}
              </button>

              {/* Dropdown Window */}
              {showCoachInvitations && (
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-bold text-gray-900">Coach Invitations</h3>
                          <p className="text-xs text-gray-600">{coachInvitations.length} pending</p>
                        </div>
                      </div>
                      <button onClick={() => setShowCoachInvitations(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 overflow-y-auto max-h-[400px]">
                    {coachInvitations.length > 0 ? (
                      coachInvitations.map((invitation) => (
                        <div key={invitation.id} className="mb-4 last:mb-0 border-b border-gray-100 pb-4 last:border-0">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                              {invitation.coachName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 truncate">{invitation.coachName}</h4>
                              <p className="text-sm text-gray-600 truncate">{invitation.coachTitle}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAcceptInvitation(invitation.id)}
                              className="flex-1 flex items-center justify-center gap-1 bg-emerald-500 text-white py-2 rounded-lg text-sm"
                            >
                              <Check className="w-3 h-3" /> Accept
                            </button>
                            <button
                              onClick={() => handleDeclineInvitation(invitation.id)}
                              className="flex-1 flex items-center justify-center gap-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm"
                            >
                              <X className="w-3 h-3" /> Decline
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">No pending invitations</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 rounded-xl transition-all"
            >
              <Edit3 className="w-5 h-5" />
              <span className="hidden md:inline">Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Profile */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 border border-gray-100 text-center">
              <div className="relative inline-block mb-6">
                <img
                  src={athlete.img || "https://via.placeholder.com/150"}
                  alt="Athlete"
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                  <Trophy size={16} />
                </div>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">{athlete.name}</h2>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">
                {athlete.sport} • {athlete.specialization}
              </p>
              <div className={`py-2 px-4 rounded-xl inline-block text-xs font-black uppercase tracking-widest border-2 ${athlete.readiness > 80 ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-red-50 border-red-100 text-red-600"}`}>
                {athlete.readiness > 80 ? "Ready to Train" : "Recovery Needed"}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8 text-left">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Height</p>
                  <p className="font-bold text-gray-800">{athlete.height}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Weight</p>
                  <p className="font-bold text-gray-800">{athlete.weight}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase">Age</p>
                  <p className="font-bold text-gray-800">{athlete.age}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase">BMI</p>
                  <p className="font-bold text-gray-800">{athlete.bmi}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full mt-8 flex items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-2xl font-black text-xs uppercase transition-all">
                <LogOut size={18} /> Logout Session
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Performance Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" /> Recent Performance
                </h3>
                <div className="space-y-3">
                  {recentPerformance.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm text-gray-700">{item.metric}</div>
                        <div className="text-lg font-bold text-gray-900">{item.value}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${item.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                          {item.improvement}
                        </span>
                        {getTrendIcon(item.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Test History */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-600" /> Technical History
                </h3>
                <div className="grid gap-3">
                  {technicalTestHistory.map((test, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm text-gray-900">{test.test}</div>
                        <div className="text-xs text-gray-600">{test.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{test.score}</div>
                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded ${getStatusColor(test.status)}`}>
                          {test.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Yo-Yo Test History Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Yo-Yo Test History</h3>
                  <p className="text-sm text-gray-600">Endurance capacity tracking</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Score</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yoYoTestHistory.map((test, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-sm text-gray-900">{test.date}</td>
                        <td className="py-4 px-4 text-lg font-bold text-gray-900">{test.score}</td>
                        <td className="py-4 px-4">
                          <div className={`px-3 py-1 w-[100px] text-center rounded-full text-xs font-medium ${getStatusColor(test.level)}`}>
                            {test.level}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteDashboard;