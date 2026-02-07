import express from "express";
const router = express.Router();
import { body } from "express-validator";
<<<<<<< HEAD
import { register, loginAthlete, resetPassword } from "../controllers/athlete.controller.js";
=======
import { sendotp, verifyOtp, verifyOtpAndCompleteRegistration, loginAthlete, resendOtp, resetPassword } from "../controllers/athlete.controller.js";
>>>>>>> 623a52a1c719b555a9acecfb5d31268b08cc7ed5

router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email address"),
<<<<<<< HEAD
=======
  sendotp,
);

router.post(
  "/verify-otp",
  body("email").isEmail().withMessage("Invalid email address"),
  body("otp").notEmpty().withMessage("OTP is required"),
>>>>>>> 623a52a1c719b555a9acecfb5d31268b08cc7ed5
  body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
<<<<<<< HEAD
  register,
=======
  verifyOtpAndCompleteRegistration,
>>>>>>> 623a52a1c719b555a9acecfb5d31268b08cc7ed5
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  loginAthlete,
);

router.post(
<<<<<<< HEAD
=======
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
>>>>>>> 623a52a1c719b555a9acecfb5d31268b08cc7ed5
  "/reset-password",
  body("email").isEmail().withMessage("Invalid email address"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  resetPassword,
);

export default router;
