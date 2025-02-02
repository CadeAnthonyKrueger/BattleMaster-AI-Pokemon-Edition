import express from "express"
import { GetAll, Get } from "../controllers/TrainerController";

const router = express.Router();

router.get("/getAll", GetAll);

router.post("/get", Get);

export default router;