import mongoose from "mongoose";

const yoloModel = new mongoose.Schema(
  {
    name: { 
        type: "String",
        required: true,
    },
    sport: {
        type: "String",
        required: true,
    },
    bmi: {
        type: "Number",
        required: true,
    },
    verticalJump: {
        type: "Number",
        required: true,
    },
    broadJump: {
        type: "Number",
        required: true,
    },
    sprintTime: {
        type: "Number",
        required: true,
    },
    sprintSpeed: {
        type: "Number",
        required: true,
    },
    beepTest: {
        type: "Number",
        required: true,
    },
    wallSit: {
        type: "Number",
        required: true,
    },
    cooperTest: {
        type: "Number", 
        required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("YoloTest", yoloModel);