import express from "express"
import { GetById, Get } from "../controllers/TrainerController";

const router = express.Router();

router.get("/getById/:id", GetById);

router.post("/get", Get);

export default router;