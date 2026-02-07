import Jeveline from "../models/jeveline.model.js"
import { jevelineConfig } from "../utils/jevelineConfig.js";

export const createJevelineTest = async (req, res) => {
  try {
    const {
      athleteId,
      elbowAtThrow,
      bodyRotation,
      throwCount,
      armAfterThrow,
      shoulderReaction,
      notes = {},
    } = req.body;

    if (
      !athleteId ||
      !elbowAtThrow ||
      !bodyRotation ||
      throwCount === undefined ||
      !armAfterThrow ||
      !shoulderReaction
    ) {
      return res.status(400).json({
        message: "All throwing technique fields are required",
      });
    }

    const test = await Jeveline.create({
      athleteId,

      elbowAtThrow: {
        value: elbowAtThrow,
        status:
          jevelineConfig.elbowAtThrow.evaluate(
            elbowAtThrow
          ),
        note: notes.elbowAtThrow || "",
      },

      bodyRotation: {
        value: bodyRotation,
        status:
          jevelineConfig.bodyRotation.evaluate(
            bodyRotation
          ),
        note: notes.bodyRotation || "",
      },

      throwCount: {
        value: throwCount,
        status:
          jevelineConfig.throwCount.evaluate(
            throwCount
          ),
        note: notes.throwCount || "",
      },

      armAfterThrow: {
        value: armAfterThrow,
        status:
          jevelineConfig.armAfterThrow.evaluate(
            armAfterThrow
          ),
        note: notes.armAfterThrow || "",
      },

      shoulderReaction: {
        value: shoulderReaction,
        status:
          jevelineConfig.shoulderReaction.evaluate(
            shoulderReaction
          ),
        note: notes.shoulderReaction || "",
      },
    });

    res.status(201).json({
      message: "Throwing technique test created successfully",
      data: test,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getJevelineScore = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const test = await Jeveline.findOne({ athleteId }).sort({
      createdAt: -1,
    });

    if (!test) {
      return res.status(404).json({
        message: "No throwing technique test found for this athlete",
      });
    }

    let score = 0;

    const metrics = [
      { key: "elbowAtThrow", weight: 20 },
      { key: "bodyRotation", weight: 20 },
      { key: "throwCount", weight: 20 },
      { key: "armAfterThrow", weight: 20 },
      { key: "shoulderReaction", weight: 20 },
    ];

    metrics.forEach(({ key, weight }) => {
      if (test[key]?.status === "Correct") {
        score += weight;
      }
    });

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
        elbowAtThrow: test.elbowAtThrow.status,
        bodyRotation: test.bodyRotation.status,
        throwCount: test.throwCount.status,
        armAfterThrow: test.armAfterThrow.status,
        shoulderReaction: test.shoulderReaction.status,
      },
      testDate: test.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getJevelineWeakness = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const test = await Jeveline.findOne({ athleteId }).sort({
      createdAt: -1,
    });

    if (!test) {
      return res.status(404).json({
        message: "No throwing technique test found for this athlete",
      });
    }

    const weaknesses = [];

    const metrics = [
      {
        key: "elbowAtThrow",
        label: "Elbow at Throw",
        issue:
          "Low elbow position reduces throwing power and increases shoulder strain",
        suggestion:
          "Focus on keeping the elbow high during the throwing phase",
      },
      {
        key: "bodyRotation",
        label: "Body Rotation",
        issue:
          "Unsmooth body rotation reduces energy transfer and throwing efficiency",
        suggestion:
          "Practice smooth rotational drills using core engagement",
      },
      {
        key: "throwCount",
        label: "Throw Count",
        issue:
          "Excessive throws increase fatigue and overuse injury risk",
        suggestion:
          "Limit throw repetitions and focus on quality over quantity",
      },
      {
        key: "armAfterThrow",
        label: "Arm After Throw",
        issue:
          "Tense arm after release increases muscle tightness and injury risk",
        suggestion:
          "Practice relaxed follow-through after the throw",
      },
      {
        key: "shoulderReaction",
        label: "Shoulder Reaction",
        issue:
          "Abnormal shoulder reaction may indicate overload or poor mechanics",
        suggestion:
          "Reduce load and work on shoulder stability and mobility drills",
      },
    ];

    metrics.forEach(({ key, label, issue, suggestion }) => {
      if (test[key]?.status === "Incorrect") {
        weaknesses.push({
          metric: key,
          label,
          value: test[key].value,
          issue,
          suggestion,
        });
      }
    });

    res.status(200).json({
      athleteId,
      totalWeaknesses: weaknesses.length,
      weaknesses,
      testDate: test.createdAt,
      status:
        weaknesses.length === 0
          ? "Excellent throwing technique"
          : "Improvement needed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getJevelineInjuryRisk = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const test = await Jeveline.findOne({ athleteId }).sort({
      createdAt: -1,
    });

    if (!test) {
      return res.status(404).json({
        message: "No throwing technique test found for this athlete",
      });
    }

    let riskScore = 0;
    const riskFactors = [];

    const metrics = [
      {
        key: "elbowAtThrow",
        label: "Elbow at Throw",
        weight: 2,
        issue:
          "Incorrect elbow position increases stress on the elbow and shoulder joint",
      },
      {
        key: "bodyRotation",
        label: "Body Rotation",
        weight: 1,
        issue:
          "Poor body rotation reduces force distribution and increases joint load",
      },
      {
        key: "throwCount",
        label: "Throw Count",
        weight: 2,
        issue:
          "High number of throws increases risk of overuse injuries",
      },
      {
        key: "armAfterThrow",
        label: "Arm After Throw",
        weight: 1,
        issue:
          "Tense follow-through increases muscle stiffness and strain",
      },
      {
        key: "shoulderReaction",
        label: "Shoulder Reaction",
        weight: 2,
        issue:
          "Abnormal shoulder reaction indicates overload or poor throwing mechanics",
      },
    ];

    metrics.forEach(({ key, label, weight, issue }) => {
      if (test[key]?.status === "Incorrect") {
        riskScore += weight;
        riskFactors.push({
          metric: key,
          label,
          issue,
        });
      }
    });

    let riskLevel = "Low";
    let recommendation =
      "Maintain current technique and follow proper warm-up routines";

    if (riskScore >= 4) {
      riskLevel = "High";
      recommendation =
        "Reduce throwing volume immediately and focus on corrective technique and recovery";
    } else if (riskScore >= 2) {
      riskLevel = "Medium";
      recommendation =
        "Introduce corrective drills, monitor throw volume, and improve recovery";
    }

    res.status(200).json({
      athleteId,
      riskLevel,
      riskScore,
      riskFactors,
      recommendation,
      testDate: test.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

