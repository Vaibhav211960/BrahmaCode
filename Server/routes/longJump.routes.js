import express from "express"
const router = express.Router()


import {
    createLongJumpTest,
    // getLongJumpInjuryRisk,
    getLongJumpScore,
    getLongJumpWeakness
} from "../controllers/longJump.controller.js"

router.post("/create", createLongJumpTest);
router.get("/longjump/weakness/:athleteId", getLongJumpWeakness);
// router.get("/longjump/injury-risk/:athleteId", getLongJumpInjuryRisk);
router.get("/get/:athleteId", getLongJumpScore);

export default router;