import mongoose from "mongoose";

const runningMetricSchema = new mongoose.Schema(
  {
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ["Correct", "Incorrect", "Good", "Poor"],
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const runningTestSchema = new mongoose.Schema(
  {
    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },

    headPosition: runningMetricSchema,
    armSwing: runningMetricSchema, 
    runningLine: runningMetricSchema, 
    handPosition: runningMetricSchema, 

    reactionTime: {
      value: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Excellent", "Good", "Poor"],
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("RunningTest", runningTestSchema);