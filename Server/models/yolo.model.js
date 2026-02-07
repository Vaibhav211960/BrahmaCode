import mongoose from "mongoose";

<<<<<<< HEAD
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
=======
const yoloModel = new mongoose.Schema(
  {
    name: { 
        type: String,
        required: true,
    },
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
        required: true,
    },
    ankleDorsiflexion: {
        type: Number,
        required: true,
    },
    singleLegBalance: {
        type: Number,
        required: true,
    },
    agilityTtest: {
        type: Number,
        required: true,
    },

    verticalJump: {
        type: Number,
        required: true,
    },
    broadJump: {
        type: Number,
        required: true,
    },
    sprintTime: {
        type: Number,
        required: true,
    },
    beepTest: {
        type: Number,
        required: true,
    },
    wallSit: {
        type: Number,
        required: true,
    },
    cooperTest: {
        type: Number, 
        required: true,
    },
>>>>>>> 623a52a1c719b555a9acecfb5d31268b08cc7ed5
  },
  { timestamps: true },
);

<<<<<<< HEAD
export default mongoose.model("YoloTest", yoloSchema);
=======
export default mongoose.model("YoloTest", yoloModel);
>>>>>>> 623a52a1c719b555a9acecfb5d31268b08cc7ed5
