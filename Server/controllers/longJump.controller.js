import LongJump from "../models/longJump.model.js";

export const createLongJumpTest = async (req, res) => {
  console.log(req.body);
  
  try {
    const {
      athleteId = "69875bccbfb21ca0eab99ff8",
      takeOffFoot,
      speedBeforeBoard,
      kneeAtLanding,
      balanceAfterLanding,
      repeatedFouls,
    } = req.body;

    // 1. Basic Validation
    if (!athleteId || !takeOffFoot || !speedBeforeBoard || !kneeAtLanding || !balanceAfterLanding) {
      return res.status(400).json({ message: "All technique fields are required" });
    }

    // 2. Simple Scoring Logic (matching your score calculation)
    let score = 0;
    const metrics = [takeOffFoot, speedBeforeBoard, kneeAtLanding, balanceAfterLanding];
    
    // Each technique parameter is 20 points
    metrics.forEach(val => {
      if (val.toLowerCase() === "correct") score += 20;
    });

    // Fouls logic: 20 points if 0-1 fouls, 0 if more
    if (parseInt(repeatedFouls) <= 1) score += 20;

    // 3. Injury Risk Logic
    let risk = "Low";
    if (kneeAtLanding.toLowerCase() === "incorrect" || parseInt(repeatedFouls) > 2) {
      risk = "High"; // Specifically flagging straight-knee landing or high fouls
    } else if (score < 60) {
      risk = "Medium";
    }

    // 4. Create record
    const longJumpTest = await LongJump.create({
      athleteId,
      takeOffFoot,
      speedBeforeBoard,
      kneeAtLanding,
      balanceAfterLanding,
      repeatedFouls: parseInt(repeatedFouls) || 0,
      totalScore: score,
      riskLevel: risk,
      grade: score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Average" : "Poor",

    });

    res.status(201).json({
      message: "Long Jump analysis saved successfully",
      data: longJumpTest
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLongJumpScore = async (req, res) => {
  try {
    const { athleteId } = req.params;
    const test = await LongJump.findOne({ athleteId }).sort({ createdAt: -1 });

    if (!test) return res.status(404).json({ message: "No tests found" });

    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Simplified Weakness route
export const getLongJumpWeakness = async (req, res) => {
  try {
    const { athleteId } = req.params;
    const test = await LongJump.findOne({ athleteId }).sort({ createdAt: -1 });

    if (!test) return res.status(404).json({ message: "No analysis found" });

    const weaknesses = [];
    if (test.takeOffFoot === "Incorrect") weaknesses.push("Take-off Foot Alignment");
    if (test.kneeAtLanding === "Incorrect") weaknesses.push("Knee Flexion at Landing");
    if (test.repeatedFouls > 1) weaknesses.push("Board Awareness/Fouls");

    res.status(200).json({ athleteId, weaknesses, status: test.grade });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};