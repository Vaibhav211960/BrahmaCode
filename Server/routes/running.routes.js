import express from "express";
import {
  createRunningTest,
  getRunningWeakness,
  getRunningInjuryRisk,
  getRunningScore,
} from "../controllers/running.controller.js";

const router = express.Router();

router.post("/running/create", createRunningTest);
router.get("/running-test/weakness/:athleteId", getRunningWeakness);
router.get("/running-test/injury-risk/:athleteId", getRunningInjuryRisk);
router.get("/get/:athleteId", getRunningScore);

export default router;
