import React, { useState, useEffect } from 'react';
import { 
  Trophy, Users, Target, Shield, Zap, 
  ChevronRight, Activity, CheckCircle, 
  LineChart, Heart, TargetIcon, Mail, User, Info, RefreshCcw, Save
} from 'lucide-react';

const YoloTestForm = () => {
  // --- LOGIC PRESERVED FROM YOUR CODE ---
  const [athleteData, setAthleteData] = useState({
    name: '', age: '', gender: '', height: '', weight: '',
    ankleDorsiflexion: '', singleLegBalance: '', verticalJump: '',
    broadJump: '', sprint20m: '', agilityTTest: '',
    beepTest: '', wallSit: '', cooperTest: ''
  });

  const [standards, setStandards] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yoloScore, setYoloScore] = useState(0);
  const [athleteStatus, setAthleteStatus] = useState({ text: 'Not Assessed', color: 'gray' });
  const [totalTestsMeasured, setTotalTestsMeasured] = useState(0);

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

  useEffect(() => { fetchStandards(); }, []);
  useEffect(() => { if (standards) calculateAllResults(); }, [athleteData, standards]);

  const fetchStandards = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setStandards(mockStandards);
      setError(null);
    } catch (err) {
      setError('Failed to load test standards.');
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
    if (!standards || value === '' || isNaN(parseFloat(value))) return { classification: 'Not measured', color: 'gray', points: 0 };
    const testStandards = standards[testName];
    const numValue = parseFloat(value);
    
    switch (testName) {
      case 'bmi': return classifyRange(numValue, testStandards, 'good');
      case 'ankleDorsiflexion': return classifyWithThreshold(numValue, testStandards, 'good', 'average');
      case 'singleLegBalance':
      case 'verticalJump':
      case 'broadJump':
      case 'cooperTest':
      case 'wallSit': return classifyHigherIsBetter(numValue, testStandards);
      case 'sprint20m': return classifyLowerIsBetter(numValue, testStandards, 'fast', 'average');
      case 'agilityTTest':
      case 'beepTest': return classifyLowerIsBetter(numValue, testStandards, 'excellent', 'good');
      default: return { classification: 'Unknown', color: 'gray', points: 0 };
    }
  };

  const classifyRange = (value, standards, goodKey) => {
    const goodRange = standards[goodKey];
    if (Array.isArray(goodRange) && value >= goodRange[0] && value <= goodRange[1]) return { classification: 'Good', color: 'green', points: 10 };
    return value < goodRange[0] ? { classification: 'Underweight', color: 'yellow', points: 5 } : { classification: 'Overweight', color: 'red', points: 0 };
  };

  const classifyWithThreshold = (value, standards, excellentKey, goodKey) => {
    if (value >= standards[excellentKey]) return { classification: 'Excellent', color: 'green', points: 10 };
    if (standards[goodKey] && Array.isArray(standards[goodKey])) {
      const [min, max] = standards[goodKey];
      if (value >= min && value <= max) return { classification: 'Good', color: 'green', points: 8 };
    }
    return value > 0 ? { classification: 'Poor', color: 'red', points: 3 } : { classification: 'Not measured', color: 'gray', points: 0 };
  };

  const classifyHigherIsBetter = (value, standards) => {
    if (standards.excellent && value >= standards.excellent) return { classification: 'Excellent', color: 'green', points: 10 };
    if (standards.good && Array.isArray(standards.good)) {
      const [min, max] = standards.good;
      if (value >= min && value <= max) return { classification: 'Good', color: 'green', points: 8 };
    }
    return value > 0 ? { classification: 'Poor', color: 'red', points: 3 } : { classification: 'Not measured', color: 'gray', points: 0 };
  };

  const classifyLowerIsBetter = (value, standards, excellentKey = 'excellent', goodKey = 'good') => {
    if (standards[excellentKey] && value <= standards[excellentKey]) return { classification: 'Excellent', color: 'green', points: 10 };
    if (standards[goodKey] && Array.isArray(standards[goodKey])) {
      const [min, max] = standards[goodKey];
      if (value >= min && value <= max) return { classification: 'Good', color: 'green', points: 8 };
    }
    return value > 0 ? { classification: 'Poor', color: 'red', points: 3 } : { classification: 'Not measured', color: 'gray', points: 0 };
  };

  const calculateAllResults = () => {
    if (!standards) return;
    const newResults = {};
    let totalPoints = 0;
    let testsMeasured = 0;
    const bmi = calculateBMI();
    if (bmi) {
      const bmiResult = classifyResult('bmi', bmi);
      newResults.bmi = { ...bmiResult, value: bmi };
      totalPoints += bmiResult.points;
      testsMeasured++;
    }
    const testNames = ['ankleDorsiflexion', 'singleLegBalance', 'verticalJump', 'broadJump', 'sprint20m', 'agilityTTest', 'beepTest', 'wallSit', 'cooperTest'];
    testNames.forEach(testName => {
      if (athleteData[testName]) {
        const result = classifyResult(testName, athleteData[testName]);
        newResults[testName] = { ...result, value: athleteData[testName] };
        totalPoints += result.points;
        testsMeasured++;
      }
    });
    const score = testsMeasured > 0 ? Math.round((totalPoints / (testsMeasured * 10)) * 100) : 0;
    setYoloScore(score);
    setTotalTestsMeasured(testsMeasured);
    let status = '', sColor = '';
    if (score >= 80) { status = 'Elite Athlete 🏆'; sColor = 'emerald'; }
    else if (score >= 60) { status = 'Good Potential 👍'; sColor = 'blue'; }
    else if (score >= 40) { status = 'Average Fitness ⚖️'; sColor = 'yellow'; }
    else if (score > 0) { status = 'Needs Improvement 📈'; sColor = 'red'; }
    else { status = 'Not Assessed'; sColor = 'gray'; }
    setAthleteStatus({ text: status, color: sColor });
    setResults(newResults);
  };

  const handleInputChange = (field, value) => { setAthleteData(prev => ({ ...prev, [field]: value })); };
  
  const getUnit = (testName) => {
    const units = { height: 'cm', weight: 'kg', ankleDorsiflexion: '°', singleLegBalance: 'sec', verticalJump: 'cm', broadJump: 'm', sprint20m: 'sec', agilityTTest: 'sec', wallSit: 'sec', cooperTest: 'm' };
    return units[testName] || '';
  };

  const formatTestName = (testName) => testName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredTests = ['ankleDorsiflexion', 'singleLegBalance', 'verticalJump', 'broadJump', 'sprint20m', 'agilityTTest', 'beepTest', 'wallSit', 'cooperTest'];
    const missingTests = requiredTests.filter(test => !athleteData[test]);
    if (missingTests.length > 0) { alert(`Missing: ${missingTests.length} tests.`); return; }
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Athlete results saved successfully!');
    handleReset();
  };

  const handleReset = () => {
    setAthleteData({ name: '', age: '', gender: '', height: '', weight: '', ankleDorsiflexion: '', singleLegBalance: '', verticalJump: '', broadJump: '', sprint20m: '', agilityTTest: '', beepTest: '', wallSit: '', cooperTest: '' });
    setResults({}); setYoloScore(0); setAthleteStatus({ text: 'Not Assessed', color: 'gray' }); setTotalTestsMeasured(0);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      gray: 'bg-gray-50 text-gray-700 border-gray-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      emerald: 'bg-emerald-600 text-white shadow-lg shadow-emerald-200',
    };
    return colorMap[color] || colorMap.gray;
  };

  // --- UI START ---
  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 font-bold">Initializing YOLO Engine...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO SECTION CONSISTENT WITH HOME PAGE */}
        <header className="mb-12 text-center md:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest mb-4">
            Professional Assessment
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            YOLO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Athlete Test.</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl font-medium leading-relaxed">
            Standardized athletic evaluation powered by SPTech01 insights. 
            Measure agility, power, and endurance in one unified dashboard.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: THE FORM (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION: ATHLETE INFO */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 md:p-10 border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center">
                    <User className="text-blue-600" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Athlete Profile</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" value={athleteData.name} onChange={(e) => handleInputChange('name', e.target.value)} required
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-wider">Age</label>
                      <input 
                        type="number" value={athleteData.age} onChange={(e) => handleInputChange('age', e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-wider">Gender</label>
                      <select 
                        value={athleteData.gender} onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: FITNESS TESTS (THE GRID) */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 md:p-10 border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center">
                    <Zap className="text-emerald-600" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Physical Metrics</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {['ankleDorsiflexion', 'singleLegBalance', 'verticalJump', 'broadJump', 'sprint20m', 'agilityTTest', 'beepTest', 'wallSit', 'cooperTest'].map((test) => (
                    <div key={test} className="space-y-3 p-5 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest">
                        {formatTestName(test)}
                      </label>
                      <div className="relative">
                        <input
                          type="number" value={athleteData[test]} onChange={(e) => handleInputChange(test, e.target.value)} required
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-800"
                        />
                        <span className="absolute right-3 top-3 text-[10px] font-black text-gray-400 uppercase">{getUnit(test)}</span>
                      </div>
                      {results[test] && (
                        <div className={`text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md border w-fit ${getColorClasses(results[test].color)}`}>
                          {results[test].classification}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button type="submit" className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-3xl hover:shadow-2xl hover:shadow-blue-200 transition-all transform hover:-translate-y-1">
                  <Save size={20} /> SAVE RESULTS
                </button>
                <button type="button" onClick={handleReset} className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-white border-2 border-gray-200 text-gray-500 font-black rounded-3xl hover:bg-gray-50 transition-all">
                  <RefreshCcw size={20} /> RESET FORM
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: LIVE RESULTS (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-12 space-y-8">
              
              {/* SCORE CARD */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-400/30 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-blue-200">Assessment Score</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-8xl font-black">{yoloScore}</span>
                    <span className="text-2xl font-bold text-blue-300">/100</span>
                  </div>
                  <div className={`mt-8 px-6 py-3 rounded-2xl inline-block font-black text-sm uppercase tracking-wider ${getColorClasses(athleteStatus.color)}`}>
                    {athleteStatus.text}
                  </div>
                  <p className="mt-6 text-sm text-blue-100 font-medium leading-relaxed">
                    Based on {totalTestsMeasured} tracked metrics.
                  </p>
                </div>
              </div>

              {/* SUMMARY TABLE */}
              <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <LineChart size={20} className="text-blue-600" /> Summary
                </h3>
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(results).map(([test, result]) => (
                    <div key={test} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{formatTestName(test)}</p>
                        <p className="font-bold text-gray-800">{result.value} <span className="text-xs text-gray-500 font-normal">{getUnit(test)}</span></p>
                      </div>
                      <div className={`text-[9px] font-black px-2 py-1 rounded-md uppercase border ${getColorClasses(result.color)}`}>
                        {result.classification}
                      </div>
                    </div>
                  ))}
                  {Object.keys(results).length === 0 && (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target size={24} className="text-gray-300" />
                      </div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Awaiting test data</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FOOTER CONSISTENT WITH HOME PAGE */}
        <footer className="mt-20 py-10 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs">AFC</div>
            <p className="text-sm font-bold text-gray-400 italic">Data-Driven Performance Ecosystem</p>
          </div>
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">
            © {new Date().getFullYear()} ArenaFitCheck. Manual Coder Edition.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default YoloTestForm;