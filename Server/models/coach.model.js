import mongoose from "mongoose";
<<<<<<< HEAD
=======
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
>>>>>>> 623a52a1c719b555a9acecfb5d31268b08cc7ed5

const coachModel = mongoose.Schema(
  {
    name: {
<<<<<<< HEAD
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      requried: true,
    },
    password: {
      type: "String",
      required: true,
    },
    category: {
        type: "String",
        required: true
    },
    level: {
        type: "String",
        required: true
    },
    disciples: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Athlete"
    }],
    yearOfExp: {
        type: "Number"
    },
    education: {
        type: "String"
    },
    coachInstitute: {
        type: "String"
    }
  },
  { timestamps: true },
);


=======
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
>>>>>>> 623a52a1c719b555a9acecfb5d31268b08cc7ed5
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

<<<<<<< HEAD
coachModel.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
=======
// Logic for Login and Register flows
coachModel.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: this.role }, // Added role to token payload
    process.env.JWT_SECRET || 'fallback_secret', // Always have a fallback for hackathons
>>>>>>> 623a52a1c719b555a9acecfb5d31268b08cc7ed5
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
<<<<<<< HEAD
export default Coach;
=======
export default Coach;
>>>>>>> 623a52a1c719b555a9acecfb5d31268b08cc7ed5
