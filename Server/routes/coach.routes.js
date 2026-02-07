import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  sendotp,
  verifyOtpAndCompleteRegistration,
  loginCoach,
  resendOtp,
  verifyOtp,
  resetPassword,
  removeDisciple,
  sendInvitationToAthlete,
} from "../controllers/coach.controller.js";

import coachMiddleware from "../middleware/coach.middleware.js";

router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email address"),
  sendotp,
);

router.post(
  "/verify-otp",
  body("email").isEmail().withMessage("Invalid email address"),
  body("otp").notEmpty().withMessage("OTP is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  verifyOtpAndCompleteRegistration,
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  loginCoach,
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Invalid email address"),
  resendOtp,
);

router.post(
  "/resend-otp",
  body("email").isEmail().withMessage("Invalid email address"),
  resendOtp,
);

router.post(
  "/verify-otp-for-reset",
  body("email").isEmail().withMessage("Invalid email address"),
  body("otp").notEmpty().withMessage("OTP is required"),
  verifyOtp,
);

router.post(
  "/reset-password",
  body("email").isEmail().withMessage("Invalid email address"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  resetPassword,
);

router.put("/add-athlete", coachMiddleware, sendInvitationToAthlete);

router.put("/disciple/remove", removeDisciple);

export default router;
