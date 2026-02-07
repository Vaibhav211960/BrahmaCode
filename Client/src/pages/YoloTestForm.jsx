import React, { useState, useEffect } from 'react';

const YoloTestForm = () => {
  // State for athlete data
  const [athleteData, setAthleteData] = useState({
    // Basic info
    name: '',
    age: '',
    gender: '',
    
    // Measurements for BMI
    height: '',
    weight: '',
    
    // Test results
    ankleDorsiflexion: '',
    singleLegBalance: '',
    verticalJump: '',
    broadJump: '',
    sprint20m: '',
    agilityTTest: '',
    beepTest: '',
    wallSit: '',
    cooperTest: ''
  });

  // State for standards and results
  const [standards, setStandards] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yoloScore, setYoloScore] = useState(0);
  const [athleteStatus, setAthleteStatus] = useState('');
  const [totalTestsMeasured, setTotalTestsMeasured] = useState(0);

  // Mock standards (in production, this comes from API)
  const mockStandards = {
    bmi: { good: [18.5, 24.9] },
    ankleDorsiflexion: { good: 10, average: [6, 9] },
    singleLegBalance: { excellent: 30, good: [20, 29] },
    verticalJump: { excellent: 50, good: [40, 49] },
    broadJump: { excellent: 2.4, good: [2.0, 2.39] },
    sprint20m: { fast: 3.2, average: [3.3, 3.6] },
    agilityTTest: { excellent: 10.5, good: [10.6, 11.5] },
    beepTest: { excellent: 10, good: [8, 9.9] },
    wallSit: { excellent: 120, good: [90, 119] },
    cooperTest: { excellent: 2800, good: [2400, 2799] }
  };

  // Fetch standards on component mount
  useEffect(() => {
    fetchStandards();
  }, []);

  // Calculate BMI and score when data changes
  useEffect(() => {
    if (standards) {
      calculateAllResults();
    }
  }, [athleteData, standards]);

  const fetchStandards = async () => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In production, replace with actual API endpoint
      // const response = await fetch('/api/yolo-standards');
      // if (!response.ok) throw new Error('Failed to fetch standards');
      // const data = await response.json();
      
      setStandards(mockStandards);
      setError(null);
    } catch (err) {
      setError('Failed to load test standards. Please refresh.');
      console.error('Error fetching standards:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateBMI = () => {
    if (!athleteData.height || !athleteData.weight) return null;
    
    const heightInMeters = parseFloat(athleteData.height) / 100;
    const weight = parseFloat(athleteData.weight);
    
    if (heightInMeters <= 0 || weight <= 0) return null;
    
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const classifyResult = (testName, value) => {
    if (!standards || value === '' || isNaN(parseFloat(value))) {
      return { classification: 'Not measured', color: 'gray', points: 0 };
    }

    const testStandards = standards[testName];
    const numValue = parseFloat(value);
    
    // Special handling for ranges that need different comparison logic
    switch (testName) {
      case 'bmi':
        return classifyRange(numValue, testStandards, 'good');
      
      case 'ankleDorsiflexion':
        return classifyWithThreshold(numValue, testStandards, 'good', 'average');
      
      case 'singleLegBalance':
      case 'verticalJump':
      case 'broadJump':
      case 'cooperTest':
      case 'wallSit':
        return classifyHigherIsBetter(numValue, testStandards);
      
      case 'sprint20m':
        return classifyLowerIsBetter(numValue, testStandards, 'fast', 'average');
      
      case 'agilityTTest':
      case 'beepTest':
        return classifyLowerIsBetter(numValue, testStandards, 'excellent', 'good');
      
      default:
        return { classification: 'Unknown', color: 'gray', points: 0 };
    }
  };

  const classifyRange = (value, standards, goodKey) => {
    const goodRange = standards[goodKey];
    if (Array.isArray(goodRange) && value >= goodRange[0] && value <= goodRange[1]) {
      return { classification: 'Good', color: 'green', points: 10 };
    } else if (value < goodRange[0]) {
      return { classification: 'Underweight', color: 'yellow', points: 5 };
    } else {
      return { classification: 'Overweight', color: 'red', points: 0 };
    }
  };

  const classifyWithThreshold = (value, standards, excellentKey, goodKey) => {
    if (value >= standards[excellentKey]) {
      return { classification: 'Excellent', color: 'green', points: 10 };
    }
    
    if (standards[goodKey] && Array.isArray(standards[goodKey])) {
      const [min, max] = standards[goodKey];
      if (value >= min && value <= max) {
        return { classification: 'Good', color: 'green', points: 8 };
      }
    }
    
    if (value > 0) {
      return { classification: 'Poor', color: 'red', points: 3 };
    }
    
    return { classification: 'Not measured', color: 'gray', points: 0 };
  };

  const classifyHigherIsBetter = (value, standards) => {
    if (standards.excellent && value >= standards.excellent) {
      return { classification: 'Excellent', color: 'green', points: 10 };
    }
    
    if (standards.good && Array.isArray(standards.good)) {
      const [min, max] = standards.good;
      if (value >= min && value <= max) {
        return { classification: 'Good', color: 'green', points: 8 };
      }
    }
    
    if (value > 0) {
      return { classification: 'Poor', color: 'red', points: 3 };
    }
    
    return { classification: 'Not measured', color: 'gray', points: 0 };
  };

  const classifyLowerIsBetter = (value, standards, excellentKey = 'excellent', goodKey = 'good') => {
    if (standards[excellentKey] && value <= standards[excellentKey]) {
      return { classification: 'Excellent', color: 'green', points: 10 };
    }
    
    if (standards[goodKey] && Array.isArray(standards[goodKey])) {
      const [min, max] = standards[goodKey];
      if (value >= min && value <= max) {
        return { classification: 'Good', color: 'green', points: 8 };
      }
    }
    
    if (value > 0) {
      return { classification: 'Poor', color: 'red', points: 3 };
    }
    
    return { classification: 'Not measured', color: 'gray', points: 0 };
  };

  const calculateAllResults = () => {
    if (!standards) return;

    const newResults = {};
    let totalPoints = 0;
    let testsMeasured = 0;

    // Calculate BMI result
    const bmi = calculateBMI();
    if (bmi) {
      const bmiResult = classifyResult('bmi', bmi);
      newResults.bmi = { ...bmiResult, value: bmi };
      totalPoints += bmiResult.points;
      testsMeasured++;
    }

    // Calculate other test results
    const testNames = [
      'ankleDorsiflexion',
      'singleLegBalance',
      'verticalJump',
      'broadJump',
      'sprint20m',
      'agilityTTest',
      'beepTest',
      'wallSit',
      'cooperTest'
    ];

    testNames.forEach(testName => {
      if (athleteData[testName]) {
        const result = classifyResult(testName, athleteData[testName]);
        newResults[testName] = { ...result, value: athleteData[testName] };
        totalPoints += result.points;
        testsMeasured++;
      }
    });

    // Calculate final score
    const score = testsMeasured > 0 ? Math.round((totalPoints / (testsMeasured * 10)) * 100) : 0;
    setYoloScore(score);
    setTotalTestsMeasured(testsMeasured);

    // Determine athlete status
    let status = '';
    let statusColor = '';
    if (score >= 80) {
      status = 'Elite Athlete 🏆';
      statusColor = 'emerald';
    } else if (score >= 60) {
      status = 'Good Potential 👍';
      statusColor = 'blue';
    } else if (score >= 40) {
      status = 'Average Fitness ⚖️';
      statusColor = 'yellow';
    } else if (score > 0) {
      status = 'Needs Improvement 📈';
      statusColor = 'red';
    } else {
      status = 'Not Assessed';
      statusColor = 'gray';
    }
    setAthleteStatus({ text: status, color: statusColor });

    setResults(newResults);
  };

  const handleInputChange = (field, value) => {
    setAthleteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getExplanation = (testName) => {
    const explanations = {
      bmi: 'Body Mass Index - Measures body fat based on height and weight',
      ankleDorsiflexion: 'Ankle flexibility measured in degrees (higher is better)',
      singleLegBalance: 'Time in seconds standing on one leg (longer is better)',
      verticalJump: 'Jump height in centimeters (higher is better)',
      broadJump: 'Horizontal jump distance in meters (longer is better)',
      sprint20m: 'Time to sprint 20 meters in seconds (faster is better)',
      agilityTTest: 'Agility test time in seconds (faster is better)',
      beepTest: 'Max shuttle run level (higher is better)',
      wallSit: 'Time in seconds holding wall sit (longer is better)',
      cooperTest: 'Distance run in 12 minutes in meters (longer is better)'
    };
    return explanations[testName] || '';
  };

  const getUnit = (testName) => {
    const units = {
      height: 'cm',
      weight: 'kg',
      ankleDorsiflexion: '°',
      singleLegBalance: 'sec',
      verticalJump: 'cm',
      broadJump: 'm',
      sprint20m: 'sec',
      agilityTTest: 'sec',
      wallSit: 'sec',
      cooperTest: 'm'
    };
    return units[testName] || '';
  };

  const formatTestName = (testName) => {
    return testName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    const requiredTests = [
      'ankleDorsiflexion',
      'singleLegBalance',
      'verticalJump',
      'broadJump',
      'sprint20m',
      'agilityTTest',
      'beepTest',
      'wallSit',
      'cooperTest'
    ];
    
    const missingTests = requiredTests.filter(test => !athleteData[test]);
    
    if (missingTests.length > 0) {
      alert(`Please fill in all test results. Missing: ${missingTests.length} tests.`);
      return;
    }
    
    // In production, send data to backend
    try {
      console.log('Saving athlete results:', {
        athleteData,
        results,
        yoloScore,
        status: athleteStatus.text
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Athlete results saved successfully!');
      
      // Reset form
      setAthleteData({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        ankleDorsiflexion: '',
        singleLegBalance: '',
        verticalJump: '',
        broadJump: '',
        sprint20m: '',
        agilityTTest: '',
        beepTest: '',
        wallSit: '',
        cooperTest: ''
      });
      setResults({});
      setYoloScore(0);
      setAthleteStatus('');
      setTotalTestsMeasured(0);
      
    } catch (err) {
      console.error('Error saving results:', err);
      alert('Network error. Please check your connection.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data?')) {
      setAthleteData({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        ankleDorsiflexion: '',
        singleLegBalance: '',
        verticalJump: '',
        broadJump: '',
        sprint20m: '',
        agilityTTest: '',
        beepTest: '',
        wallSit: '',
        cooperTest: ''
      });
      setResults({});
      setYoloScore(0);
      setAthleteStatus('');
      setTotalTestsMeasured(0);
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      emerald: 'bg-emerald-500 text-white',
      purple: 'bg-purple-500 text-white'
    };
    return colorMap[color] || colorMap.gray;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading test standards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Standards</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchStandards}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            🏃‍♂️ YOLO Athlete Test System
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive fitness assessment for athletes
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
              Green = Good/Excellent
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Yellow = Average
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Red = Needs Improvement
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Athlete Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></div>
                  <h2 className="text-xl font-bold text-gray-800">Athlete Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={athleteData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      placeholder="Enter athlete name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={athleteData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        placeholder="Years"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={athleteData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tests Completed
                      </label>
                      <div className="flex items-center h-full">
                        <div className={`px-4 py-3 rounded-lg w-full text-center font-semibold ${getScoreColor(yoloScore)}`}>
                          {totalTestsMeasured} / 10
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BMI Calculation */}
              
              {/* Fitness Tests */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="w-1.5 h-6 bg-green-500 rounded-full mr-3"></div>
                  <h2 className="text-xl font-bold text-gray-800">Fitness Tests</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    'ankleDorsiflexion',
                    'singleLegBalance', 
                    'verticalJump',
                    'broadJump',
                    'sprint20m',
                    'agilityTTest',
                    'beepTest',
                    'wallSit',
                    'cooperTest'
                  ].map((test) => (
                    <div key={test} className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        {formatTestName(test)} *
                      </label>
                      
                      <div className="relative">
                        <input
                          type="number"
                          step={['broadJump', 'sprint20m', 'agilityTTest'].includes(test) ? "0.01" : "0.1"}
                          value={athleteData[test]}
                          onChange={(e) => handleInputChange(test, e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
                        />
                        <span className="absolute right-3 top-3 text-gray-500">
                          {getUnit(test)}
                        </span>
                      </div>
                      
                      {results[test] && (
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getColorClasses(results[test].color)}`}>
                          {results[test].classification}
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {getExplanation(test)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Save Athlete Results
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-300"
                >
                  Reset All Data
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Score Card */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">YOLO Assessment Score</h3>
                  <p className="text-blue-100 mb-6">Overall fitness evaluation</p>
                  
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative">
                      <div className={`text-6xl md:text-7xl font-bold ${getScoreColor(yoloScore)}`}>
                        {yoloScore}
                      </div>
                      <div className="text-center text-blue-100 text-lg mt-2">out of 100</div>
                    </div>
                    
                    {athleteStatus && (
                      <div className="mt-6 text-center">
                        <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold mb-3 ${getColorClasses(athleteStatus.color)}`}>
                          {athleteStatus.text}
                        </div>
                        <p className="text-blue-100 text-sm">
                          {yoloScore >= 80 
                            ? 'Excellent overall fitness. Elite athlete level. 🏆'
                            : yoloScore >= 60
                            ? 'Good fitness level with potential for improvement. 👍'
                            : yoloScore >= 40
                            ? 'Average fitness. Focus on specific areas. ⚖️'
                            : yoloScore > 0
                            ? 'Needs significant improvement in multiple areas. 📈'
                            : 'Complete tests to get your score.'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4">
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="font-semibold text-white">Tests</div>
                      <div className="text-xl font-bold text-white">{totalTestsMeasured}/10</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Good</div>
                      <div className="text-xl font-bold text-emerald-300">
                        {Object.values(results).filter(r => r.color === 'green').length}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">To Improve</div>
                      <div className="text-xl font-bold text-red-300">
                        {Object.values(results).filter(r => r.color === 'red' || r.color === 'yellow').length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Results Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Test Results Summary</h3>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {Object.entries(results).map(([test, result]) => (
                    <div 
                      key={test} 
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-200"
                    >
                      <div>
                        <span className="font-medium text-gray-700">{formatTestName(test)}</span>
                        <span className="text-sm text-gray-500 ml-2">{result.value} {getUnit(test)}</span>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getColorClasses(result.color)}`}>
                        {result.classification}
                      </span>
                    </div>
                  ))}
                  
                  {Object.keys(results).length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">📊</div>
                      <p>Complete tests to see results</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Scoring Legend</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3"></div>
                    <span className="text-gray-700">Excellent/Good</span>
                    <span className="ml-auto font-semibold text-emerald-600">8-10 pts</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
                    <span className="text-gray-700">Average</span>
                    <span className="ml-auto font-semibold text-yellow-600">5-7 pts</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                    <span className="text-gray-700">Needs Improvement</span>
                    <span className="ml-auto font-semibold text-red-600">0-4 pts</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Each test contributes up to 10 points. Total score is calculated as percentage of maximum possible points.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>YOLO Athlete Test System v1.0 • Designed for coaches and trainers</p>
          <p className="mt-1">Complete all tests for accurate assessment</p>
        </footer>
      </div>
    </div>
  );
};

export default YoloTestForm;