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
  const [assignedPractices, setAssignedPractices] = useState([]);
  const [practicesLoading, setPracticesLoading] = useState(false);

  // Test data states
  const [runningTest, setRunningTest] = useState(null);
  const [javelineTest, setJavelineTest] = useState(null);
  const [relayTest, setRelayTest] = useState(null);
  const [longJumpTest, setLongJumpTest] = useState(null);
  const [testsLoading, setTestsLoading] = useState(false);

  // Weakness data states
  const [runningWeakness, setRunningWeakness] = useState([]);
  const [javelineWeakness, setJavelineWeakness] = useState([]);
  const [relayWeakness, setRelayWeakness] = useState([]);
  const [longJumpWeakness, setLongJumpWeakness] = useState([]);

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
  const [coachInvitations, setCoachInvitation] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sport: "",
    specialization: "",
    age: "",
    height: "",
    weight: "",
    bio: "",
  });

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      setProfileLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:3000/api/athlete/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        setAthlete((prev) => ({
          ...prev,
          name: formData.name,
          email: formData.email,
          sport: formData.sport,
          specialization: formData.specialization,
          age: parseInt(formData.age),
          height: formData.height,
          weight: formData.weight,
          bio: formData.bio,
        }));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    handleProfileSave();
  }, []);

  useEffect(() => {
    const fetchAthleteData = async () => {
      try {
        const token = localStorage.getItem("token");
        setTestsLoading(true);

        // Fetch athlete profile first
        const athleteRes = await axios.get(
          "http://localhost:3000/api/athlete/profile",
          {
            headers: {
              Authorization: token,
            },
          },
        );
        const athleteId = athleteRes.data.data._id;

        // // Fetch invitations
        // const invRes = await axios.post(
        //   "http://localhost:3000/api/athlete/invitations",
        //   {},
        //   {
        //     headers: {
        //       Authorization: token,
        //     },
        //   },
        // );
        // setCoachInvitation(invRes.data);

        // Fetch YOLO test history
        // const yoloRes = await axios.get(
        //   `http://localhost:3000/api/yolo/get/${athleteId}`,
        //   {
        //     headers: {
        //       Authorization: token,
        //     },
        //   },
        // );

        // if (yoloRes.data.data && yoloRes.data.data.length > 0) {
        //   const formattedTests = yoloRes.data.data.map((test) => ({
        //     date: new Date(test.createdAt).toLocaleDateString(),
        //     score: test.beepTest?.value || 0,
        //     level: test.beepTest?.label || "Average",
        //     trend: "+0",
        //   }));
        //   setYoYoTestHistory(formattedTests);
        // }

        // Fetch assigned practices
        setPracticesLoading(true);
        const practicesRes = await axios.get(
          `http://localhost:3000/api/practice/get?athleteId=${athleteId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setAssignedPractices(practicesRes.data.data || []);
        setPracticesLoading(false);

        // Fetch Running Test
        try {
          const runningRes = await axios.get(
            `http://localhost:3000/api/running/running-test/score/${athleteId}`,
            {
              headers: {
                Authorization: token,
              },
            },
          );
          console.log(runningRes);
          setRunningTest(runningRes.data);
        } catch (error) {
          console.log("No running test found");
        }

        // Fetch Javeline Test
        try {
          const javelineRes = await axios.get(
            `http://localhost:3000/api/javelin/get/${athleteId}`,
            {
              headers: {
                Authorization: token,
              },
            },
          );
          setJavelineTest(javelineRes.data);
        } catch (error) {
          console.log("No javeline test found");
        }

        // Fetch Relay Test
        try {
          const relayRes = await axios.get(
            `http://localhost:3000/api/relay/get/${athleteId}`,
            {
              headers: {
                Authorization: token,
              },
            },
          );
          setRelayTest(relayRes.data);
        } catch (error) {
          console.log("No relay test found");
        }

        // Fetch Long Jump Test
        try {
          const longJumpRes = await axios.get(
            `http://localhost:3000/api/long-jump/get/${athleteId}`,
            {
              headers: {
                Authorization: token,
              },
            },
          );
          setLongJumpTest(longJumpRes.data);
        } catch (error) {
          console.log("No long jump test found");
        }

        // Fetch Running Weakness
        try {
          const runningWeaknessRes = await axios.get(
            `http://localhost:3000/api/running/weakness/${athleteId}`,
            {
              headers: {
                Authorization: token,
              },
            },
          );
          setRunningWeakness(runningWeaknessRes.data?.weaknesses || []);
        } catch (error) {
          console.log("No running weakness data found");
        }

        // Fetch Javeline Weakness
        try {
          const javelineWeaknessRes = await axios.get(
            `http://localhost:3000/api/javelin/weakness/${athleteId}`,
            {
              headers: {
                Authorization: token,
              },
            },
          );
          setJavelineWeakness(javelineWeaknessRes.data?.weaknesses || []);
        } catch (error) {
          console.log("No javeline weakness data found");
        }

        // Fetch Relay Weakness
        try {
          const relayWeaknessRes = await axios.get(
            `http://localhost:3000/api/relay/weakness/${athleteId}`,
            {
              headers: {
                Authorization: token,
              },
            },
          );
          setRelayWeakness(relayWeaknessRes.data?.weaknesses || []);
        } catch (error) {
          console.log("No relay weakness data found");
        }

        // Fetch Long Jump Weakness
        try {
          const longJumpWeaknessRes = await axios.get(
            `http://localhost:3000/api/long-jump/weakness/${athleteId}`,
            {
              headers: {
                Authorization: token,
              },
            },
          );
          setLongJumpWeakness(longJumpWeaknessRes.data?.weaknesses || []);
        } catch (error) {
          console.log("No long jump weakness data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch athlete data");
      } finally {
        setTestsLoading(false);
      }
    };

    fetchAthleteData();

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
    setFormData({
      name: athlete.name,
      email: athlete.email || "",
      sport: athlete.sport,
      specialization: athlete.specialization,
      age: athlete.age?.toString() || "",
      height: athlete.height || "",
      weight: athlete.weight || "",
      bio: athlete.bio || "",
    });
    setIsEditing(true);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      email: "",
      sport: "",
      specialization: "",
      age: "",
      height: "",
      weight: "",
      bio: "",
    });
  };

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
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back,
            </h1>
            <p className="text-gray-600 mt-2">
              Track your performance and stay connected
            </p>
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
                          <h3 className="font-bold text-gray-900">
                            Coach Invitations
                          </h3>
                          <p className="text-xs text-gray-600">
                            {coachInvitations.length} pending
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
                  <div className="p-4 overflow-y-auto max-h-[400px]">
                    {coachInvitations.length > 0 ? (
                      coachInvitations.map((invitation) => (
                        <div
                          key={invitation.id}
                          className="mb-4 last:mb-0 border-b border-gray-100 pb-4 last:border-0"
                        >
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
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleAcceptInvitation(invitation.id)
                              }
                              className="flex-1 flex items-center justify-center gap-1 bg-emerald-500 text-white py-2 rounded-lg text-sm"
                            >
                              <Check className="w-3 h-3" /> Accept
                            </button>
                            <button
                              onClick={() =>
                                handleDeclineInvitation(invitation.id)
                              }
                              className="flex-1 flex items-center justify-center gap-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm"
                            >
                              <X className="w-3 h-3" /> Decline
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">
                        No pending invitations
                      </p>
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
              <h2 className="text-2xl font-black text-gray-900 mb-1">
                {athlete.name}
              </h2>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">
                {athlete.sport} • {athlete.specialization}
              </p>
              <div
                className={`py-2 px-4 rounded-xl inline-block text-xs font-black uppercase tracking-widest border-2 ${athlete.readiness > 80 ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-red-50 border-red-100 text-red-600"}`}
              >
                {athlete.readiness > 80 ? "Ready to Train" : "Recovery Needed"}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8 text-left">
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
            </div>
          </aside>

          {/* Edit Profile Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-sans">
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between rounded-t-3xl">
                  <h2 className="text-2xl font-black text-white">
                    Edit Profile
                  </h2>
                  <button
                    onClick={handleCancelEdit}
                    className="text-white hover:bg-blue-800 p-2 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleProfileSave} className="p-6 space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Sport */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Sport
                    </label>
                    <input
                      type="text"
                      name="sport"
                      value={formData.sport}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="e.g., Track & Field"
                    />
                  </div>

                  {/* Specialization */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="e.g., 100m Sprint"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="Enter your age"
                    />
                  </div>

                  {/* Height */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Height
                    </label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="e.g., 182 cm"
                    />
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Weight
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium"
                      placeholder="e.g., 75 kg"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleProfileChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none font-medium resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      {profileLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Performance Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" /> Recent
                  Performance
                </h3>
                <div className="space-y-3">
                  {recentPerformance.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="text-sm text-gray-700">
                          {item.metric}
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {item.value}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${item.trend === "up" ? "text-emerald-600" : "text-red-600"}`}
                        >
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
                  <Target className="w-5 h-5 text-amber-600" /> Technical
                  History
                </h3>
                <div className="grid gap-3">
                  {technicalTestHistory.map((test, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-sm text-gray-900">
                          {test.test}
                        </div>
                        <div className="text-xs text-gray-600">{test.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {test.score}
                        </div>
                        <div
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${getStatusColor(test.status)}`}
                        >
                          {test.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Assigned Practices / Drills */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Assigned Drills
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tasks from your coaches
                  </p>
                </div>
              </div>
              {practicesLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600 font-medium mt-4">
                    Loading drills...
                  </p>
                </div>
              ) : assignedPractices && assignedPractices.length > 0 ? (
                <div className="space-y-3">
                  {assignedPractices.map((practice) => (
                    <div
                      key={practice._id}
                      className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:shadow-md transition-shadow border border-blue-100"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900">
                          {practice.activityName}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Coach:{" "}
                          <span className="font-semibold text-blue-600">
                            {practice.coachId?.name || "Your Coach"}
                          </span>
                        </p>
                        {practice.duration && (
                          <p className="text-xs text-gray-500 mt-1">
                            Duration: {practice.duration}
                          </p>
                        )}
                        {practice.note && (
                          <p className="text-xs text-gray-600 mt-2 italic">
                            "{practice.note}"
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold text-gray-400">
                          {new Date(practice.createdAt).toLocaleDateString()}
                        </p>
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">
                    No drills assigned yet
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Accept a coach invitation to receive drills
                  </p>
                </div>
              )}
            </div>

            {/* Tests Results Section */}
            {testsLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 font-medium mt-4">
                  Loading test results...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Running Test */}
                {runningTest && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Running Test
                        </h3>
                        <p className="text-sm text-gray-600">
                          Form & technique analysis
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Score</span>
                        <span className="text-2xl font-bold text-purple-600">
                          {runningTest.score || 0}/100
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Grade</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(runningTest.grade)}`}
                        >
                          {runningTest.grade}
                        </span>
                      </div>
                      {runningWeakness.length > 0 && (
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="text-xs font-bold text-orange-800 mb-2">Areas to Improve:</p>
                          <ul className="text-xs text-orange-700 space-y-1">
                            {runningWeakness.map((weakness, idx) => (
                              <li key={idx}>• {weakness}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Test Date:{" "}
                        {new Date(runningTest.testDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Javeline Test */}
                {javelineTest && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                        <Target className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Javeline Test
                        </h3>
                        <p className="text-sm text-gray-600">
                          Throwing technique
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Score</span>
                        <span className="text-2xl font-bold text-orange-600">
                          {javelineTest.totalScore || 0}/100
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Grade</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(javelineTest.grade)}`}
                        >
                          {javelineTest.grade}
                        </span>
                      </div>
                      {javelineTest.riskLevel && (
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="text-gray-700 font-medium">
                            Risk Level
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${javelineTest.riskLevel === "High" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"}`}
                          >
                            {javelineTest.riskLevel}
                          </span>
                        </div>
                      )}
                      {javelineWeakness.length > 0 && (
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="text-xs font-bold text-orange-800 mb-2">Areas to Improve:</p>
                          <ul className="text-xs text-orange-700 space-y-1">
                            {javelineWeakness.map((weakness, idx) => (
                              <li key={idx}>• {weakness}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Test Date:{" "}
                        {new Date(javelineTest.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Relay Test */}
                {relayTest && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Relay Test
                        </h3>
                        <p className="text-sm text-gray-600">
                          Team synchronization
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Score</span>
                        <span className="text-2xl font-bold text-green-600">
                          {relayTest.totalScore || 0}/100
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Grade</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(relayTest.grade)}`}
                        >
                          {relayTest.grade}
                        </span>
                      </div>
                      {relayTest.riskLevel && (
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="text-gray-700 font-medium">
                            Risk Level
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${relayTest.riskLevel === "High" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"}`}
                          >
                            {relayTest.riskLevel}
                          </span>
                        </div>
                      )}
                      {relayWeakness.length > 0 && (
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-xs font-bold text-green-800 mb-2">Areas to Improve:</p>
                          <ul className="text-xs text-green-700 space-y-1">
                            {relayWeakness.map((weakness, idx) => (
                              <li key={idx}>• {weakness}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Test Date:{" "}
                        {new Date(relayTest.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Long Jump Test */}
                {longJumpTest && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Long Jump Test
                        </h3>
                        <p className="text-sm text-gray-600">
                          Jump technique analysis
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Score</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {longJumpTest.totalScore || 0}/100
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">Grade</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(longJumpTest.grade)}`}
                        >
                          {longJumpTest.grade}
                        </span>
                      </div>
                      {longJumpTest.riskLevel && (
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="text-gray-700 font-medium">
                            Risk Level
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${longJumpTest.riskLevel === "High" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"}`}
                          >
                            {longJumpTest.riskLevel}
                          </span>
                        </div>
                      )}
                      {longJumpWeakness.length > 0 && (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-xs font-bold text-blue-800 mb-2">Areas to Improve:</p>
                          <ul className="text-xs text-blue-700 space-y-1">
                            {longJumpWeakness.map((weakness, idx) => (
                              <li key={idx}>• {weakness}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Test Date:{" "}
                        {new Date(longJumpTest.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Yo-Yo Test History Table */}
            {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AthleteDashboard;
