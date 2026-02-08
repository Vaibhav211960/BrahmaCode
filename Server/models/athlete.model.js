import mongoose from "mongoose";
<<<<<<< HEAD
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
=======
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
>>>>>>> a96a4ca4eff7cefa461723750f71ce87ffa21b08

const athleteModel = new mongoose.Schema(
  {
    name: {
<<<<<<< HEAD
      type: String
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "athlete",
=======
      type: String,
      required: true,
    },
    email: {
      type: String,
      requried: true,
>>>>>>> a96a4ca4eff7cefa461723750f71ce87ffa21b08
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
<<<<<<< HEAD
=======
    height: {
      type: Number,
    },
    weight: {
      type: Number
    },
    age: {
      type: Number
    }
>>>>>>> a96a4ca4eff7cefa461723750f71ce87ffa21b08
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