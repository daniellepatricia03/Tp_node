import express from "express";
import {
    createChallenge,
    getAllChallenges,
    validateChallenge
} from "../controllers/challenges.controller.js";

const router = express.Router();

router.post("/", createChallenge);
router.get("/", getAllChallenges);

//  validation d’un défi   //
router.post("/:id/validate", validateChallenge);

export default router;