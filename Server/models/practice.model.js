import mongoose from "mongoose";

// Main practice schema
const practiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },
    coachId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
      required: true,
    },
    activityName: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      default: null,
      min: 0,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Practice", practiceSchema);
