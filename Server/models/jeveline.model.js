import mongoose from "mongoose";

const javelinTestSchema = new mongoose.Schema(
  {
    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },
    // Technique Fields (Matches Frontend Checklist)
    elbowAtThrow: { type: String, required: true },
    bodyRotation: { type: String, required: true },
    armAfterThrow: { type: String, required: true },
    shoulderReaction: { type: String, required: true },
    
    // Numeric metrics
    throwCount: { type: Number, default: 0 },

    // Calculated fields for Dashboard
    totalScore: { type: Number, default: 0 },
    riskLevel: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    grade: { type: String, enum: ["Excellent", "Good", "Average", "Poor"], default: "Average" },
    
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

// Standardize model name as 'Javelin'
const Javeline = mongoose.model("Javeline", javelinTestSchema);
export default Javeline;