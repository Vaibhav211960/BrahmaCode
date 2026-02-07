import mongoose from "mongoose";

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
  },
  { timestamps: true },
);

export default mongoose.model("YoloTest", yoloModel);