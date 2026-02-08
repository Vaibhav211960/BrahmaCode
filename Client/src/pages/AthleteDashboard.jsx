import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Activity,
  Calendar,
  TrendingUp,
  Clock,
  Dumbbell,
  Target,
  User,
  Trophy,
  Edit3,
  FileText,
  BarChart2,
  Zap,
  Award,
  ChevronRight,
  ChevronLeft,
  Heart,
  Shield,
  CheckCircle,
  AlertCircle,
  Bell,
  Mail,
  Check,
  X,
  UserCheck,
  ChevronDown,
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
    img: "",
    status: "Competition Ready",
    readiness: 92,
    age: 19,
    height: "182 cm",
    weight: "75 kg",
    bmi: 22.6,
  });

  const [yoYoTestHistory] = useState([
    { date: "2024-02-10", score: 18.5, level: "Excellent", trend: "+2.1" },
    { date: "2024-02-03", score: 16.4, level: "Good", trend: "+0.8" },
    { date: "2024-01-27", score: 15.6, level: "Average", trend: "+1.2" },
    { date: "2024-01-20", score: 14.4, level: "Below Avg", trend: "-0.5" },
    { date: "2024-01-13", score: 14.9, level: "Average", trend: "0" },
  ]);

  const [technicalTestHistory] = useState([
    {
      test: "Reaction Time",
      date: "2024-02-09",
      score: "0.148s",
      status: "Elite",
    },
    {
      test: "Start Block Power",
      date: "2024-02-08",
      score: "85%",
      status: "Excellent",
    },
    { test: "Running Form", date: "2024-02-07", score: "92%", status: "Elite" },
    {
      test: "Acceleration Phase",
      date: "2024-02-06",
      score: "88%",
      status: "Poor",
    },
    {
      test: "Deceleration Control",
      date: "2024-02-05",
      score: "81%",
      status: "Good",
    },
  ]);

  const [recentPerformance] = useState([
    {
      metric: "100m Sprint PB",
      value: "11.24s",
      improvement: "-0.12s",
      trend: "up",
    },
    {
      metric: "60m Sprint",
      value: "6.89s",
      improvement: "-0.08s",
      trend: "up",
    },
    {
      metric: "Maximum Speed",
      value: "39.2 km/h",
      improvement: "+1.3",
      trend: "up",
    },
    {
      metric: "Ground Contact",
      value: "0.098s",
      improvement: "-0.005s",
      trend: "up",
    },
  ]);

  const [showCoachInvitations, setShowCoachInvitations] = useState(false);
  const [coachInvitations, setCoachInvitation] = useState([
    {
      id: 1,
      coachName: "Rahul Sharma",
      coachTitle: "Head Coach - Sprint Academy",
      coachEmail: "rahul.sharma@sprintacademy.com",
      sentDate: "2024-02-10",
      status: "pending",
      message:
        "I've been following your progress and would like to invite you to join our elite sprint program. Your recent 100m times show great potential.",
    },
    {
      id: 2,
      coachName: "Priya Patel",
      coachTitle: "Strength & Conditioning Specialist",
      coachEmail: "priya.patel@elitetraining.com",
      sentDate: "2024-02-08",
      status: "pending",
      message:
        "Impressed by your Yo-Yo test scores! I'd love to work with you on strength conditioning to optimize your sprint performance.",
    },
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/api/athlete/invitations",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )
      .then((res) => {
        setCoachInvitation(res.data);
      });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCoachInvitations(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => navigate("/login");
  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleAcceptInvitation = (invitationId) => {
    axios
      .post("http://localhost:3000/api/athlete/manage-invitation", {
        invitationId,
        action: "accept",
      })
      .then((res) => {
        toast.success("Invitation accepted!");
      })
      .catch((err) => {
        toast.error("Invitation accept failed");
      });
    setShowCoachInvitations(false);
  };

  const handleDeclineInvitation = (invitationId) => {
    axios
      .post("http://localhost:3000/api/athlete/manage-invitation", {
        invitationId,
        action: "decline",
      })
      .then((res) => {
        toast.success("Invitation declined!");
      })
      .catch((err) => {
        toast.error("Invitation decline failed");
      });
    setShowCoachInvitations(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Elite":
        return "text-emerald-600 bg-emerald-50";
      case "Excellent":
        return "text-green-600 bg-green-50";
      case "Good":
        return "text-amber-600 bg-amber-50";
      case "Average":
        return "text-blue-600 bg-blue-50";
      case "Poor":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
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
<<<<<<< HEAD
      {/* Top Navigation Bar - Moved to top */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          {/* Welcome Text */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                {athlete.name}
              </span>{" "}
              👋
            </h1>
            <p className="text-gray-600 mt-1">
              Track your performance and stay connected
            </p>
=======
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
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
>>>>>>> 2ded9c3b101655f5ee7108280bc6335775ec67f9
          </div>

          {/* Top Right Actions */}
          <div className="flex items-center gap-3">
            {/* Notification Button with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowCoachInvitations(!showCoachInvitations)}
                className="relative flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 rounded-xl transition-all duration-200 hover:shadow-md group"
              >
                <Bell className="w-5 h-5" />
                {coachInvitations.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {coachInvitations.length}
                  </span>
                )}
              </button>

              {showCoachInvitations && (
                <div className="overflow-scroll absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-[500px]">
                  {/* Dropdown Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-bold text-gray-900">
                            Coach Invitations
                          </h3>
                          <p className="text-xs text-gray-600">
                            {coachInvitations.length} pending invitation(s)
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowCoachInvitations(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Dropdown Content */}
                  <div className="p-4 overflow-y-auto max-h-[400px]">
                    {coachInvitations.map((invitation) => (
                      <div key={invitation.id} className="mb-4 last:mb-0">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {invitation.coachName.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">
                              {invitation.coachName}
                            </h4>
                            <p className="text-sm text-gray-600 truncate">
                              {invitation.coachTitle}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500 truncate">
                                {invitation.coachEmail}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3">
                          <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Sent on {invitation.sentDate}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleAcceptInvitation(invitation.id)
                            }
                            className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-2 px-3 rounded-lg text-sm transition-all hover:shadow-md"
                          >
                            <Check className="w-3 h-3" />
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleDeclineInvitation(invitation.id)
                            }
                            className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition-colors"
                          >
                            <X className="w-3 h-3" />
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 rounded-xl transition-all duration-200 hover:shadow-md group"
            >
              <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="hidden md:inline">Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Profile Card */}
        <div className="w-full lg:w-80 space-y-6">
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

            <h2 className="text-2xl font-black text-gray-900 mb-1">
              {athlete.name}
            </h2>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">
              {athlete.sport} • {athlete.specialization}
            </p>

            <div
              className={`py-2 px-4 rounded-xl inline-block text-xs font-black uppercase tracking-widest border-2 ${
                athlete.readiness > 80
                  ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                  : "bg-red-50 border-red-100 text-red-600"
              }`}
            >
              {athlete.readiness > 80 ? "Ready to Train" : "Recovery Needed"}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Height
                </p>
                <p className="font-bold text-gray-800">{athlete.height}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Weight
                </p>
                <p className="font-bold text-gray-800">{athlete.weight}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Age
                </p>
                <p className="font-bold text-gray-800">{athlete.age}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  BMI
                </p>
                <p className="font-bold text-gray-800">{athlete.bmi}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-8 flex items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-2xl font-black text-xs uppercase transition-all duration-300 border border-gray-100 hover:shadow-sm"
            >
              <LogOut size={18} /> Logout Session
            </button>
          </div>
        </aside>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 flex-1">
          {/* Left Column - Profile & Quick Stats */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Recent Performance
              </h3>
              <div className="space-y-3">
                {recentPerformance.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <div className="text-sm text-gray-700">{item.metric}</div>
                      <div className="text-lg font-bold text-gray-900">
                        {item.value}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          item.trend === "up"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.improvement}
                      </span>
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle & Right Columns - Test History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Yo-Yo Test History */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Yo-Yo Test History
                    </h3>
                    <p className="text-sm text-gray-600">
                      Endurance capacity tracking
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                        Test Date
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                        Score
                      </th>
                      <th className="py-3 px-8 text-left text-sm font-medium text-gray-700">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yoYoTestHistory.map((test, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">
                            {test.date}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold text-gray-900">
                              {test.score}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div
                            className={`px-3 py-1 w-[80px] text-center rounded-full text-xs font-medium ${getStatusColor(test.level)}`}
                          >
                            {test.level}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Last test improvement:{" "}
                    <span className="font-medium text-emerald-600">
                      +2.1 levels
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Test History */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Technical Test History
                    </h3>
                    <p className="text-sm text-gray-600">
                      Skill and technique assessments
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technicalTestHistory.map((test, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-medium text-gray-900">
                          {test.test}
                        </div>
                        <div className="text-sm text-gray-600">{test.date}</div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(test.status)}`}
                      >
                        {test.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900">
                        {test.score}
                      </div>
                      {test.status === "Elite" ? (
                        <Award className="w-5 h-5 text-amber-500" />
                      ) : test.status === "Excellent" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : test.status === "Poor" ? (
                        <CheckCircle className="w-5 h-5 text-red-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteDashboard;
