import Athlete from "../models/athlete.model.js";
import Yolo from "../models/yolo.model.js";
import { yoloConfig } from "../utils/yonoConfig.js";

export const createYoloTest = async (req, res) => {
  try {
    const {
      athleteId,
      age,
      gender,
      ankleDorsiflexion,
      singleLegBalance,
      verticalJump,
      broadJump,
      sprintTime,
      agilityTtest,
      beepTest,
      wallSit,
      cooperTest,
      reactionTime,
      benchPress,
      sitAndReach,
    } = req.body;

    // Validate required fields
    if (!athleteId || !age || !gender) {
      return res.status(400).json({
        message: "Missing required fields: athleteId, age, gender",
      });
    }

    const yoloTest = await Yolo.create({
      athleteId,
      age,
      gender,

      ankleDorsiflexion: {
        value: ankleDorsiflexion || 0,
        label: yoloConfig.ankleDorsiflexion?.(ankleDorsiflexion) || "Average",
      },

      singleLegBalance: {
        value: singleLegBalance || 0,
        label: yoloConfig.singleLegBalance?.(singleLegBalance) || "Average",
      },

      verticalJump: {
        value: verticalJump || 0,
        label: yoloConfig.verticalJump?.(verticalJump) || "Average",
      },

      broadJump: {
        value: broadJump || 0,
        label: yoloConfig.broadJump?.(broadJump) || "Average",
      },

      sprintTime: {
        value: sprintTime || 0,
        label:
          sprintTime && sprintTime <= 4.3
            ? yoloConfig.sprintTime20m?.(sprintTime) || "Average"
            : yoloConfig.sprintTime30m?.(sprintTime) || "Average",
      },

      agilityTtest: {
        value: agilityTtest || 0,
        label: yoloConfig.agilityTtest?.(agilityTtest) || "Average",
      },

      beepTest: {
        value: beepTest || 0,
        label: yoloConfig.beepTest?.(beepTest) || "Average",
      },

      wallSit: {
        value: wallSit || 0,
        label: yoloConfig.wallSit?.(wallSit) || "Average",
      },

      cooperTest: {
        value: cooperTest || 0,
        label: yoloConfig.cooperTest?.(cooperTest) || "Average",
      },

      reactionTime: {
        value: reactionTime || 0,
        label: yoloConfig.reactionTime?.(reactionTime) || "Average",
      },

      benchPress: {
        value: benchPress || 0,
        label: yoloConfig.benchPress?.(benchPress) || "Average",
      },

      sitAndReach: {
        value: sitAndReach || 0,
        label: yoloConfig.sitAndReach?.(sitAndReach) || "Average",
      },
    });

    res.status(201).json({
      message: "YOLO test evaluated successfully",
      data: yoloTest,
    });
  } catch (error) {
    console.error("Error creating YOLO test:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getYoloTests = async (req, res) => {
  try {
    const { athleteId } = req.params;
    const yoloTests = await Yolo.find({ athleteId })
      .sort({ createdAt: -1 })
      .limit(10);

    if (!yoloTests || yoloTests.length === 0) {
      return res
        .status(404)
        .json({ message: "No YOLO tests found for this athlete", data: [] });
    }

    res
      .status(200)
      .json({ message: "YOLO tests retrieved successfully", data: yoloTests });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllYoloTests = async (req, res) => {
  try {
    const allYoloTests = await Yolo.find();
    res.status(200).json({ message: "All Yolo Tests", allYoloTests });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const compareWithSameSportAthletes = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const athlete = await Athlete.findById(athleteId);
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    // Find all athletes in same sport
    const athletes = await Athlete.find({ sport: athlete.sport }).select("_id");
    const athleteIds = athletes.map((a) => a._id);

    // Get latest test for each athlete
    const yoloTests = await Yolo.aggregate([
      { $match: { athleteId: { $in: athleteIds } } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$athleteId",
          latestTest: { $first: "$$ROOT" },
        },
      },
    ]);

    const currentAthleteTest = yoloTests.find(
      (t) => t._id.toString() === athleteId,
    )?.latestTest;

    if (!currentAthleteTest) {
      return res.status(400).json({
        message: "YOLO test not found for athlete",
      });
    }

    // Define metrics to compare
    const metricsToCompare = [
      "verticalJump",
      "broadJump",
      "sprintTime",
      "agilityTtest",
      "beepTest",
      "wallSit",
      "cooperTest",
      "reactionTime",
      "benchPress",
      "sitAndReach",
    ];

    const comparison = {};

    metricsToCompare.forEach((metric) => {
      const values = yoloTests
        .map((t) => t.latestTest[metric]?.value)
        .filter((v) => v !== undefined && v !== null && v > 0);

      const athleteValue = currentAthleteTest[metric]?.value;
      if (athleteValue == null || values.length === 0) return;

      const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
      const sorted = [...values].sort((a, b) => a - b);

      // For time-based metrics (sprint, agility, reaction), lower is better
      const isTimeMetric = [
        "sprintTime",
        "agilityTtest",
        "reactionTime",
      ].includes(metric);

      const rank = isTimeMetric
        ? sorted.findIndex((v) => v >= athleteValue) + 1
        : sorted.reverse().findIndex((v) => v <= athleteValue) + 1;

      const percentile = Math.round(
        ((values.length - rank) / values.length) * 100,
      );

      comparison[metric] = {
        athleteValue: Number(athleteValue.toFixed(2)),
        peerAverage: Number(avg.toFixed(2)),
        best: isTimeMetric ? Math.min(...values) : Math.max(...values),
        worst: isTimeMetric ? Math.max(...values) : Math.min(...values),
        percentile,
        totalPeers: values.length,
        status:
          athleteValue > avg && !isTimeMetric
            ? "Above Average"
            : athleteValue < avg && isTimeMetric
              ? "Above Average"
              : athleteValue > avg && isTimeMetric
                ? "Below Average"
                : athleteValue < avg && !isTimeMetric
                  ? "Below Average"
                  : "Average",
      };
    });

    res.status(200).json({
      message: "Comparison completed successfully",
      athleteId,
      athleteName: athlete.name,
      sport: athlete.sport,
      totalPeers: athleteIds.length - 1,
      comparison,
    });
  } catch (error) {
    console.error("Error comparing athletes:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
