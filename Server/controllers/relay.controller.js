import Relay from "../models/relay.model.js";
import { relayConfig } from "../utils/relayConfig.js";

export const createRelayTest = async (req, res) => {
  try {
    const {
      athleteId,
      accelerationDistance,
      batonExchange,
      armAngle,
      verbalCueTiming,
      legMuscleTightness,
      notes = {},
    } = req.body;

    if (
      !athleteId ||
      accelerationDistance === undefined ||
      batonExchange === undefined ||
      !armAngle ||
      !verbalCueTiming ||
      !legMuscleTightness
    ) {
      return res.status(400).json({
        message: "All acceleration & exchange test fields are required",
      });
    }

    const test = await Relay.create({
      athleteId,

      accelerationDistance: {
        value: accelerationDistance,
        status:
          relayConfig.accelerationDistance.evaluate(
            accelerationDistance
          ),
        note: notes.accelerationDistance || "",
      },

      batonExchange: {
        value: batonExchange,
        status:
          relayConfig.batonExchange.evaluate(
            batonExchange
          ),
        note: notes.batonExchange || "",
      },

      armAngle: {
        value: armAngle,
        status:
          relayConfig.armAngle.evaluate(armAngle),
        note: notes.armAngle || "",
      },

      verbalCueTiming: {
        value: verbalCueTiming,
        status:
          relayConfig.verbalCueTiming.evaluate(
            verbalCueTiming
          ),
        note: notes.verbalCueTiming || "",
      },

      legMuscleTightness: {
        value: legMuscleTightness,
        status:
          relayConfig.legMuscleTightness.evaluate(
            legMuscleTightness
          ),
        note: notes.legMuscleTightness || "",
      },
    });

    res.status(201).json({
      message: "Acceleration & Exchange test created successfully",
      data: test,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getRelayWeakness = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const test = await Relay.findOne({ athleteId }).sort({
      createdAt: -1,
    });

    if (!test) {
      return res.status(404).json({
        message: "No acceleration & exchange test found for this athlete",
      });
    }

    const weaknesses = [];

    const metrics = [
      {
        key: "accelerationDistance",
        label: "Acceleration Distance",
        issue:
          "Incorrect acceleration distance affects speed buildup and timing",
        suggestion:
          "Practice acceleration phase drills focusing on 20m buildup",
      },
      {
        key: "batonExchange",
        label: "Baton Exchange",
        issue:
          "Delayed baton exchange can reduce speed and cause disqualification",
        suggestion:
          "Practice quick handover drills with visual and verbal cues",
      },
      {
        key: "armAngle",
        label: "Arm Angle",
        issue:
          "Incorrect arm angle reduces running efficiency and balance",
        suggestion:
          "Focus on natural backward arm swing during sprinting",
      },
      {
        key: "verbalCueTiming",
        label: "Verbal Cue Timing",
        issue:
          "Late verbal cues disrupt baton exchange coordination",
        suggestion:
          "Initiate verbal cue earlier during approach phase",
      },
      {
        key: "legMuscleTightness",
        label: "Leg Muscle Tightness",
        issue:
          "Excessive muscle tightness increases injury risk and reduces speed",
        suggestion:
          "Include proper warm-up, stretching, and recovery routines",
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
          ? "Excellent acceleration & exchange technique"
          : "Improvement needed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getRelayInjuryRisk = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const test = await Relay.findOne({ athleteId }).sort({
      createdAt: -1,
    });

    if (!test) {
      return res.status(404).json({
        message: "No acceleration & exchange test found for this athlete",
      });
    }

    let riskScore = 0;
    const riskFactors = [];

    const metrics = [
      {
        key: "accelerationDistance",
        label: "Acceleration Distance",
        weight: 1,
        issue:
          "Incorrect acceleration distance disrupts sprint mechanics and increases strain",
      },
      {
        key: "batonExchange",
        label: "Baton Exchange",
        weight: 2,
        issue:
          "Poor baton exchange timing increases collision and muscle strain risk",
      },
      {
        key: "armAngle",
        label: "Arm Angle",
        weight: 1,
        issue:
          "Incorrect arm angle reduces balance and increases upper-body stress",
      },
      {
        key: "verbalCueTiming",
        label: "Verbal Cue Timing",
        weight: 1,
        issue:
          "Late verbal cues cause abrupt deceleration and coordination stress",
      },
      {
        key: "legMuscleTightness",
        label: "Leg Muscle Tightness",
        weight: 2,
        issue:
          "High muscle tightness increases risk of hamstring and calf injuries",
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
      "Maintain current technique and continue proper warm-up routines";

    if (riskScore >= 4) {
      riskLevel = "High";
      recommendation =
        "Immediate technique correction, reduced sprint load, and recovery focus recommended";
    } else if (riskScore >= 2) {
      riskLevel = "Medium";
      recommendation =
        "Focus on corrective drills, coordination practice, and flexibility work";
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

export const getRelayScore = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const test = await AccelerationExchangeTest.findOne({ athleteId }).sort({
      createdAt: -1,
    });

    if (!test) {
      return res.status(404).json({
        message: "No acceleration & exchange test found for this athlete",
      });
    }

    let score = 0;

    const metrics = [
      { key: "accelerationDistance", weight: 20 },
      { key: "batonExchange", weight: 25 },
      { key: "armAngle", weight: 15 },
      { key: "verbalCueTiming", weight: 15 },
      { key: "legMuscleTightness", weight: 25 },
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
        accelerationDistance: test.accelerationDistance.status,
        batonExchange: test.batonExchange.status,
        armAngle: test.armAngle.status,
        verbalCueTiming: test.verbalCueTiming.status,
        legMuscleTightness: test.legMuscleTightness.status,
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
