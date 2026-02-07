import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, AlertTriangle, RefreshCw, Target, 
  Activity, Eye, Footprints, Navigation, Smile, Award, 
  BarChart, Save, Loader2 
} from 'lucide-react';
import axios from 'axios';

const RunningMockTest = () => {
  const [techniqueChecks, setTechniqueChecks] = useState({
    headPosition: '',
    armSwing: '',
    footSound: '',
    runningLine: '',
    faceExpression: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTechniqueChange = (check, value) => {
    setTechniqueChecks(prev => ({ ...prev, [check]: value }));
  };

  const calculateTechniqueScore = () => {
    const values = Object.values(techniqueChecks);
    const correctCount = values.filter(val => val === 'correct').length;
    const totalAnswered = values.filter(val => val !== '').length;
    return totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  };

  const techniqueScore = calculateTechniqueScore();
  const completedCount = Object.values(techniqueChecks).filter(v => v !== '').length;
  const correctCount = Object.values(techniqueChecks).filter(v => v === 'correct').length;

  // --- BACKEND INTEGRATION LOGIC ---
  const handleSubmit = async () => {
    if (completedCount < 5) {
      alert("Please complete all 5 assessments before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        // checks: techniqueChecks,
        headPosition: techniqueChecks.headPosition,
        armSwing: techniqueChecks.armSwing,
        footSound: techniqueChecks.footSound,
        runningLine: techniqueChecks.runningLine,
        faceExpression: techniqueChecks.faceExpression,
        score: techniqueScore,
        date: new Date().toISOString()
      };

      // Ensure your backend has this route set up
      const res = await axios.post(
        "http://localhost:3000/api/running/create", 
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Submission success:", res.data);
      alert("Performance data saved successfully!");
      
      // Optionally reset or navigate
    } catch (error) {
      console.error("Submission failed:", error.response?.data || error.message);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- END INTEGRATION LOGIC ---

  const runningChecksList = [
    { id: 'headPosition', correct: 'Straight', incorrect: 'Tilting/shaking', label: 'Head Position', icon: <Eye className="w-5 h-5 text-blue-600" />, details: 'Neutral spine alignment, eyes forward' },
    { id: 'armSwing', correct: 'Front–back motion', incorrect: 'Crossing chest', label: 'Arm Swing', icon: <Activity className="w-5 h-5 text-indigo-600" />, details: '90° elbow bend, relaxed hands' },
    { id: 'footSound', correct: 'Soft landing', incorrect: 'Loud stamping', label: 'Foot Landing', icon: <Footprints className="w-5 h-5 text-amber-600" />, details: 'Mid-foot strike, quiet impact' },
    { id: 'runningLine', correct: 'Straight line', incorrect: 'Zig-zag pattern', label: 'Running Line', icon: <Navigation className="w-5 h-5 text-purple-600" />, details: 'Forward direction, no lateral movement' },
    { id: 'faceExpression', correct: 'Relaxed face', incorrect: 'Pain/grimace', label: 'Face Expression', icon: <Smile className="w-5 h-5 text-pink-600" />, details: 'Indicates comfort and breathing pattern' }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-emerald-50 border-emerald-100';
    if (score >= 60) return 'bg-amber-50 border-amber-100';
    return 'bg-red-50 border-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            Running Form Analysis
          </h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <h2 className="text-xl font-bold">Technique Assessment</h2>
                <p className="opacity-80">Manual observation checklist</p>
              </div>

              <div className="p-6 space-y-5">
                {runningChecksList.map((check) => (
                  <div key={check.id} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">{check.icon}</div>
                       <h3 className="font-bold text-gray-900">{check.label}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleTechniqueChange(check.id, 'correct')}
                        className={`py-3 px-4 rounded-xl border transition-all flex items-center gap-2 ${
                          techniqueChecks[check.id] === 'correct' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-white border-gray-200 text-gray-600'
                        }`}
                      >
                        <CheckCircle size={16} /> {check.correct}
                      </button>
                      <button
                        onClick={() => handleTechniqueChange(check.id, 'incorrect')}
                        className={`py-3 px-4 rounded-xl border transition-all flex items-center gap-2 ${
                          techniqueChecks[check.id] === 'incorrect' ? 'bg-red-50 border-red-300 text-red-800' : 'bg-white border-gray-200 text-gray-600'
                        }`}
                      >
                        <XCircle size={16} /> {check.incorrect}
                      </button>
                    </div>
                  </div>
                ))}

                {/* --- SUBMIT BUTTON --- */}
                <div className="pt-6 border-t border-gray-100 flex gap-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || completedCount < 5}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    {isSubmitting ? "Saving..." : "Submit Assessment"}
                  </button>
                  <button
                    onClick={() => setTechniqueChecks({ headPosition: '', armSwing: '', footSound: '', runningLine: '', faceExpression: '' })}
                    className="px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
<<<<<<< HEAD

          {/* Right Column (Sidebar Scorecard) */}
=======
          
          {/* Right Column - Results & Analysis */}
>>>>>>> b522d4f52f7b046b6c0c6dedf7c270001ad6adcf
          <div className="space-y-6">
            <div className={`rounded-[2.5rem] border ${getScoreBg(techniqueScore)} p-8 shadow-xl text-center`}>
              <Award className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Technique Score</h3>
              <div className={`text-7xl font-black ${getScoreColor(techniqueScore)} mb-4`}>
                {techniqueScore}
              </div>
              <p className="text-gray-500 font-bold uppercase text-xs tracking-tighter">
                {techniqueScore >= 80 ? "Elite Form" : techniqueScore >= 60 ? "Good Potential" : "Form Correction Required"}
              </p>
            </div>

            {/* PAIN ALERT INDICATOR */}
            {techniqueChecks.faceExpression === 'incorrect' && (
              <div className="bg-red-50 border-2 border-red-100 p-6 rounded-[2rem] animate-pulse">
                <div className="flex gap-4">
                  <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-black text-red-600 uppercase text-xs mb-1">Injury Prevention Alert</p>
                    <p className="text-sm text-red-800 font-medium">Athlete is showing signs of pain or grimacing. Recommend immediate rest and recovery check.</p>
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

export default RunningMockTest;