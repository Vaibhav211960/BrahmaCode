import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Mail,
  Phone,
  Cake,
  Ruler,
  Weight,
  Activity,
  Trophy,
  Zap,
  Target,
  CheckCircle,
  Calendar,
  Heart,
  Dumbbell,
} from "lucide-react";

const AthleteProfileView = () => {
  const { athleteId } = useParams();
  const navigate = useNavigate();

  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assigningTest, setAssigningTest] = useState(false);


  useEffect(() => {
    fetchAthleteProfile();
  }, [athleteId]);

  const fetchAthleteProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/athlete/${athleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setAthlete(res.data.data);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load athlete profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="font-bold text-slate-500">Loading Athlete Profile...</p>
        </div>
      </div>
    );
  }

  if (error || !athlete) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="font-bold text-slate-900 mb-4">
            {error || "Profile not found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const tests = [
    {
      id: "running",
      name: "Technical Running Test",
      description: "Running Form & Speed Analysis",
      icon: <Activity size={24} />,
      to: "/RunningMockTest"
    },
    {
      id: "longjump",
      name: "Long Jump Test",
      description: "Jump Distance & Technique",
      icon: <Target size={24} />,
      to: "/LongJumpMockTest"
    },
    {
      id: "javelin",
      name: "Javelin Test",
      description: "Throwing Distance & Accuracy",
      icon: <Trophy size={24} />,
      to: "/JavelinMockTest"
    },
    {
      id: "relay",
      name: "Relay Test",
      description: "Team Sprint & Baton Exchange",
      icon: <Dumbbell size={24} />,
      to: "/RelayMockTest"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 font-bold mb-8 hover:translate-x-[-4px] transition-all"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT: PROFILE CARD */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 border border-gray-100 sticky top-10">
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <img
                    src={
                      athlete.img ||
                      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&fit=crop&q=80"
                    }
                    alt={athlete.name}
                    className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl mx-auto"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                    <Trophy size={16} />
                  </div>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">
                  {athlete.name}
                </h2>
                <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                  {athlete.sport || "Athlete"}
                </p>
              </div>

              <div className="space-y-4 border-t border-gray-50 pt-6">
                <InfoItem
                  icon={<Mail size={18} />}
                  label="Email"
                  value={athlete.email}
                />
                <InfoItem
                  icon={<Cake size={18} />}
                  label="Age"
                  value={athlete.age || "--"}
                />
                <InfoItem
                  icon={<Ruler size={18} />}
                  label="Height"
                  value={athlete.height || "--"}
                />
                <InfoItem
                  icon={<Weight size={18} />}
                  label="Weight"
                  value={athlete.weight || "--"}
                />
                <InfoItem
                  icon={<Activity size={18} />}
                  label="Status"
                  value={athlete.status || "Active"}
                />
              </div>

              <button
                onClick={() => navigate("/athlete-dashboard")}
                className="w-full mt-10 flex items-center justify-center gap-2 py-4 bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-2xl font-black text-xs uppercase transition-all duration-300 border border-gray-100"
              >
                <ArrowLeft size={18} /> View My Dashboard
              </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            {/* PERFORMANCE METRICS */}
            <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Heart className="text-red-500" size={28} /> Performance Metrics
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <MetricCard
                  label="BMI"
                  value={athlete.bmi || "22.5"}
                  unit=""
                  color="emerald"
                />
                <MetricCard
                  label="Aerobic Score"
                  value={athlete.aerobicScore || "88"}
                  unit="%"
                  color="orange"
                />
              </div>
            </section>

            {/* TECHNICAL TESTS SECTION */}
            <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  <Zap className="text-yellow-500" size={28} /> Assign Technical
                  Tests
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-300 hover:bg-blue-50/30 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-blue-600">{test.icon}</div>
                      <button
                      onClick={() => navigate(test.to, {state: {athlete}})}
                        disabled={assigningTest}
                        className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {assigningTest ? "Evaluating..." : "Evaluate"}
                      </button>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      {test.name}
                    </h4>
                    <p className="text-xs text-gray-500">{test.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* TEST HISTORY */}
            <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="text-emerald-500" size={28} /> Test
                History
              </h3>
              <div className="space-y-3">
                {athlete.testHistory && athlete.testHistory.length > 0 ? (
                  athlete.testHistory.map((test, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{test.name}</p>
                        <p className="text-xs text-gray-500">{test.date}</p>
                      </div>
                      <span className="px-4 py-2 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-xl">
                        {test.score}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-gray-500 font-medium">
                    No test history yet
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-sm font-bold text-gray-800 break-all">{value}</p>
    </div>
  </div>
);

const MetricCard = ({ label, value, unit, color }) => {
  const themes = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div
      className={`p-6 rounded-2xl border-2 border-gray-100 ${themes[color]}`}
    >
      <p className="text-3xl font-black mb-1">
        {value}
        {unit}
      </p>
      <p className="text-xs font-bold opacity-70">{label}</p>
    </div>
  );
};

export default AthleteProfileView;
