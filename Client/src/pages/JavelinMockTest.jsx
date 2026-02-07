import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, AlertTriangle, RefreshCw, Target, 
  Activity, Award, BarChart, Zap, Crosshair, 
  TargetIcon, Wind, Maximize2, RotateCw, Save, Loader2 
} from 'lucide-react';
import axios from 'axios';

const JavelinMockTest = () => {
  // athleteId should come from your auth state/params
  const athleteId = localStorage.getItem("userId") || "69875bccbfb21ca0eab99ff8";

  const [techniqueChecks, setTechniqueChecks] = useState({
    elbowAtThrow: '',
    bodyRotation: '',
    throwCount: '0',
    armAfterThrow: '',
    shoulderReaction: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTechniqueChange = (check, value) => {
    setTechniqueChecks(prev => ({ ...prev, [check]: value }));
  };

  const calculateTechniqueScore = () => {
    const metrics = ['elbowAtThrow', 'bodyRotation', 'armAfterThrow', 'shoulderReaction'];
    const correctCount = metrics.filter(key => techniqueChecks[key] === 'Correct').length;
    let score = (correctCount / 5) * 100; 
    // Simplified score logic for UI preview
    return Math.round(score);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        athleteId,
        elbowAtThrow: techniqueChecks.elbowAtThrow,
        bodyRotation: techniqueChecks.bodyRotation,
        throwCount: parseInt(techniqueChecks.throwCount),
        armAfterThrow: techniqueChecks.armAfterThrow,
        shoulderReaction: techniqueChecks.shoulderReaction,
        notes: "Submitted from JavelinMockTest component"
      };

      await axios.post("http://localhost:3000/api/javelin/create", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Javelin technique assessment saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving data. Please ensure all fields are selected.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const javelinChecksList = [
    { id: 'elbowAtThrow', label: 'Elbow Position', icon: <Maximize2 className="text-blue-600" />, details: 'High elbow position during delivery phase' },
    { id: 'bodyRotation', label: 'Body Rotation', icon: <RotateCw className="text-emerald-600" />, details: 'Smooth energy transfer through core' },
    { id: 'armAfterThrow', label: 'Arm Follow-through', icon: <Wind className="text-purple-600" />, details: 'Relaxed follow-through post-release' },
    { id: 'shoulderReaction', label: 'Shoulder Stability', icon: <TargetIcon className="text-pink-600" />, details: 'Controlled reaction to throwing force' }
  ];

  const techniqueScore = calculateTechniqueScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest mb-4">
            Throwing Events Analysis
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Javelin <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Tech-Check.</span>
          </h1>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT: Checklist */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 p-8 border border-gray-100">
              <div className="space-y-6">
                {javelinChecksList.map((check) => (
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

                {/* THROW COUNT (Controller logic specific) */}
                <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                  <h3 className="font-bold text-indigo-800 mb-2 flex items-center gap-2"><Target size={18}/> Session Throw Count</h3>
                  <input 
                    type="number" 
                    value={techniqueChecks.throwCount}
                    onChange={(e) => handleTechniqueChange('throwCount', e.target.value)}
                    className="w-full px-6 py-4 bg-white border border-indigo-200 rounded-2xl outline-none font-bold"
                    placeholder="Enter total throws"
                  />
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-3xl hover:shadow-2xl transition-all transform hover:-translate-y-1 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />} 
                  SAVE TECHNIQUE REPORT
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`rounded-[2.5rem] p-10 text-center shadow-2xl border-4 ${techniqueScore > 75 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
              <Award className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Live Tech Rating</p>
              <div className="text-8xl font-black text-gray-900 mb-4">{techniqueScore}</div>
              <p className="font-bold text-gray-600 uppercase text-sm tracking-tighter">Performance Index</p>
            </div>

            {/* OVERUSE ALERT (Based on throw count) */}
            {parseInt(techniqueChecks.throwCount) > 25 && (
              <div className="bg-red-600 text-white p-6 rounded-[2rem] shadow-xl animate-pulse">
                <div className="flex gap-4">
                  <AlertTriangle size={24} className="shrink-0" />
                  <div>
                    <p className="font-black uppercase text-[10px] tracking-widest mb-1">Overuse Risk Alert</p>
                    <p className="text-sm font-medium">Throw count exceeds safe session volume. Immediate recovery recommended to prevent shoulder strain.</p>
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

export default JavelinMockTest;