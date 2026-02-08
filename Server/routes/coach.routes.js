import express from "express"
const router = express.Router()
import {body} from "express-validator"
import { register, loginCoach, resetPassword, profile, updateProfile, sendInvitationToAthlete, removeDisciple } from "../controllers/coach.controller.js"
import coachMiddleware from "../middleware/coach.middleware.js"

router.post("/register",
  body("email").isEmail().withMessage("Invalid email address"),
  body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  register
);

router.post("/login",
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    loginCoach
);

router.post("/reset-password",
  body("email").isEmail().withMessage("Invalid email address"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  resetPassword,
);

router.get("/profile", coachMiddleware, profile);

router.put("/profile", coachMiddleware, updateProfile);

router.put("/add-athlete", coachMiddleware, body("email").isEmail().withMessage("Invalid email address"), sendInvitationToAthlete);

router.put("/disciple/remove", coachMiddleware, removeDisciple);

export default router;
