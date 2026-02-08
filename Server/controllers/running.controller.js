import RunningTest from "../models/running.model.js";

export const createRunningTest = async (req, res) => {
  // console.log(req.bpdy);
  
 try {
    const { athleteId, headPosition, armSwing, runningLine, footSound, faceExpression , score , date } = req.body;
   
    const newTest = await RunningTest.create({
      athleteId,
      headPosition,
      armSwing,
      runningLine,
      footSound,
      faceExpression,
      totalScore: score ,
      date: date || new Date(),
    });

    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getRunningScore = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const runningTest = await RunningTest.findOne({ athleteId }).sort({
      createdAt: -1,
    });

    if (!runningTest) {
      return res.status(404).json({ message: "No analysis found" });
    }

    let score = 0;
    const metrics = ["headPosition", "armSwing", "footSound", "runningLine", "faceExpression"];

    // Each of the 5 metrics is worth 20 points to reach 100
    metrics.forEach((key) => {
      if (runningTest[key]?.status === "Correct") {
        score += 20;
      }
    });

    res.status(200).json({
      athleteId,
      score,
      maxScore: 100,
      grade:
        score >= 80 ? "Excellent" :
        score >= 60 ? "Good" :
        score >= 40 ? "Average" : "Needs Improvement",
      breakdown: {
        headPosition: runningTest.headPosition.status,
        armSwing: runningTest.armSwing.status,
        footSound: runningTest.footSound.status,
        runningLine: runningTest.runningLine.status,
        faceExpression: runningTest.faceExpression.status,
      },
      testDate: runningTest.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRunningInjuryRisk = async (req, res) => {
  try {
    const { athleteId } = req.params;
    const runningTest = await RunningTest.findOne({ athleteId }).sort({ createdAt: -1 });

    if (!runningTest) return res.status(404).json({ message: "No data found" });

    let riskScore = 0;
    const riskFactors = [];

    const criteria = [
      { key: "headPosition", label: "Head Position", issue: "Improper alignment increases spinal stress" },
      { key: "footSound", label: "Foot Landing", issue: "Loud stamping indicates high joint impact" },
      { key: "runningLine", label: "Running Line", issue: "Lateral movement increases knee/ankle strain" },
      { key: "faceExpression", label: "Face Expression", issue: "Grimacing indicates acute pain or overexertion" },
    ];

    criteria.forEach(({ key, label, issue }) => {
      if (runningTest[key]?.status === "Incorrect") {
        // Face expression is a high-priority risk factor
        const weight = key === "faceExpression" ? 2 : 1;
        riskScore += weight;
        riskFactors.push({ metric: key, label, issue });
      }
    });

    let riskLevel = "Low";
    let recommendation = "Form is stable. Continue regular training.";

    if (riskScore >= 3 || runningTest.faceExpression.status === "Incorrect") {
      riskLevel = "High";
      recommendation = "Immediate rest and technique correction required. Pain detected.";
    } else if (riskScore >= 1) {
      riskLevel = "Medium";
      recommendation = "Focus on corrective drills for listed biomechanical issues.";
    }

    res.status(200).json({
      athleteId,
      riskLevel,
      riskScore,
      riskFactors,
      recommendation,
      testDate: runningTest.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRunningWeakness = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const runningTest = await RunningTest.findOne({ athleteId })
      .sort({ createdAt: -1 });

    if (!runningTest) {
      return res.status(404).json({
        message: "No running test found for this athlete",
      });
    }

    const weaknesses = [];

    const qualitativeMetrics = [
      {
        key: "headPosition",
        label: "Head Position",
        suggestion: "Keep head straight and eyes forward while running",
      },
      {
        key: "armSwing",
        label: "Arm Swing",
        suggestion: "Practice front-back arm swing drills",
      },
      {
        key: "runningLine",
        label: "Running Line",
        suggestion: "Focus on running in a straight line",
      },
      {
        key: "handPosition",
        label: "Hand Position",
        suggestion: "Keep hands aligned with head while sprinting",
      },
    ];

    qualitativeMetrics.forEach(({ key, label, suggestion }) => {
      if (runningTest[key]?.status === "Incorrect") {
        weaknesses.push({
          metric: key,
          label,
          value: runningTest[key].value,
          issue: "Incorrect technique",
          suggestion,
        });
      }
    });

    const reactionTime = runningTest.reactionTime?.value;

    if (reactionTime > 0.35) {
      weaknesses.push({
        metric: "reactionTime",
        label: "Reaction Time",
        value: reactionTime,
        issue: "Slow reaction time",
        suggestion:
          "Improve reaction time using plyometric and start-response drills",
      });
    }

    res.status(200).json({
      athleteId,
      totalWeaknesses: weaknesses.length,
      weaknesses,
      testDate: runningTest.createdAt,
      status:
        weaknesses.length === 0
          ? "Excellent running technique"
          : "Improvement needed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};