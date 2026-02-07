import express from "express";
const router = express.Router();

import passport from "passport";
import jwt from "jsonwebtoken";

import Athlete from "../models/athlete.model";
import Coach from "../models/coach.model";

// const authMiddleware = require("../middlewares/auth.middleware");

router.get("/google", (req, res, next) => {
  const type = req.query.type;
  if (type === "athlete" || type === "coach") {
    res.cookie("userType", type);
  } else {
    res.cookie("userType", type);
  }

  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/login`,
  }),
  async (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: req.cookies.userType },
      process.env.JWT_SECRET.trim(),
      { expiresIn: "7d" },
    );

    const redirectUrl = `${process.env.FRONTEND_URL}/${redirection}?token=${token}&email=${user.email}`;
    res.redirect(redirectUrl);
  },
);

router.get("/me", authMiddleware.authUser, async (req, res) => {
  try {
    const userId = req.user?._id;
    
    const user =
      (await customerModel.findById(userId).select("-password")) ||
      (await chefModel.findById(userId).select("-password"));

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
