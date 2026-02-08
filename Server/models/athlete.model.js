import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const athleteModel = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "athlete",
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    sport: {
      type: String,
      required: true,
    },
    history: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AthleteHistory",
    },
  },
  { timestamps: true },
);

athleteModel.pre("validate", function (next) {
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
      }),
    );
    return next(err);
  }
  next();
});

athleteModel.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );
  return token;
};

athleteModel.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

athleteModel.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

const Athlete = mongoose.model("Athlete", athleteModel);
export default Athlete;