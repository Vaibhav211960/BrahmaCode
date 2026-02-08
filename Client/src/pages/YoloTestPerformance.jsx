import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  AlertCircle,
  BarChart2,
  Activity,
  Heart,
  Zap,
  Shield,
  Clock,
  Flag,
  Star,
  ChevronRight,
  Download,
  RefreshCw
} from 'lucide-react';

const YoloTestPerformance = () => {
  // 10 Standard YOLO Test Tasks with backend standards
  const [standardTasks] = useState([
    {
      id: 1,
      name: 'Yo-Yo Endurance Test',
      code: 'yoyo_endurance',
      unit: 'Level',
      description: 'Incremental shuttle run test for aerobic capacity',
      backendStandard: 18.5,
      category: 'Endurance',
      iconType: 'Activity'
    },
    {
      id: 2,
      name: 'Vertical Jump',
      code: 'vertical_jump',
      unit: 'cm',
      description: 'Maximum vertical leap height',
      backendStandard: 55,
      category: 'Power',
      iconType: 'Zap'
    },
    {
      id: 3,
      name: 'Broad Jump',
      code: 'broad_jump',
      unit: 'm',
      description: 'Horizontal jump distance from standing',
      backendStandard: 2.3,
      category: 'Power',
      iconType: 'Flag'
    },
    {
      id: 4,
      name: '40m Sprint',
      code: 'sprint_40m',
      unit: 'sec',
      description: 'Timed 40-meter sprint',
      backendStandard: 5.2,
      category: 'Speed',
      iconType: 'Clock'
    },
    {
      id: 5,
      name: 'Agility T-Test',
      code: 'agility_ttest',
      unit: 'sec',
      description: 'Agility and change of direction',
      backendStandard: 10.5,
      category: 'Agility',
      iconType: 'Target'
    },
    {
      id: 6,
      name: 'Reaction Time',
      code: 'reaction_time',
      unit: 'ms',
      description: 'Visual stimulus response time',
      backendStandard: 200,
      category: 'Reaction',
      iconType: 'Shield'
    },
    {
      id: 7,
      name: 'Bench Press Max',
      code: 'bench_press',
      unit: 'kg',
      description: 'One-rep maximum bench press',
      backendStandard: 85,
      category: 'Strength',
      iconType: 'TrendingUp'
    },
    {
      id: 8,
      name: 'Sit & Reach',
      code: 'sit_reach',
      unit: 'cm',
      description: 'Lower back and hamstring flexibility',
      backendStandard: 30,
      category: 'Flexibility',
      iconType: 'Heart'
    },
    {
      id: 9,
      name: 'Plank Hold',
      code: 'plank_hold',
      unit: 'sec',
      description: 'Core endurance test',
      backendStandard: 120,
      category: 'Core',
      iconType: 'Award'
    },
    {
      id: 10,
      name: 'Hand Grip Strength',
      code: 'hand_grip',
      unit: 'kg',
      description: 'Maximum hand grip force',
      backendStandard: 45,
      category: 'Strength',
      iconType: 'Star'
    }
  ]);

  // State for athlete's performance values
  const [athletePerformance, setAthletePerformance] = useState({});
  const [overallScore, setOverallScore] = useState(0);
  const [taskScores, setTaskScores] = useState({});
  const [loading, setLoading] = useState(false);
  const [performanceSummary, setPerformanceSummary] = useState({});
  const [currentTask, setCurrentTask] = useState(1);

  // Initialize performance data
  useEffect(() => {
    const initialPerformance = {};
    standardTasks.forEach(task => {
      initialPerformance[task.code] = '';
    });
    setAthletePerformance(initialPerformance);
    calculateScores(initialPerformance);
  }, []);

  // Icon mapping
  const getIconComponent = (iconType) => {
    switch(iconType) {
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Flag': return <Flag className="w-5 h-5" />;
      case 'Clock': return <Clock className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Star': return <Star className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  // Calculate scores when performance changes
  const calculateScores = (performance) => {
    const scores = {};
    let totalScore = 0;
    let tasksCompleted = 0;
    let excellentCount = 0;
    let goodCount = 0;
    let needsWorkCount = 0;

    standardTasks.forEach(task => {
      const athleteValue = parseFloat(performance[task.code]);
      const standardValue = task.backendStandard;
      
      if (!isNaN(athleteValue)) {
        tasksCompleted++;
        
        // Calculate percentage of standard (some tests lower is better)
        let percentage = 0;
        if (['sprint_40m', 'agility_ttest', 'reaction_time'].includes(task.code)) {
          // For time-based tests, lower is better
          percentage = (standardValue / athleteValue) * 100;
        } else {
          // For other tests, higher is better
          percentage = (athleteValue / standardValue) * 100;
        }
        
        // Cap at 150% for exceptional performance
        percentage = Math.min(percentage, 150);
        
        // Score calculation (0-10 scale)
        let score = 0;
        let status = '';
        let color = '';
        
        if (percentage >= 110) {
          score = 10;
          status = 'Elite';
          color = 'emerald';
          excellentCount++;
        } else if (percentage >= 100) {
          score = 9;
          status = 'Excellent';
          color = 'emerald';
          excellentCount++;
        } else if (percentage >= 90) {
          score = 8;
          status = 'Good';
          color = 'green';
          goodCount++;
        } else if (percentage >= 80) {
          score = 7;
          status = 'Good';
          color = 'green';
          goodCount++;
        } else if (percentage >= 70) {
          score = 6;
          status = 'Average';
          color = 'amber';
          goodCount++;
        } else if (percentage >= 60) {
          score = 5;
          status = 'Average';
          color = 'amber';
          goodCount++;
        } else {
          score = 4;
          status = 'Needs Work';
          color = 'red';
          needsWorkCount++;
        }
        
        scores[task.code] = {
          score,
          percentage: Math.round(percentage),
          status,
          color,
          athleteValue,
          standardValue
        };
        
        totalScore += score;
      }
    });

    // Calculate overall score
    const overall = tasksCompleted > 0 ? Math.round((totalScore / (tasksCompleted * 10)) * 100) : 0;
    
    // Set overall performance summary
    setPerformanceSummary({
      tasksCompleted,
      excellentCount,
      goodCount,
      needsWorkCount,
      averageScore: tasksCompleted > 0 ? Math.round(totalScore / tasksCompleted * 10) / 10 : 0
    });

    setTaskScores(scores);
    setOverallScore(overall);
  };

  const handlePerformanceChange = (taskCode, value) => {
    const newPerformance = {
      ...athletePerformance,
      [taskCode]: value
    };
    
    setAthletePerformance(newPerformance);
    calculateScores(newPerformance);
  };

  const handleNextTask = () => {
    if (currentTask < 10) {
      setCurrentTask(currentTask + 1);
    }
  };

  const handlePrevTask = () => {
    if (currentTask > 1) {
      setCurrentTask(currentTask - 1);
    }
  };

  const handleResetTask = (taskCode) => {
    setAthletePerformance(prev => ({
      ...prev,
      [taskCode]: ''
    }));
  };

  const handleSaveAll = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Get athlete profile to get athleteId
      const athleteRes = await axios.get(
        'http://localhost:3000/api/athlete/profile',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const athleteId = athleteRes.data.data._id;
      const age = athleteRes.data.data.age || 19;
      const gender = athleteRes.data.data.gender || 'male';

      // Map performance data from frontend to backend field names
      const payload = {
        athleteId,
        age,
        gender,
        beepTest: athletePerformance.yoyo_endurance || 0,
        verticalJump: athletePerformance.vertical_jump || 0,
        broadJump: athletePerformance.broad_jump || 0,
        sprintTime: athletePerformance.sprint_40m || 0,
        agilityTtest: athletePerformance.agility_ttest || 0,
        reactionTime: athletePerformance.reaction_time || 0,
        benchPress: athletePerformance.bench_press || 0,
        sitAndReach: athletePerformance.sit_reach || 0,
        wallSit: athletePerformance.plank_hold || 0,
        cooperTest: athletePerformance.hand_grip || 0,
        // Default values for admin fields
        ankleDorsiflexion: 0,
        singleLegBalance: 0,
      };

      const response = await axios.post(
        'http://localhost:3000/api/yolo/create',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        toast.success('YOLO Test results saved successfully!');
        setTimeout(() => {
          navigate('/athlete-dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Error saving YOLO test:', error);
      toast.error(error.response?.data?.message || 'Failed to save YOLO test results');
    } finally {
      setLoading(false);
    }
  };

  const handleExportResults = () => {
    const data = {
      athletePerformance,
      taskScores,
      overallScore,
      performanceSummary,
      date: new Date().toLocaleDateString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yolo-test-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (color) => {
    const colorMap = {
      emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      amber: 'bg-amber-100 text-amber-800 border-amber-200',
      red: 'bg-red-100 text-red-800 border-red-200'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getOverallStatus = () => {
    if (overallScore >= 90) return { text: 'Elite Performer 🏆', color: 'emerald' };
    if (overallScore >= 80) return { text: 'Excellent Performance ⭐', color: 'green' };
    if (overallScore >= 70) return { text: 'Good Performance 👍', color: 'amber' };
    if (overallScore >= 60) return { text: 'Average Performance ⚖️', color: 'amber' };
    if (overallScore > 0) return { text: 'Needs Improvement 📈', color: 'red' };
    return { text: 'Not Assessed', color: 'gray' };
  };

  const currentTaskData = standardTasks[currentTask - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                YOLO Test Performance Assessment
              </h1>
              <p className="text-gray-600 mt-2">10 standardized fitness tests with backend standards comparison</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportResults}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Results
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Overall Score & Summary */}
          <div className="space-y-6">
            {/* Overall Score Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Overall YOLO Score</h3>
                <BarChart2 className="w-5 h-5 text-blue-600" />
              </div>
              
              <div className="text-center mb-6">
                <div className={`text-6xl font-bold ${
                  overallScore >= 90 ? 'text-emerald-600' :
                  overallScore >= 80 ? 'text-green-600' :
                  overallScore >= 70 ? 'text-amber-600' :
                  overallScore >= 60 ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {overallScore}
                </div>
                <div className="text-gray-600 text-sm">OUT OF 100</div>
                
                <div className="mt-4">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold ${getStatusColor(getOverallStatus().color)}`}>
                    {getOverallStatus().text}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Tests Completed</span>
                  <span className="font-bold text-blue-600">
                    {performanceSummary.tasksCompleted || 0}/10
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Elite Performances</span>
                  <span className="font-bold text-emerald-600">{performanceSummary.excellentCount || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Average Score per Test</span>
                  <span className="font-bold text-amber-600">{performanceSummary.averageScore || 0}/10</span>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Performance Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Elite/Excellent</span>
                  </div>
                  <div className="font-bold text-emerald-800">{performanceSummary.excellentCount || 0}</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-700">Good/Average</span>
                  </div>
                  <div className="font-bold text-green-800">{performanceSummary.goodCount || 0}</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-red-700">Needs Work</span>
                  </div>
                  <div className="font-bold text-red-800">{performanceSummary.needsWorkCount || 0}</div>
                </div>
              </div>
            </div>

            {/* Task Navigation */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Test Navigation</h3>
              <div className="grid grid-cols-2 gap-2">
                {standardTasks.map((task, index) => (
                  <button
                    key={task.id}
                    onClick={() => setCurrentTask(index + 1)}
                    className={`p-3 rounded-lg text-center transition-all ${
                      currentTask === task.id
                        ? 'bg-blue-100 border-2 border-blue-300'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-sm">{index + 1}. {task.name.split(' ')[0]}</div>
                    {taskScores[task.code] && (
                      <div className={`text-xs mt-1 px-2 py-1 rounded-full ${getStatusColor(taskScores[task.code].color)}`}>
                        {taskScores[task.code].score}/10
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Current Task Input */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    {getIconComponent(currentTaskData.iconType)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Test {currentTask}: {currentTaskData.name}</h3>
                    <p className="text-gray-600">{currentTaskData.description}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Task {currentTask}/10
                </div>
              </div>

              {/* Current Task Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Backend Standard */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-sm text-gray-500 mb-2">Backend Standard (Expected)</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {currentTaskData.backendStandard} {currentTaskData.unit}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Target value for professional athletes</div>
                  </div>

                  {/* Athlete's Performance */}
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-sm text-blue-600 mb-2">Athlete's Performance</div>
                    <div className="relative">
                      <input
                        type="number"
                        value={athletePerformance[currentTaskData.code] || ''}
                        onChange={(e) => handlePerformanceChange(currentTaskData.code, e.target.value)}
                        step={currentTaskData.unit === 'sec' ? "0.01" : "0.1"}
                        placeholder={`Enter value in ${currentTaskData.unit}`}
                        className="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="absolute right-3 top-3 text-gray-500">
                        {currentTaskData.unit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current Score Display */}
                {taskScores[currentTaskData.code] && (
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500">Current Assessment</div>
                        <div className="text-lg font-bold text-gray-900">
                          Score: {taskScores[currentTaskData.code].score}/10
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-full font-bold ${getStatusColor(taskScores[currentTaskData.code].color)}`}>
                        {taskScores[currentTaskData.code].status}
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      Athlete achieved {taskScores[currentTaskData.code].athleteValue} {currentTaskData.unit} 
                      ({taskScores[currentTaskData.code].percentage}% of standard)
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button
                      onClick={handlePrevTask}
                      disabled={currentTask === 1}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextTask}
                      disabled={currentTask === 10}
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Task
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleResetTask(currentTaskData.code)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* All Tasks Results Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-6">All Test Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Test Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Standard</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Athlete Value</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Score</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standardTasks.map((task) => (
                      <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {getIconComponent(task.iconType)}
                            <div>
                              <div className="font-medium text-gray-900">{task.name}</div>
                              <div className="text-xs text-gray-500">{task.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">
                            {task.backendStandard} {task.unit}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">
                            {athletePerformance[task.code] || '--'} {task.unit}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-gray-900">
                            {taskScores[task.code] ? `${taskScores[task.code].score}/10` : '--'}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {taskScores[task.code] ? (
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(taskScores[task.code].color)}`}>
                              {taskScores[task.code].status}
                            </div>
                          ) : (
                            <div className="text-gray-400">Not assessed</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Save All Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveAll}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving Results...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Save All Test Results
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoloTestPerformance;