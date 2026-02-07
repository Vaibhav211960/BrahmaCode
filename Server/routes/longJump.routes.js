import express from "express"

import {
    createLongJumpTest,
    getLongJumpInjuryRisk,
    getLongJumpScore,
    getLongJumpWeakness
} from "../controllers/longJump.controller"

router.post("/longjump/create", createLongJumpTest);
router.get("/longjump/weakness/:athleteId", getLongJumpWeakness);
router.get("/longjump/injury-risk/:athleteId", getLongJumpInjuryRisk);
router.get("/get/:athleteId", getLongJumpScore);