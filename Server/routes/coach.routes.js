<<<<<<< HEAD
import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  loginCoach,
  resetPassword,
  removeDisciple,
  sendInvitationToAthlete,
  register,
  profile,
} from "../controllers/coach.controller.js";

import coachMiddleware from "../middleware/coach.middleware.js";

router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email address"),
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
import express from "express"
const router = express.Router()
import {body} from "express-validator"
import { register, loginCoach, resetPassword} from "../controllers/coach.controller.js"

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
>>>>>>> 2ded9c3b101655f5ee7108280bc6335775ec67f9
  body("email").isEmail().withMessage("Invalid email address"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  resetPassword,
);

// router.put("/add-athlete", coachMiddleware, sendInvitationToAthlete);

<<<<<<< HEAD
router.get("/profile", coachMiddleware, profile);

router.put("/disciple/remove", removeDisciple);
=======
// router.put("/disciple/remove", removeDisciple);
>>>>>>> 2ded9c3b101655f5ee7108280bc6335775ec67f9

export default router;
