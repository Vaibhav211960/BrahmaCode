<<<<<<< HEAD
import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  register,
  loginCoach,
  resetPassword,
  profile,
} from "../controllers/coach.controller.js";
import coachMiddleware from "../middleware/coach.middleware.js";

router.post(
  "/register",
=======
import express from "express"
const router = express.Router()
import {body} from "express-validator"
import { register, loginCoach, resetPassword} from "../controllers/coach.controller.js"

router.post("/register",
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f
  body("email").isEmail().withMessage("Invalid email address"),
  body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
<<<<<<< HEAD
  register,
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
  "/reset-password",
=======
  register
);

router.post("/login",
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    loginCoach
);

router.post("/reset-password",
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f
  body("email").isEmail().withMessage("Invalid email address"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  resetPassword,
);

<<<<<<< HEAD
router.get("/profile", coachMiddleware, profile);

=======
>>>>>>> e1938560640e15bcca276e097a013aebb40d4e4f
// router.put("/add-athlete", coachMiddleware, sendInvitationToAthlete);

// router.put("/disciple/remove", removeDisciple);

export default router;
