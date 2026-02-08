import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const coachModel = mongoose.Schema(
  {
    name: {
      type: String, // Use String constructor for cleaner code
      required: true,
    },
    email: {
      type: String,
      required: true, // Fixed the typo here
      unique: true,   // Highly recommended to prevent duplicate accounts
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "coach", // Critical for our unified login redirection
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    disciples: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
    }],
    yearOfExp: {
      type: Number,
    },
    education: {
      type: String,
    },
    coachInstitute: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save validation remains the same
coachModel.pre("validate", function (next) {
  if (
    this.isNew &&
    this.googleId &&
    (!this.password || this.password === null || this.password === undefined)
  ) {
    const err = new mongoose.Error.ValidationError(this);
    err.addError(
      "password",
      new mongoose.Error.ValidatorError({
        message: "Password is required for local accounts",
        path: "password",
        value: this.password,
      })
    );
    return next(err);
  }
  next();
});

// Logic for Login and Register flows
coachModel.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: this.role }, // Added role to token payload
    process.env.JWT_SECRET || 'fallback_secret', // Always have a fallback for hackathons
    { expiresIn: "3d" }
  );
  return token;
};

coachModel.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

coachModel.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

const Coach = mongoose.model("Coach", coachModel);
export default Coach;
