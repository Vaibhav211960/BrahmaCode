import mongoose from "mongoose";

const coachModel = mongoose.Schema(
  {
    name: {
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
    },
    level: {
        type: "String",
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

coachModel.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
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
