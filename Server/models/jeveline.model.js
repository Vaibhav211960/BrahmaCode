import mongoose from "mongoose";

const throwMetricSchema = new mongoose.Schema(
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

const throwingTechniqueTestSchema = new mongoose.Schema(
  {
    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },

    elbowAtThrow: throwMetricSchema,       
    bodyRotation: throwMetricSchema,       
    throwCount: throwMetricSchema,         
    armAfterThrow: throwMetricSchema,      
    shoulderReaction: throwMetricSchema,   
  },
  { timestamps: true }
);

export default mongoose.model(
  "Jeveline",
  throwingTechniqueTestSchema
);
