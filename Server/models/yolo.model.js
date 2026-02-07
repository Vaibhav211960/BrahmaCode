import mongoose from "mongoose";

const metricSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Poor"],
      required: true,
    },
  },
  { _id: false },
);

const yoloSchema = new mongoose.Schema(
  {
    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    ankleDorsiflexion: metricSchema,
    singleLegBalance: metricSchema,
    verticalJump: metricSchema,
    broadJump: metricSchema,
    sprintTime: metricSchema,
    agilityTtest: metricSchema,
    beepTest: metricSchema,
    wallSit: metricSchema,
    cooperTest: metricSchema,
  },
  { timestamps: true },
);

export default mongoose.model("YoloTest", yoloSchema);
