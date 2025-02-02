import { Request, Response } from "express"
import { TrainerModel } from "../models/TrainerModel";
import { db } from "../database/db";

export const GetAll = (req: Request, res: Response) => {
    try {
        const result: TrainerModel = db.prepare("SELECT * FROM trainers").all();
        res.status(200).json(result);
    } catch (error) {
        res.status(406).send(error);
    }
};

export const GetBySize = (req: Request, res: Response) => {
    try {
        const { limit, minId } = { limit: parseInt(req.params.limit, 10), minId: parseInt(req.params.minId, 10) };
        console.log(limit)
        if (isNaN(limit) || limit <= 0) {
            res.status(400).json({ error: "Invalid limit parameter" });
        }
        const stmt = db.prepare("SELECT * FROM trainers WHERE id > ? LIMIT ?");
        const result = stmt.all(minId, limit);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};