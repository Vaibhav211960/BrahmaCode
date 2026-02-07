import mongoose from "mongoose";

const runningTestSchema = new mongoose.Schema(
  {
    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },
    // Simplified: Store the "Correct/Incorrect" value directly as a string
    headPosition: { type: String, required: true },
    armSwing: { type: String, required: true },
    runningLine: { type: String, required: true },
    footSound: { type: String, required: true },
    faceExpression: { type: String, required: true },
    
    // Aggregated data for easier dashboard access
    totalScore: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Standardize model name to match your controller imports
const RunningTest = mongoose.model("RunningTest", runningTestSchema);
export default RunningTest;