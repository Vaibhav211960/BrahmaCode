import mongoose from "mongoose";

const longJumpTestSchema = new mongoose.Schema(
  {
    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },
    // Matches Frontend Technique Checks exactly
    takeOffFoot: { type: String, required: true }, // "Correct" or "Incorrect"
    speedBeforeBoard: { type: String, required: true },
    kneeAtLanding: { type: String, required: true },
    balanceAfterLanding: { type: String, required: true },
    
    // Fouls handled as a number
    repeatedFouls: { type: Number, default: 0 },

    // Calculated fields for Dashboard speed
    totalScore: { type: Number, default: 0 },
    riskLevel: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    grade: { type: String, enum: ["Excellent", "Good", "Average", "Poor"], default: "Average" },
    
  },
  { timestamps: true }
);

const LongJump = mongoose.model("LongJump", longJumpTestSchema);
export default LongJump;