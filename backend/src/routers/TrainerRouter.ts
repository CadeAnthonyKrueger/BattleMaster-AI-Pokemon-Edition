import express from "express"
import { GetAll } from "../controllers/TrainerController";

const router = express.Router();

router.get("/getAll", GetAll);

export default router;