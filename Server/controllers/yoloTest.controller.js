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
    } = req.body;

    const yoloTest = await Yolo.create({
      athleteId,
      age,
      gender,

      ankleDorsiflexion: {
        value: ankleDorsiflexion,
        label: yoloConfig.ankleDorsiflexion(ankleDorsiflexion),
      },

      singleLegBalance: {
        value: singleLegBalance,
        label: yoloConfig.singleLegBalance(singleLegBalance),
      },

      verticalJump: {
        value: verticalJump,
        label: yoloConfig.verticalJump(verticalJump),
      },

      broadJump: {
        value: broadJump,
        label: yoloConfig.broadJump(broadJump),
      },

      sprintTime: {
        value: sprintTime,
        label:
          sprintTime <= 4.3
            ? yoloConfig.sprintTime20m(sprintTime)
            : yoloConfig.sprintTime30m(sprintTime),
      },

      agilityTtest: {
        value: agilityTtest,
        label: yoloConfig.agilityTtest(agilityTtest),
      },

      beepTest: {
        value: beepTest,
        label: yoloConfig.beepTest(beepTest),
      },

      wallSit: {
        value: wallSit,
        label: yoloConfig.wallSit(wallSit),
      },

      cooperTest: {
        value: cooperTest,
        label: yoloConfig.cooperTest(cooperTest),
      },
    });

    console.log(yoloTest)
    
    res.status(201).json({
      message: "YOLO test evaluated successfully",
      data: yoloTest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getYoloTests = async (req, res) => {
  try {
    const { athleteId } = req.params;
    const yoloTests = await Yolo.find({ athleteId }).sort({ createdAt: -1 }).limit(10);
    
    if (!yoloTests || yoloTests.length === 0) {
      return res.status(404).json({ message: "No YOLO tests found for this athlete", data: [] });
    }
    
    res.status(200).json({ message: "YOLO tests retrieved successfully", data: yoloTests });
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

    const athletes = await Athlete.find({ sport: athlete.sport }).select("_id");

    const athleteIds = athletes.map((a) => a._id);

    const yoloTests = await YoloTest.aggregate([
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
    const comparison = {};

    metrics.forEach((metric) => {
      const values = yoloTests
        .map((t) => t.latestTest[metric]?.value)
        .filter((v) => v !== undefined && v !== null);

      const athleteValue = currentAthleteTest[metric]?.value;
      if (athleteValue == null || values.length === 0) return;

      const avg = values.reduce((sum, v) => sum + v, 0) / values.length;

      const sorted = [...values].sort((a, b) => a - b);
      const rank = reverseMetrics.includes(metric)
        ? sorted.findIndex((v) => v >= athleteValue) + 1
        : sorted.reverse().findIndex((v) => v <= athleteValue) + 1;

      const percentile = Math.round(
        ((values.length - rank) / values.length) * 100,
      );

      comparison[metric] = {
        athleteValue,
        peerAverage: Number(avg.toFixed(2)),
        best: reverseMetrics.includes(metric)
          ? Math.min(...values)
          : Math.max(...values),
        percentile,
        status:
          athleteValue > avg
            ? "Above Average"
            : athleteValue < avg
              ? "Below Average"
              : "Average",
      };
    });

    res.status(200).json({
      athleteId,
      sport: athlete.sport,
      totalPeers: athleteIds.length - 1,
      comparison,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
