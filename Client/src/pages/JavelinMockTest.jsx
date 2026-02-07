import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Target, 
  Activity,
  Award, 
  BarChart,
  Zap,
  Navigation,
  Layers,
  TargetIcon,
  Wind,
  Crosshair,
  TrendingUp,
  Maximize2,
  RotateCw
} from 'lucide-react';

const JavelinMockTest = () => {
  const [techniqueChecks, setTechniqueChecks] = useState({
    grip: '',
    approachRun: '',
    crossover: '',
    delivery: '',
    release: ''
  });

  const handleTechniqueChange = (check, value) => {
    setTechniqueChecks(prev => ({
      ...prev,
      [check]: value
    }));
  };

  const calculateTechniqueScore = () => {
    const correctCount = Object.values(techniqueChecks).filter(val => val === 'correct').length;
    const totalAnswered = Object.values(techniqueChecks).filter(val => val !== '').length;
    return totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  };

  const javelinChecksList = [
    { 
      id: 'grip', 
      correct: 'Proper Finnish grip', 
      incorrect: 'Incorrect grip', 
      label: 'Grip Technique',
      icon: <Maximize2 className="w-5 h-5 text-blue-600" />,
      details: 'Correct finger placement on cord grip'
    },
    { 
      id: 'approachRun', 
      correct: 'Controlled acceleration', 
      incorrect: 'Rushed/uneven run', 
      label: 'Approach Run',
      icon: <Zap className="w-5 h-5 text-green-600" />,
      details: 'Gradual acceleration, controlled steps'
    },
    { 
      id: 'crossover', 
      correct: 'Smooth crossover steps', 
      incorrect: 'Staggered/awkward steps', 
      label: 'Crossover Steps',
      icon: <RotateCw className="w-5 h-5 text-amber-600" />,
      details: 'Fluid transition steps before delivery'
    },
    { 
      id: 'delivery', 
      correct: 'Powerful block & throw', 
      incorrect: 'Weak/improper block', 
      label: 'Delivery Phase',
      icon: <TargetIcon className="w-5 h-5 text-purple-600" />,
      details: 'Strong front leg block, shoulder rotation'
    },
    { 
      id: 'release', 
      correct: 'High release point', 
      incorrect: 'Low/dropped release', 
      label: 'Release',
      icon: <Wind className="w-5 h-5 text-pink-600" />,
      details: 'Optimal release angle and timing'
    }
  ];

  const techniqueScore = calculateTechniqueScore();
  const completedCount = Object.values(techniqueChecks).filter(v => v !== '').length;
  const correctCount = Object.values(techniqueChecks).filter(v => v === 'correct').length;

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

  const getStatusColor = (status) => {
    if (status === 'correct') return 'bg-emerald-100 text-emerald-800';
    if (status === 'incorrect') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status) => {
    if (status === 'correct') return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    if (status === 'incorrect') return <XCircle className="w-4 h-4 text-red-600" />;
    return null;
  };

  // Function to render the progress ring
  const ProgressRing = ({ progress, size = 48 }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-lg font-bold text-gray-900">{completedCount}/5</div>
          <div className="text-xs text-gray-600">Parameters</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <Crosshair className="w-6 h-6 text-white" />
                </div>
                Javelin Throw Technique Analysis
              </h1>
              <p className="text-gray-600 mt-2">Professional assessment tool for javelin throw technique evaluation</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Technique Checklist */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="w-8 h-8 text-white" />
                    <div>
                      <h2 className="text-xl font-bold text-white">Javelin Throw Technique Assessment</h2>
                      <p className="text-indigo-100">Select correct/incorrect for each phase of the throw</p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-white text-sm bg-indigo-500/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                      {completedCount} of 5 completed
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-5">
                  {javelinChecksList.map((check) => (
                    <div key={check.id} className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:bg-white transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                            {check.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{check.label}</h3>
                            <p className="text-gray-600 mt-1">{check.details}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(techniqueChecks[check.id])}`}>
                          {techniqueChecks[check.id] ? (
                            <div className="flex items-center gap-1">
                              {getStatusIcon(techniqueChecks[check.id])}
                              {techniqueChecks[check.id] === 'correct' ? 'Correct' : 'Needs Work'}
                            </div>
                          ) : 'Not Assessed'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                          onClick={() => handleTechniqueChange(check.id, 'correct')}
                          className={`py-4 px-6 rounded-xl text-left transition-all border ${
                            techniqueChecks[check.id] === 'correct'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              techniqueChecks[check.id] === 'correct' ? 'bg-emerald-100' : 'bg-gray-100'
                            }`}>
                              <CheckCircle className={`w-4 h-4 ${
                                techniqueChecks[check.id] === 'correct' ? 'text-emerald-600' : 'text-gray-400'
                              }`} />
                            </div>
                            <div>
                              <div className="font-medium">{check.correct}</div>
                              <div className="text-sm text-gray-500 mt-1">Optimal technique</div>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => handleTechniqueChange(check.id, 'incorrect')}
                          className={`py-4 px-6 rounded-xl text-left transition-all border ${
                            techniqueChecks[check.id] === 'incorrect'
                              ? 'bg-red-50 border-red-300 text-red-800 shadow-sm'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              techniqueChecks[check.id] === 'incorrect' ? 'bg-red-100' : 'bg-gray-100'
                            }`}>
                              <XCircle className={`w-4 h-4 ${
                                techniqueChecks[check.id] === 'incorrect' ? 'text-red-600' : 'text-gray-400'
                              }`} />
                            </div>
                            <div>
                              <div className="font-medium">{check.incorrect}</div>
                              <div className="text-sm text-gray-500 mt-1">Requires correction</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setTechniqueChecks({
                        grip: '', 
                        approachRun: '', 
                        crossover: '', 
                        delivery: '', 
                        release: ''
                      });
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset All Assessments
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results & Analysis */}
          <div className="space-y-6">
            {/* Score Card */}
            <div className={`rounded-2xl border ${getScoreBg(techniqueScore)} p-6 shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Throw Technique Score</h3>
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              
              <div className="text-center mb-6">
                <div className={`text-6xl font-bold ${getScoreColor(techniqueScore)} mb-2`}>
                  {techniqueScore}
                </div>
                <div className="text-gray-600 text-sm">OUT OF 100</div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Correct Techniques</span>
                  <span className="font-bold text-emerald-600">{correctCount}/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Needs Correction</span>
                  <span className="font-bold text-red-600">{completedCount - correctCount}/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Assessment Progress</span>
                  <span className="font-bold text-blue-600">{Math.round((completedCount / 5) * 100)}%</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-900">Overall Rating</span>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    techniqueScore >= 80 ? 'bg-emerald-100 text-emerald-800' :
                    techniqueScore >= 60 ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {techniqueScore >= 80 ? 'Excellent' :
                     techniqueScore >= 60 ? 'Good' :
                     'Needs Improvement'}
                  </span>
                </div>
              </div>
            </div>

            {/* Grip Alert */}
            {techniqueChecks.grip === 'incorrect' && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-800 mb-2">⚠️ Grip Technique Issue</h3>
                    <p className="text-red-700 text-sm">Incorrect javelin grip detected - affects control and release.</p>
                    <div className="mt-3 text-red-600 text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <span>Practice Finnish grip placement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <span>Check finger positioning on cord</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <span>Ensure comfortable hand placement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Release Alert */}
            {techniqueChecks.release === 'incorrect' && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-800 mb-2">⚠️ Release Technique Issue</h3>
                    <p className="text-orange-700 text-sm">Poor release detected - affects distance and trajectory.</p>
                    <div className="mt-3 text-orange-600 text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        <span>Focus on high release point</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        <span>Maintain 32-36° release angle</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        <span>Practice smooth wrist action</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Crossover Alert */}
            {techniqueChecks.crossover === 'incorrect' && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-2">⚠️ Crossover Issue</h3>
                    <p className="text-blue-700 text-sm">Awkward crossover steps - affects momentum transfer.</p>
                    <div className="mt-3 text-blue-600 text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Practice smooth crossover rhythm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Maintain proper body alignment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Focus on fluid transition steps</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Ring */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart className="w-5 h-5 text-blue-600" />
                Assessment Progress
              </h3>
              <div className="flex flex-col items-center justify-center">
                <ProgressRing progress={(completedCount / 5) * 100} size={120} />
                <div className="text-blue-600 text-sm font-medium mt-4">
                  {Math.round((completedCount / 5) * 100)}% Complete
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">Throw Analysis Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <div className="text-sm text-emerald-700 mb-1">Correct Techniques</div>
                  <div className="text-2xl font-bold text-emerald-800">{correctCount}</div>
                </div>
                <div className="p-4 bg-red-50 rounded-xl">
                  <div className="text-sm text-red-700 mb-1">Needs Correction</div>
                  <div className="text-2xl font-bold text-red-800">{completedCount - correctCount}</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-sm text-blue-700 mb-1">Completion</div>
                  <div className="text-2xl font-bold text-blue-800">{Math.round((completedCount / 5) * 100)}%</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl">
                  <div className="text-sm text-amber-700 mb-1">Performance Grade</div>
                  <div className="text-2xl font-bold text-amber-800">
                    {techniqueScore >= 80 ? 'A' :
                     techniqueScore >= 60 ? 'B' :
                     techniqueScore >= 40 ? 'C' : 'D'}
                  </div>
                </div>
              </div>
            </div>

            {/* Javelin Throw Phases Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">Javelin Throw Phases</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-700">1. Grip & Carry</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-700">2. Approach Run</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-gray-700">3. Crossover Steps</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-gray-700">4. Delivery & Release</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavelinMockTest;