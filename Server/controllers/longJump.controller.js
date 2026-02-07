import LongJump from "../models/longJump.model.js";
import { longJumpConfig } from "../utils/longJumpConfig.js";

export const createLongJumpTest = async (req, res) => {
  try {
    const {
      athleteId,
      takeOffFoot,
      speedBeforeBoard,
      kneeAtLanding,
      balanceAfterLanding,
      repeatedFouls,
      notes = {},
    } = req.body;

    if (
      !athleteId ||
      !takeOffFoot ||
      !speedBeforeBoard ||
      !kneeAtLanding ||
      !balanceAfterLanding ||
      repeatedFouls === undefined
    ) {
      return res.status(400).json({
        message: "All long jump test fields are required",
      });
    }

    const longJumpTest = await LongJump.create({
      athleteId,

      takeOffFoot: {
        value: takeOffFoot,
        status: longJumpConfig.takeOffFoot.evaluate(takeOffFoot),
        note: notes.takeOffFoot || "",
      },

      speedBeforeBoard: {
        value: speedBeforeBoard,
        status: longJumpConfig.speedBeforeBoard.evaluate(speedBeforeBoard),
        note: notes.speedBeforeBoard || "",
      },

      kneeAtLanding: {
        value: kneeAtLanding,
        status: longJumpConfig.kneeAtLanding.evaluate(kneeAtLanding),
        note: notes.kneeAtLanding || "",
      },

      balanceAfterLanding: {
        value: balanceAfterLanding,
        status: longJumpConfig.balanceAfterLanding.evaluate(balanceAfterLanding),
        note: notes.balanceAfterLanding || "",
      },

      repeatedFouls: {
        value: repeatedFouls,
        status: longJumpConfig.repeatedFouls.evaluate(repeatedFouls),
      },
    });

    res.status(201).json({
      message: "Long Jump test created successfully",
      data: longJumpTest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getLongJumpWeakness = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const longJumpTest = await LongJump.findOne({ athleteId })
      .sort({ createdAt: -1 });

    if (!longJumpTest) {
      return res.status(404).json({
        message: "No Long Jump test found for this athlete",
      });
    }

    const weaknesses = [];

    const techniqueMetrics = [
      {
        key: "takeOffFoot",
        label: "Take-off Foot",
        suggestion:
          "Practice consistent straight-foot take-off drills",
      },
      {
        key: "speedBeforeBoard",
        label: "Speed Before Board",
        suggestion:
          "Work on controlled approach runs with rhythm drills",
      },
      {
        key: "kneeAtLanding",
        label: "Knee at Landing",
        suggestion:
          "Focus on bending knees during landing to absorb impact",
      },
      {
        key: "balanceAfterLanding",
        label: "Balance After Landing",
        suggestion:
          "Improve core stability and landing balance drills",
      },
    ];

    techniqueMetrics.forEach(({ key, label, suggestion }) => {
      if (longJumpTest[key]?.status === "Incorrect") {
        weaknesses.push({
          metric: key,
          label,
          value: longJumpTest[key].value,
          issue: "Incorrect technique",
          suggestion,
        });
      }
    });

    if (longJumpTest.repeatedFouls?.value > 1) {
      weaknesses.push({
        metric: "repeatedFouls",
        label: "Repeated Fouls",
        value: longJumpTest.repeatedFouls.value,
        issue: "Too many fouls during take-off",
        suggestion:
          "Practice take-off accuracy and board awareness drills",
      });
    }

    res.status(200).json({
      athleteId,
      totalWeaknesses: weaknesses.length,
      weaknesses,
      testDate: longJumpTest.createdAt,
      status:
        weaknesses.length === 0
          ? "Excellent long jump technique"
          : "Improvement needed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getLongJumpInjuryRisk = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const longJumpTest = await LongJumpTest.findOne({ athleteId })
      .sort({ createdAt: -1 });

    if (!longJumpTest) {
      return res.status(404).json({
        message: "No Long Jump test found for this athlete",
      });
    }

    let riskScore = 0;
    const riskFactors = [];

    const techniqueMetrics = [
      {
        key: "takeOffFoot",
        label: "Take-off Foot",
        weight: 1,
        issue:
          "Incorrect take-off foot alignment increases ankle and knee stress",
      },
      {
        key: "speedBeforeBoard",
        label: "Speed Before Board",
        weight: 1,
        issue:
          "Uncontrolled speed reduces take-off accuracy and landing safety",
      },
      {
        key: "kneeAtLanding",
        label: "Knee at Landing",
        weight: 2,
        issue:
          "Straight knee landing increases impact load on joints",
      },
      {
        key: "balanceAfterLanding",
        label: "Balance After Landing",
        weight: 1,
        issue:
          "Poor balance increases risk of ankle and hip injuries",
      },
    ];

    techniqueMetrics.forEach(({ key, label, weight, issue }) => {
      if (longJumpTest[key]?.status === "Incorrect") {
        riskScore += weight;
        riskFactors.push({
          metric: key,
          label,
          issue,
        });
      }
    });

    if (longJumpTest.repeatedFouls?.value > 1) {
      riskScore += 2;
      riskFactors.push({
        metric: "repeatedFouls",
        label: "Repeated Fouls",
        issue:
          "Frequent fouls indicate poor take-off control and higher injury risk",
      });
    }

    let riskLevel = "Low";
    let recommendation = "Maintain current technique and training load";

    if (riskScore >= 4) {
      riskLevel = "High";
      recommendation =
        "Immediate technique correction and reduced impact training recommended";
    } else if (riskScore >= 2) {
      riskLevel = "Medium";
      recommendation =
        "Focus on corrective drills and gradual load progression";
    }

    res.status(200).json({
      athleteId,
      riskLevel,
      riskScore,
      riskFactors,
      recommendation,
      testDate: longJumpTest.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getLongJumpScore = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const longJumpTest = await LongJump.findOne({ athleteId }).sort({
      createdAt: -1,
    });

    if (!longJumpTest) {
      return res.status(404).json({
        message: "No long jump test found for this athlete",
      });
    }

    let score = 0;

    const techniqueMetrics = [
      { key: "takeOffFoot", weight: 20 },
      { key: "speedBeforeBoard", weight: 20 },
      { key: "kneeAtLanding", weight: 25 },
      { key: "balanceAfterLanding", weight: 20 },
    ];

    techniqueMetrics.forEach(({ key, weight }) => {
      if (longJumpTest[key]?.status === "Correct") {
        score += weight;
      }
    });

    if (longJumpTest.repeatedFouls?.value <= 1) {
      score += 15;
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
        takeOffFoot: longJumpTest.takeOffFoot.status,
        speedBeforeBoard: longJumpTest.speedBeforeBoard.status,
        kneeAtLanding: longJumpTest.kneeAtLanding.status,
        balanceAfterLanding: longJumpTest.balanceAfterLanding.status,
        repeatedFouls: longJumpTest.repeatedFouls,
      },
      testDate: longJumpTest.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
