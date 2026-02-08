import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { register, loginAthlete, resetPassword , getAllAthletes, profile, getAthleteById } from "../controllers/athlete.controller.js";
import athleteMiddleware from "../middleware/athlete.middleware.js";
// import { handleCoachInvitation, getAllInvitations } from "../controllers/invitation.controller.js";

router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email address"),
  body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  register,
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
  "/reset-password",
  body("email").isEmail().withMessage("Invalid email address"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  resetPassword,
);

router.get("/profile", athleteMiddleware, profile);

router.get("/all", getAllAthletes);

router.get("/:athleteId", getAthleteById);

// router.post("/manage-invitation", athleteMiddleware, handleCoachInvitation);

// router.post("/invitations", athleteMiddleware, getAllInvitations);
router.get("/all", getAllAthletes);
export default router;

