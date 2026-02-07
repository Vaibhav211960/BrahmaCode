import express from "express";
const router = express.Router();

import {
  createRelayTest,
  // getRelayInjuryRisk,
  getRelayScore,
  getRelayWeakness,
} from "../controllers/relay.controller.js";

router.post("/create", createRelayTest);
router.get("/relay/weakness/:athleteId", getRelayWeakness);
// router.get("/relay/injury-risk/:athleteId", getRelayInjuryRisk);
router.get("/get/:athleteId", getRelayScore);


export default router;