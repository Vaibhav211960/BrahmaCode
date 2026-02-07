import express from "express";
const router = express.Router();
import { body } from "express-validator";
<<<<<<< HEAD
import {
  sendotp,
  verifyOtp,
  verifyOtpAndCompleteRegistration,
  loginAthlete,
  resendOtp,
  resetPassword,
  getAllInvitations,
  getAllAthletes,
  handleCoachInvitation,
} from "../controllers/athlete.controller.js";

import athleteMiddleware from "../middleware/athlete.middleware.js";
=======
import { register, loginAthlete, resetPassword } from "../controllers/athlete.controller.js";
>>>>>>> 4085d9d21c0de8746ad4548fe4fc682ed816d859

router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email address"),
<<<<<<< HEAD
  sendotp,
);

router.post(
  "/verify-otp",
  body("email").isEmail().withMessage("Invalid email address"),
  body("otp").notEmpty().withMessage("OTP is required"),
=======
>>>>>>> 4085d9d21c0de8746ad4548fe4fc682ed816d859
  body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
<<<<<<< HEAD
  verifyOtpAndCompleteRegistration,
=======
  register,
>>>>>>> 4085d9d21c0de8746ad4548fe4fc682ed816d859
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
=======
>>>>>>> 4085d9d21c0de8746ad4548fe4fc682ed816d859
  "/reset-password",
  body("email").isEmail().withMessage("Invalid email address"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  resetPassword,
);

router.post("/manage-invitation", athleteMiddleware, handleCoachInvitation);

router.post("/invitations", athleteMiddleware, getAllInvitations);
export default router;

router.get("/all", getAllAthletes);
