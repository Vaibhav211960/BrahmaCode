import mongoose from "mongoose";

// Sub-schema for practice activities
const practiceActivitySchema = new mongoose.Schema(
  {
    activityName: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  { _id: false }
);

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
    activities: [practiceActivitySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Practice", practiceSchema);
