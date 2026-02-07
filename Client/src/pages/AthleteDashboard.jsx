import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Activity, Calendar, TrendingUp, Clock, 
  Dumbbell, Target, User, Trophy, Edit3, 
  FileText, BarChart2, Zap, Award, 
  ChevronRight, ChevronLeft, Heart, Shield,
  CheckCircle, AlertCircle, Bell, Mail, Check, X, UserCheck, ChevronDown
} from 'lucide-react';

const AthleteDashboard = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [athlete, setAthlete] = useState({
    name: "Arjun Mehta",
    sport: "Track & Field",
    specialization: "100m Sprint",
    img: "data:image/jpeg;base64,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",
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
  const [coachInvitations] = useState([
    {
      id: 1,
      coachName: "Rahul Sharma",
      coachTitle: "Head Coach - Sprint Academy",
      coachEmail: "rahul.sharma@sprintacademy.com",
      sentDate: "2024-02-10",
      status: "pending"
    },
    {
      id: 2,
      coachName: "Priya Patel",
      coachTitle: "Strength & Conditioning Specialist",
      coachEmail: "priya.patel@elitetraining.com",
      sentDate: "2024-02-08",
      status: "pending"
    }
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCoachInvitations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => navigate('/login');
  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleAcceptInvitation = (invitationId) => {
    console.log(`Accepted invitation ${invitationId}`);
    alert('Invitation accepted! You will be connected with the coach.');
    setShowCoachInvitations(false);
  };

  const handleDeclineInvitation = (invitationId) => {
    console.log(`Declined invitation ${invitationId}`);
    setShowCoachInvitations(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Elite": return "text-emerald-600 bg-emerald-50";
      case "Excellent": return "text-green-600 bg-green-50";
      case "Good": return "text-amber-600 bg-amber-50";
      case "Average": return "text-blue-600 bg-blue-50";
      case "Poor": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getTrendIcon = (trend) => {
    return trend === "up" ? 
      <ChevronRight className="w-4 h-4 text-emerald-500 rotate-90" /> : 
      <ChevronRight className="w-4 h-4 text-red-500 -rotate-90" />;
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Athlete Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Track your performance metrics and test history</p>
=======
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-10 font-sans">
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
>>>>>>> 496a3b4ff67538108f04b49f0cb42155cec32e77
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Button with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowCoachInvitations(!showCoachInvitations)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all relative group"
              >
                <Bell className="w-4 h-4" />
                <span className="hidden md:inline">Coach Invitations</span>
                {coachInvitations.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                    {coachInvitations.length}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${showCoachInvitations ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Window */}
              {showCoachInvitations && (
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-[500px] overflow-hidden">
                  {/* Dropdown Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-bold text-gray-900">Coach Invitations</h3>
                          <p className="text-xs text-gray-600">{coachInvitations.length} pending invitation(s)</p>
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
                            <h4 className="font-bold text-gray-900 truncate">{invitation.coachName}</h4>
                            <p className="text-sm text-gray-600 truncate">{invitation.coachTitle}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500 truncate">{invitation.coachEmail}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3">
                          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                            {invitation.message}
                          </p>
                          <div className="text-xs text-gray-500  flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Sent on {invitation.sentDate}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptInvitation(invitation.id)}
                            className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-2 px-3 rounded-lg text-sm transition-all"
                          >
                            <Check className="w-3 h-3" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleDeclineInvitation(invitation.id)}
                            className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition-colors"
                          >
                            <X className="w-3 h-3" />
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dropdown Footer */}
                  <div className="border-t border-gray-200 p-3 bg-gray-50">
                    <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View all invitations →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Quick Stats */}
          <div className="space-y-6">
            {/* Athlete Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={athlete.img} 
                    alt={athlete.name}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{athlete.name}</h2>
                  <p className="text-gray-600">{athlete.specialization}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">Age</div>
                  <div className="font-medium">{athlete.age}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">Height</div>
                  <div className="font-medium">{athlete.height}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">Weight</div>
                  <div className="font-medium">{athlete.weight}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">BMI</div>
                  <div className="font-medium">{athlete.bmi}</div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Recent Performance
              </h3>
              <div className="space-y-3">
                {recentPerformance.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-700">{item.metric}</div>
                      <div className="text-lg font-bold text-gray-900">{item.value}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {item.improvement}
                      </span>
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Test History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Yo-Yo Test History */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Yo-Lo Test History</h3>
                    <p className="text-sm text-gray-600">Endurance capacity tracking</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Test Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Score</th>                      
                      <th className="py-3 px-8 text-left text-sm font-medium text-gray-700">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yoYoTestHistory.map((test, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">{test.date}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold text-gray-900">{test.score}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className={`px-3 py-1 w-[80px] text-center rounded-full text-xs font-medium ${getStatusColor(test.level)}`}>
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
                    Last test improvement: <span className="font-medium text-emerald-600">+2.1 levels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
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
                    <h3 className="text-lg font-bold text-gray-900">Technical Test History</h3>
                    <p className="text-sm text-gray-600">Skill and technique assessments</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technicalTestHistory.map((test, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-medium text-gray-900">{test.test}</div>
                        <div className="text-sm text-gray-600">{test.date}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(test.status)}`}>
                        {test.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900">{test.score}</div>
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