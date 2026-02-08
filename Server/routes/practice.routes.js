import express from "express"
import { createPractice, getPractices } from "../controllers/practice.controller.js"
const router = express.Router()

router.post("/create", createPractice)
router.get("/get", getPractices)

export default router