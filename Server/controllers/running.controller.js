import RunningTest from "../models/running.model";

export const createRunningTest = async (req, res) => {
  try {
    const {
      athleteId,
      headPosition,
      armSwing,
      runningLine,
      handPosition,
      reactionTime,
      notes = {},
    } = req.body;

    if (
      !athleteId ||
      !headPosition ||
      !armSwing ||
      !runningLine ||
      !handPosition ||
      reactionTime === undefined
    ) {
      return res.status(400).json({
        message: "All running test fields are required",
      });
    }

    const evaluateString = (value, correctValue) =>
      value.toLowerCase() === correctValue.toLowerCase()
        ? "Correct"
        : "Incorrect";

    const evaluateReactionTime = (value) => {
      if (value < 0.25) return "Excellent";
      if (value <= 0.35) return "Good";
      return "Poor";
    };

    const runningTest = await RunningTest.create({
      athleteId,

      headPosition: {
        value: headPosition,
        status: evaluateString(headPosition, "straight"),
        note: notes.headPosition || "",
      },

      armSwing: {
        value: armSwing,
        status: evaluateString(armSwing, "front-back"),
        note: notes.armSwing || "",
      },

      runningLine: {
        value: runningLine,
        status: evaluateString(runningLine, "straight"),
        note: notes.runningLine || "",
      },

      handPosition: {
        value: handPosition,
        status: evaluateString(handPosition, "same line at head"),
        note: notes.handPosition || "",
      },

      reactionTime: {
        value: reactionTime,
        status: evaluateReactionTime(reactionTime),
      },
    });

    res.status(201).json({
      message: "Running test created successfully",
      data: runningTest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getRunningScore = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const runningTest = await RunningTest.findOne({ athleteId }).sort({
      createdAt: -1,
    });

    if (!runningTest) {
      return res.status(404).json({
        message: "No running test found for this athlete",
      });
    }

    let score = 0;

    const qualitativeMetrics = [
      { key: "headPosition", weight: 15 },
      { key: "armSwing", weight: 15 },
      { key: "runningLine", weight: 15 },
      { key: "handPosition", weight: 15 },
    ];

    qualitativeMetrics.forEach(({ key, weight }) => {
      if (runningTest[key]?.status === "Correct") {
        score += weight;
      }
    });

    const reactionTime = runningTest.reactionTime?.value;

    if (reactionTime !== undefined) {
      if (reactionTime < 0.25) {
        score += 40;
      } else if (reactionTime <= 0.35) {
        score += 28;
      } else {
        score += 16;
      }
    }

    res.status(200).json({
      athleteId,
      score,
      maxScore: 100,
      grade:
        score >= 85
          ? "Excellent"
          : score >= 70
            ? "Good"
            : score >= 50
              ? "Average"
              : "Poor",
      breakdown: {
        headPosition: runningTest.headPosition.status,
        armSwing: runningTest.armSwing.status,
        runningLine: runningTest.runningLine.status,
        handPosition: runningTest.handPosition.status,
        reactionTime: runningTest.reactionTime,
      },
      testDate: runningTest.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
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

export const getRunningInjuryRisk = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const runningTest = await RunningTest.findOne({ athleteId })
      .sort({ createdAt: -1 });

    if (!runningTest) {
      return res.status(404).json({
        message: "No running test found for this athlete",
      });
    }

    let riskScore = 0;
    const riskFactors = [];

    const postureMetrics = [
      {
        key: "headPosition",
        label: "Head Position",
        issue: "Improper head alignment increases neck & spine stress",
      },
      {
        key: "armSwing",
        label: "Arm Swing",
        issue: "Incorrect arm swing affects balance and speed",
      },
      {
        key: "runningLine",
        label: "Running Line",
        issue: "Poor running line increases knee & ankle load",
      },
      {
        key: "handPosition",
        label: "Hand Position",
        issue: "Incorrect hand position disrupts upper-body mechanics",
      },
    ];

    postureMetrics.forEach(({ key, label, issue }) => {
      if (runningTest[key]?.status === "Incorrect") {
        riskScore += 1;
        riskFactors.push({
          metric: key,
          label,
          issue,
        });
      }
    });

    const reactionTime = runningTest.reactionTime?.value;

    if (reactionTime > 0.35) {
      riskScore += 2;
      riskFactors.push({
        metric: "reactionTime",
        label: "Reaction Time",
        issue:
          "Slow reaction time increases sudden load on muscles and joints",
      });
    }

    let riskLevel = "Low";
    let recommendation = "Maintain current training routine";

    if (riskScore >= 4) {
      riskLevel = "High";
      recommendation =
        "Immediate technique correction and load management required";
    } else if (riskScore >= 2) {
      riskLevel = "Medium";
      recommendation =
        "Focus on corrective drills and gradual intensity progression";
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
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

