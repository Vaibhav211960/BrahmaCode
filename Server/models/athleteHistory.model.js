import mongoose from "mongoose";

const athleteHistoryModel = new mongoose.Schema({
  eventName: {
    type: "String",
    required: true,
  },
  eventType: {
    type: "String",
    required: true,
  },
  score: {
    type: "Number",
    required: true,
  },
  year: {
    type: "Number",
    requried: true,
  },
  month: {
    type: "Number",
    requried: true,
  },
});

const AthleteHistory = mongoose.model("AthleteHistory", athleteHistoryModel);

export default AthleteHistory;
