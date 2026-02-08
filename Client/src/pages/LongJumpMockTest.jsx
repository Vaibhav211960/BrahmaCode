import React, { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, AlertTriangle, RefreshCw, Target,
  Activity, Award, BarChart, Zap, Navigation, Layers,
  TargetIcon, Wind, Footprints, Save, Loader2
} from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const LongJumpMockTest = () => {
  // athleteId should ideally come from useParams or global state
  // const athleteId = localStorage.getItem("userId") || "mock_id"; 

  const [techniqueChecks, setTechniqueChecks] = useState({
    takeOffFoot: '',
    speedBeforeBoard: '',
    kneeAtLanding: '',
    balanceAfterLanding: '',
    repeatedFouls: '0' // Number based on controller logic
  });
<<<<<<< HEAD

=======
  const location = useLocation();
  const { athlete } = location.state || {};

  
>>>>>>> 3e1acaebabcfe4b3e7b35ccbee417e4ac8e23f0c
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTechniqueChange = (check, value) => {
    setTechniqueChecks(prev => ({ ...prev, [check]: value }));
  };

  const calculateTechniqueScore = () => {
    const metrics = ['takeOffFoot', 'speedBeforeBoard', 'kneeAtLanding', 'balanceAfterLanding'];
    const correctCount = metrics.filter(key => techniqueChecks[key] === 'Correct').length;
    let score = (correctCount / metrics.length) * 85; // 85% from posture
    if (parseInt(techniqueChecks.repeatedFouls) <= 1) score += 15; // 15% from fouls
    return Math.round(score);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        athleteId: athlete._id,
        takeOffFoot: techniqueChecks.takeOffFoot,
        speedBeforeBoard: techniqueChecks.speedBeforeBoard,
        kneeAtLanding: techniqueChecks.kneeAtLanding,
        balanceAfterLanding: techniqueChecks.balanceAfterLanding,
        repeatedFouls: parseInt(techniqueChecks.repeatedFouls),
        notes: {}
      };

      await axios.post("http://localhost:3000/api/long-jump/create", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Long Jump assessment saved successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to save assessment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const longJumpChecksList = [
    { id: 'takeOffFoot', label: 'Take-off Foot Alignment', icon: <TargetIcon className="text-blue-600" />, details: 'Straight foot drive vs angled takeoff' },
    { id: 'speedBeforeBoard', label: 'Speed Maintenance', icon: <Zap className="text-orange-600" />, details: 'Maintaining horizontal velocity at the board' },
    { id: 'kneeAtLanding', label: 'Knee Position at Landing', icon: <Layers className="text-green-600" />, details: 'Absorbing impact with bent knees' },
    { id: 'balanceAfterLanding', label: 'Post-Landing Balance', icon: <Navigation className="text-purple-600" />, details: 'Maintaining control without falling back' }
  ];

  const techniqueScore = calculateTechniqueScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">

        <header className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest mb-4">
            Field Event Analysis
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Long Jump <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Pro-Check.</span>
          </h1>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-orange-100/50 p-8 border border-gray-100">
              <div className="space-y-6">
                {longJumpChecksList.map((check) => (
                  <div key={check.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">{check.icon}</div>
                      <h3 className="font-bold text-gray-800">{check.label}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleTechniqueChange(check.id, 'Correct')}
                        className={`py-4 rounded-2xl font-bold border transition-all ${techniqueChecks[check.id] === 'Correct' ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-white border-gray-200 text-gray-500'}`}
                      >Correct</button>
                      <button
                        onClick={() => handleTechniqueChange(check.id, 'Incorrect')}
                        className={`py-4 rounded-2xl font-bold border transition-all ${techniqueChecks[check.id] === 'Incorrect' ? 'bg-red-50 border-red-300 text-red-700' : 'bg-white border-gray-200 text-gray-500'}`}
                      >Incorrect</button>
                    </div>
                  </div>
                ))}

                {/* FOULS INPUT (Special Field) */}
                <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                  <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2"><AlertTriangle size={18} /> Repeated Fouls</h3>
                  <input
                    type="number"
                    value={techniqueChecks.repeatedFouls}
                    onChange={(e) => handleTechniqueChange('repeatedFouls', e.target.value)}
                    className="w-full px-6 py-4 bg-white border border-orange-200 rounded-2xl outline-none font-bold"
                    placeholder="Enter number of fouls"
                  />
                </div>
                <div className='flex items-center justify-between gap-3'>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black rounded-3xl hover:shadow-2xl transition-all transform hover:-translate-y-1 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    SAVE TECHNIQUE REPORT
                  </button>
                  <button
                    onClick={() => setTechniqueChecks({
                      takeOffFoot: '',
                      speedBeforeBoard: '',
                      kneeAtLanding: '',
                      balanceAfterLanding: '',
                      repeatedFouls: '0'
                    })}
                    className="px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className={`rounded-[2.5rem] p-10 text-center shadow-2xl border-4 ${techniqueScore > 70 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
              <Award className="w-16 h-16 mx-auto mb-4 text-orange-500" />
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Live Jump Grade</p>
              <div className="text-8xl font-black text-gray-900 mb-4">{techniqueScore}</div>
              <p className="font-bold text-gray-600 uppercase text-sm tracking-tighter">Performance Score</p>
            </div>

            {parseInt(techniqueChecks.repeatedFouls) > 1 && (
              <div className="bg-red-600 text-white p-6 rounded-[2rem] shadow-xl animate-pulse">
                <p className="font-black uppercase text-[10px] tracking-widest mb-1">Board Awareness Alert</p>
                <p className="text-sm font-medium">Multiple fouls detected. Focus on approach rhythm and board visualization.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongJumpMockTest;