import mongoose from "mongoose";

const techniqueMetricSchema = new mongoose.Schema(
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

const accelerationExchangeTestSchema = new mongoose.Schema(
  {
    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },

    accelerationDistance: techniqueMetricSchema, 
    batonExchange: techniqueMetricSchema,         
    armAngle: techniqueMetricSchema,               
    verbalCueTiming: techniqueMetricSchema,        
    legMuscleTightness: techniqueMetricSchema,     
  },
  { timestamps: true }
);

export default mongoose.model(
  "Relay",
  accelerationExchangeTestSchema
);
