import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, AlertTriangle, RefreshCw, Target, 
  Activity, Award, BarChart, Zap, Clock, TrendingUp, 
  GitBranch, Repeat, Save, Loader2 
} from 'lucide-react';
import axios from 'axios';

const RelayMockTest = () => {
  // athleteId should come from your auth state/params
  const athleteId = localStorage.getItem("userId") || "69875bccbfb21ca0eab99ff8";

  const [techniqueChecks, setTechniqueChecks] = useState({
    accelerationDistance: '',
    batonExchange: '',
    armAngle: '',
    verbalCueTiming: '',
    legMuscleTightness: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTechniqueChange = (check, value) => {
    setTechniqueChecks(prev => ({ ...prev, [check]: value }));
  };

  const calculateTechniqueScore = () => {
    // Weights based on your controller: 20, 25, 15, 15, 25
    const weights = {
      accelerationDistance: 20,
      batonExchange: 25,
      armAngle: 15,
      verbalCueTiming: 15,
      legMuscleTightness: 25
    };
    
    let score = 0;
    Object.keys(techniqueChecks).forEach(key => {
      if (techniqueChecks[key] === 'Correct') {
        score += weights[key];
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        athleteId,
        accelerationDistance: techniqueChecks.accelerationDistance,
        batonExchange: techniqueChecks.batonExchange,
        armAngle: techniqueChecks.armAngle,
        verbalCueTiming: techniqueChecks.verbalCueTiming,
        legMuscleTightness: techniqueChecks.legMuscleTightness,
      };

      await axios.post("http://localhost:3000/api/relay/create", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Relay technique assessment saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving data. Please ensure all technique fields are selected.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const relayChecksList = [
    { id: 'accelerationDistance', label: 'Acceleration Zone', icon: <Zap className="text-blue-600" />, details: 'Correct 20m buildup before exchange' },
    { id: 'batonExchange', label: 'Baton Handoff', icon: <Repeat className="text-emerald-600" />, details: 'Smooth hand-to-hand transfer without fumbling' },
    { id: 'armAngle', label: 'Arm & Reach Angle', icon: <GitBranch className="text-indigo-600" />, details: 'Optimal arm extension for blind exchange' },
    { id: 'verbalCueTiming', label: 'Verbal Signal Timing', icon: <Clock className="text-purple-600" />, details: 'Signal initiated at correct distance' },
    { id: 'legMuscleTightness', label: 'Muscle Readiness', icon: <Activity className="text-pink-600" />, details: 'Assessing leg tightness to prevent hamstring strain' }
  ];

  const techniqueScore = calculateTechniqueScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-600 text-xs font-black uppercase tracking-widest mb-4">
            Team Sprint Analysis
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Relay <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">Sync-Check.</span>
          </h1>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT: Assessment Form */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-cyan-100/50 p-8 border border-gray-100">
              <div className="space-y-6">
                {relayChecksList.map((check) => (
                  <div key={check.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">{check.icon}</div>
                       <h3 className="font-bold text-gray-800">{check.label}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => handleTechniqueChange(check.id, 'Correct')}
                        className={`py-4 rounded-2xl font-bold border transition-all ${techniqueChecks[check.id] === 'Correct' ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm' : 'bg-white border-gray-200 text-gray-400'}`}
                      >Correct</button>
                      <button 
                        onClick={() => handleTechniqueChange(check.id, 'Incorrect')}
                        className={`py-4 rounded-2xl font-bold border transition-all ${techniqueChecks[check.id] === 'Incorrect' ? 'bg-red-50 border-red-300 text-red-700 shadow-sm' : 'bg-white border-gray-200 text-gray-400'}`}
                      >Incorrect</button>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || Object.values(techniqueChecks).some(v => v === '')}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-black rounded-3xl hover:shadow-2xl transition-all transform hover:-translate-y-1 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />} 
                  SAVE TEAM ASSESSMENT
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Stats & Alerts */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`rounded-[2.5rem] p-10 text-center shadow-2xl border-4 ${techniqueScore > 75 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
              <Award className="w-16 h-16 mx-auto mb-4 text-cyan-500" />
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Sync efficiency</p>
              <div className="text-8xl font-black text-gray-900 mb-4">{techniqueScore}</div>
              <p className="font-bold text-gray-600 uppercase text-sm tracking-tighter">Performance Index</p>
            </div>

            {/* MUSCLE TIGHTNESS ALERT (Specific to Controller logic) */}
            {techniqueChecks.legMuscleTightness === 'Incorrect' && (
              <div className="bg-red-600 text-white p-6 rounded-[2rem] shadow-xl animate-pulse">
                <div className="flex gap-4">
                  <AlertTriangle size={24} className="shrink-0" />
                  <div>
                    <p className="font-black uppercase text-[10px] tracking-widest mb-1">Injury Risk Alert</p>
                    <p className="text-sm font-medium">Excessive muscle tightness detected. High risk of hamstring/calf strain during acceleration. Immediate recovery session required.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelayMockTest;