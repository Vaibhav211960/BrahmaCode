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
<<<<<<< HEAD
  UserCheck,
  ChevronDown,
  Ruler,
  Weight,
  Save,
  Camera,
=======
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f
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

<<<<<<< HEAD
  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Arjun Mehta",
    email: "arjun.mehta@academy.com",
    sport: "Track & Field",
    bio: "Fast bowler focused on increasing pace and endurance. Aiming for state selection this season.",
    height: "182",
    weight: "75",
    age: "19",
    password: "",
  });

  const [showCoachInvitations, setShowCoachInvitations] = useState(false);
  const [coachInvitations, setCoachInvitation] = useState([]);
  const [assignedPractices, setAssignedPractices] = useState([]);
  const [practicesLoading, setPracticesLoading] = useState(false);
=======
  const [recentPerformance] = useState([
    { metric: "100m Sprint PB", value: "11.24s", improvement: "-0.12s", trend: "up" },
    { metric: "60m Sprint", value: "6.89s", improvement: "-0.08s", trend: "up" },
    { metric: "Maximum Speed", value: "39.2 km/h", improvement: "+1.3", trend: "up" },
    { metric: "Ground Contact", value: "0.098s", improvement: "-0.005s", trend: "up" },
  ]);

  const [showCoachInvitations, setShowCoachInvitations] = useState(false);
  const [coachInvitations, setCoachInvitation] = useState([]);
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f

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
<<<<<<< HEAD
        );
        setCoachInvitation(invRes.data);

        // Fetch assigned practices
        setPracticesLoading(true);
        const athleteRes = await axios.get(
          "http://localhost:3000/api/athlete/profile",
          {
            headers: {
              Authorization: token,
            },
          },
        );
        const athleteId = athleteRes.data.data._id;

        const practicesRes = await axios.get(
          `http://localhost:3000/api/practice/get?athleteId=${athleteId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setAssignedPractices(practicesRes.data.data || []);

        // Fetch YOLO test history
        const yoloRes = await axios.get(
          `http://localhost:3000/api/yolo/get/${athleteId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        
        if (yoloRes.data.data && yoloRes.data.data.length > 0) {
          const formattedTests = yoloRes.data.data.map((test) => ({
            date: new Date(test.createdAt).toLocaleDateString(),
            score: test.beepTest?.value || 0,
            level: test.beepTest?.label || "Average",
            trend: "+0",
          }));
          setYoYoTestHistory(formattedTests);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setPracticesLoading(false);
      }
    };

    fetchAthleteData();
=======
        }
      )
      .then((res) => {
        setCoachInvitation(res.data);
      })
      .catch((err) => console.log(err));
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f

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
<<<<<<< HEAD

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/api/athlete/update-profile",
        formData,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      // Update local state with new data
      setAthlete((prev) => ({
        ...prev,
        name: formData.name,
        sport: formData.sport,
        age: formData.age,
        height: `${formData.height} cm`,
        weight: `${formData.weight} kg`,
        bmi: (formData.weight / (formData.height / 100) ** 2).toFixed(1),
      }));

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to current athlete data
    setFormData({
      name: athlete.name,
      email: "arjun.mehta@academy.com",
      sport: athlete.sport,
      bio: "Fast bowler focused on increasing pace and endurance. Aiming for state selection this season.",
      height: athlete.height.replace(" cm", ""),
      weight: athlete.weight.replace(" kg", ""),
      age: athlete.age.toString(),
      password: "",
    });
  };
=======
  const handleEditProfile = () => console.log("Edit profile clicked");
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f

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
<<<<<<< HEAD
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          {/* Welcome Text */}
=======
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative">
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back,
            </h1>
            <p className="text-gray-600 mt-2">Track your performance and stay connected</p>
          </div>

<<<<<<< HEAD
          {/* Top Right Actions */}
=======
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f
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
<<<<<<< HEAD
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-[500px] overflow-hidden">
                  {/* Dropdown Header */}
=======
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f
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

<<<<<<< HEAD
      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        {/* Profile Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Edit Profile
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Update your personal information and metrics
                    </p>
                  </div>
                  <button
                    onClick={handleCancelEdit}
                    className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <form onSubmit={handleProfileSave}>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Profile Picture */}
                      <div className="text-center">
                        <div className="relative inline-block">
                          <img
                            src={
                              athlete.img ||
                              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80"
                            }
                            alt="Profile"
                            className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
                          />
                          <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors border-2 border-white">
                            <Camera className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Personal Details */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <User className="w-5 h-5 text-blue-600" />
                          Personal Details
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Sport
                            </label>
                            <select
                              name="sport"
                              value={formData.sport}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                              <option value="Track & Field">
                                Track & Field
                              </option>
                              <option value="Cricket">Cricket</option>
                              <option value="Football">Football</option>
                              <option value="Basketball">Basketball</option>
                              <option value="Tennis">Tennis</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Physical Stats */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-blue-600" />
                          Physical Stats
                        </h3>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                              <Ruler className="w-4 h-4" />
                              Height (cm)
                            </label>
                            <input
                              type="number"
                              name="height"
                              value={formData.height}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                              <Weight className="w-4 h-4" />
                              Weight (kg)
                            </label>
                            <input
                              type="number"
                              name="weight"
                              value={formData.weight}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Age
                            </label>
                            <input
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio / Goals
                          </label>
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleProfileChange}
                            rows="4"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password (leave blank to keep current)
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleProfileChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {profileLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 border border-gray-100 text-center">
              <div className="relative inline-block mb-6">
                <img
                  src={
                    athlete.img ||
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80"
                  }
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
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 flex-1">
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
                  <button
                    onClick={() => navigate("/YoloTestForm")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <Zap className="w-4 h-4" />
                    Take Test
                  </button>
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
=======
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
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f
                </div>
              </div>

              {/* Technical Test History */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
<<<<<<< HEAD
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
                          <div className="text-sm text-gray-600">
                            {test.date}
                          </div>
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
=======
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
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f
                    </div>
                  ))}
                </div>
              </div>
            </div>
<<<<<<< HEAD
          </div>
        </div>

        {/* ASSIGNED PRACTICES SECTION */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-blue-600" />
              Assigned Practices & Drills
            </h3>

            {practicesLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 animate-spin border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"></div>
                <p className="text-gray-600 mt-4 font-medium">
                  Loading practices...
                </p>
              </div>
            ) : assignedPractices && assignedPractices.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignedPractices.map((practice) => (
                  <div
                    key={practice._id}
                    className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {practice.activityName}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {practice.coachId?.name || "Coach"}
                        </p>
                      </div>
                      <Activity className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    </div>

                    <div className="space-y-2 mb-4">
                      {practice.duration && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 font-medium">
                            {practice.duration}
                          </span>
                        </div>
                      )}
                      {practice.note && (
                        <div className="flex items-start gap-2 text-sm">
                          <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 line-clamp-2">
                            {practice.note}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-blue-200">
                      <p className="text-xs text-gray-500">
                        Assigned:
                        {new Date(practice.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Dumbbell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  No practices assigned yet
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Your coach will assign drills and training sessions here
                </p>
              </div>
            )}
=======

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
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteDashboard;