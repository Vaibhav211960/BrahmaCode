import mongoose from "mongoose";

const longJumpMetricSchema = new mongoose.Schema(
  {
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ["Correct", "Incorrect"],
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const longJumpTestSchema = new mongoose.Schema(
  {
    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },

    takeOffFoot: longJumpMetricSchema,      
    speedBeforeBoard: longJumpMetricSchema,
    kneeAtLanding: longJumpMetricSchema,     
    balanceAfterLanding: longJumpMetricSchema, 

    repeatedFouls: {
      value: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Correct", "Incorrect"],
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("LongJump", longJumpTestSchema);
