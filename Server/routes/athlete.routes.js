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
  profile,
} from "../controllers/athlete.controller.js";

import athleteMiddleware from "../middleware/athlete.middleware.js";
=======
import { register, loginAthlete, resetPassword , getAllAthletes } from "../controllers/athlete.controller.js";
import athleteMiddleware from "../middleware/athlete.middleware.js";
// import { handleCoachInvitation, getAllInvitations } from "../controllers/invitation.controller.js";
>>>>>>> 2ded9c3b101655f5ee7108280bc6335775ec67f9

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
>>>>>>> 2ded9c3b101655f5ee7108280bc6335775ec67f9
  body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
<<<<<<< HEAD
  verifyOtpAndCompleteRegistration,
=======
  register,
>>>>>>> 2ded9c3b101655f5ee7108280bc6335775ec67f9
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
>>>>>>> 2ded9c3b101655f5ee7108280bc6335775ec67f9
  "/reset-password",
  body("email").isEmail().withMessage("Invalid email address"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  resetPassword,
);

// router.post("/manage-invitation", athleteMiddleware, handleCoachInvitation);

<<<<<<< HEAD
router.post("/invitations", athleteMiddleware, getAllInvitations);

router.get("/profile", athleteMiddleware, profile);

router.get("/all", getAllAthletes);


export default router;
=======
// router.post("/invitations", athleteMiddleware, getAllInvitations);
router.get("/all", getAllAthletes);
export default router;

>>>>>>> 2ded9c3b101655f5ee7108280bc6335775ec67f9
