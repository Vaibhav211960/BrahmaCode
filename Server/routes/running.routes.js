import express from "express";
import {
  createRunningTest,
  getRunningWeakness,
  getRunningInjuryRisk,
  getRunningScore,
} from "../controllers/running.controller.js";

const router = express.Router();

// Matches frontend: axios.post(".../api/athlete/running-test")
router.post("/create", createRunningTest); 

// Athlete-specific data retrieval
router.get("/weakness/:athleteId", getRunningWeakness);
router.get("/injury-risk/:athleteId", getRunningInjuryRisk);
router.get("/score/:athleteId", getRunningScore);

export default router;