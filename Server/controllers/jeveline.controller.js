import Javeline from "../models/jeveline.model.js";

export const createJevelineTest = async (req, res) => {
  console.log(req.body);
  
  try {
    const {
      athleteId = "69875bccbfb21ca0eab99ff8",
      elbowAtThrow,
      bodyRotation,
      armAfterThrow,
      shoulderReaction,
      throwCount,
      notes = ""
    } = req.body;

    // 1. Basic Validation
    if (!athleteId || !elbowAtThrow || !bodyRotation || !armAfterThrow || !shoulderReaction) {
      return res.status(400).json({ message: "All technique fields are required" });
    }

    // 2. Simple Scoring Logic (20 points per correct metric)
    let score = 0;
    const metrics = [elbowAtThrow, bodyRotation, armAfterThrow, shoulderReaction];
    
    metrics.forEach(val => {
      if (val && val.toLowerCase() === "correct") score += 20;
    });

    // Throw Count logic: 20 points if count is within safe range (e.g., < 25)
    const count = parseInt(throwCount) || 0;
    if (count > 0 && count <= 25) score += 20;

    // 3. Injury Risk Logic (Flagging Overuse)
    let risk = "Low";
    if (count > 30 || elbowAtThrow.toLowerCase() === "incorrect") {
      risk = "High"; // Specifically flagging shoulder strain or high volume
    } else if (score < 60) {
      risk = "Medium";
    }

    // 4. Create record
    const javelinTest = await Javeline.create({
      athleteId,
      elbowAtThrow,
      bodyRotation,
      armAfterThrow,
      shoulderReaction,
      throwCount: count,
      totalScore: score,
      riskLevel: risk,
      grade: score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Average" : "Poor",
      notes
    });

    res.status(201).json({
      message: "Javelin analysis saved successfully",
      data: javelinTest
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJevelineScore = async (req, res) => {
  try {
    const { athleteId } = req.params;
    const test = await Javeline.findOne({ athleteId }).sort({ createdAt: -1 });

    if (!test) return res.status(404).json({ message: "No tests found" });

    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logic for flagging weaknesses
export const getJevelineWeakness = async (req, res) => {
  try {
    const { athleteId } = req.params;
    const test = await Javeline.findOne({ athleteId }).sort({ createdAt: -1 });

    if (!test) return res.status(404).json({ message: "No data found" });

    const weaknesses = [];
    if (test.elbowAtThrow === "Incorrect") weaknesses.push("Elbow Height during Delivery");
    if (test.bodyRotation === "Incorrect") weaknesses.push("Core Rotational Energy");
    if (test.throwCount > 25) weaknesses.push("High Training Volume / Fatigue");

    res.status(200).json({ athleteId, weaknesses, status: test.grade });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};