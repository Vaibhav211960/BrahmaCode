import express from "express";
const router = express.Router();
import { createYoloTest, compareWithSameSportAthletes, getYoloTests } from "../controllers/yoloTest.controller.js";
import athleteMiddleware from "../middleware/athlete.middleware.js";

// Create a new YOLO test record
router.post("/create", athleteMiddleware, createYoloTest);

// Compare athlete with same sport peers
router.get("/compare/:athleteId", compareWithSameSportAthletes);

// Get YOLO tests for an athlete
router.get("/get/:athleteId", getYoloTests);

export default router;