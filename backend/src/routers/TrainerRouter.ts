import express from "express"
import { GetAll, GetBySize } from "../controllers/TrainerController";

const router = express.Router();

router.get("/getAll", GetAll);

router.get("/getBySize/:limit/:minId", GetBySize);

export default router;