import express from "express";
import {
  createJevelineTest,
  getJevelineInjuryRisk,
  getJevelineScore,
  getJevelineWeakness,
} from "../controllers/jeveline.controller";
const router = express.Router();

router.post("/jeveline/create", createJevelineTest);
router.get("/jeveline/weakness/:athleteId", getJevelineWeakness);
router.get("/jeveline/injury-risk/:athleteId", getJevelineInjuryRisk);
router.get("/get/:athleteId", getJevelineScore);

export default router;
