import mongoose from "mongoose";

const relayTestSchema = new mongoose.Schema(
  {
    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },
    // Matches Frontend techniqueChecks exactly
    accelerationDistance: { type: String, required: true },
    armAngle: { type: String, required: true },
    batonExchange: { type: String, required: true },
    verbalCueTiming: { type: String, required: true },
    legMuscleTightness: { type: String, required: true },
    
    // Aggregated Metrics for Dashboard
    totalScore: { type: Number, default: 0 },
    riskLevel: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    grade: { type: String, enum: ["Excellent", "Good", "Average", "Poor"], default: "Average" },
    
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

// Unified Model Name
const Relay = mongoose.model("Relay", relayTestSchema);
export default Relay;