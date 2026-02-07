import Relay from "../models/relay.model.js";

export const createRelayTest = async (req, res) => {
  // console.log(req.body); // Useful for hackathon debugging
  
  try {
    const {
      athleteId,
      accelerationDistance,
      armAngle,
      batonExchange,
      verbalCueTiming,
      legMuscleTightness,
      notes = "" // FIX: Default value to prevent "notes is not defined" error
    } = req.body;

    // 1. Basic Validation
    // Matches the 5 'techniqueChecks' keys in your RelayMockTest frontend
    if (!athleteId || !accelerationDistance || !armAngle || !batonExchange || !verbalCueTiming || !legMuscleTightness) {
      return res.status(400).json({ message: "All relay technique fields are required" });
    }

    // 2. Weighted Scoring Logic (20 points each for total of 100)
    const metrics = [accelerationDistance, armAngle, batonExchange, verbalCueTiming, legMuscleTightness];
    let score = 0;
    
    metrics.forEach(val => {
      // Lowercase check to be safe with frontend string variations
      if (val && val.toLowerCase() === "correct") score += 20;
    });

    // 3. Injury Risk & Coordination Logic
    let risk = "Low";
    // Using your specific logic: Flagging issues if synchronization is poor
    if (batonExchange.toLowerCase() === "incorrect" || legMuscleTightness.toLowerCase() === "incorrect") {
      risk = "Medium"; 
    }
    if (score < 40) risk = "High";

    // 4. Create record in MongoDB
    // This now matches your simplified single-layer model perfectly
    const relayTest = await Relay.create({
      athleteId,
      accelerationDistance,
      armAngle,
      batonExchange,
      verbalCueTiming,
      legMuscleTightness,
      totalScore: score,
      riskLevel: risk,
      grade: score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Average" : "Poor",
      notes
    });

    res.status(201).json({
      message: "Relay synchronization analysis saved",
      data: relayTest
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRelayScore = async (req, res) => {
  try {
    const { athleteId } = req.params;
    const test = await Relay.findOne({ athleteId }).sort({ createdAt: -1 });

    if (!test) return res.status(404).json({ message: "No relay records found" });

    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRelayWeakness = async (req, res) => {
  try {
    const { athleteId } = req.params;
    const test = await Relay.findOne({ athleteId }).sort({ createdAt: -1 });

    if (!test) return res.status(404).json({ message: "Data not found" });

    const weaknesses = [];
    // Ensure these strings ("Incorrect") match exactly how they are saved in createRelayTest
    if (test.batonExchange === "Incorrect") weaknesses.push("Baton Handoff Mechanics");
    if (test.timing === "Incorrect") weaknesses.push("Runner Synchronization");
    if (test.zoneExecution === "Incorrect") weaknesses.push("Exchange Zone Utilization");

    res.status(200).json({ 
      athleteId, 
      totalWeaknesses: weaknesses.length,
      weaknesses, 
      status: test.grade 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};