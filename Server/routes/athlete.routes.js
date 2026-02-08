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
  getAthleteById,
} from "../controllers/athlete.controller.js";

import athleteMiddleware from "../middleware/athlete.middleware.js";
=======
import { register, loginAthlete, resetPassword , getAllAthletes } from "../controllers/athlete.controller.js";
import athleteMiddleware from "../middleware/athlete.middleware.js";
// import { handleCoachInvitation, getAllInvitations } from "../controllers/invitation.controller.js";
>>>>>>> a96a4ca4eff7cefa461723750f71ce87ffa21b08

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
>>>>>>> a96a4ca4eff7cefa461723750f71ce87ffa21b08
  body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
<<<<<<< HEAD
  verifyOtpAndCompleteRegistration,
=======
  register,
>>>>>>> a96a4ca4eff7cefa461723750f71ce87ffa21b08
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
>>>>>>> a96a4ca4eff7cefa461723750f71ce87ffa21b08
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

router.get("/:athleteId", getAthleteById);


export default router;
=======
// router.post("/invitations", athleteMiddleware, getAllInvitations);
router.get("/all", getAllAthletes);
export default router;

>>>>>>> a96a4ca4eff7cefa461723750f71ce87ffa21b08
