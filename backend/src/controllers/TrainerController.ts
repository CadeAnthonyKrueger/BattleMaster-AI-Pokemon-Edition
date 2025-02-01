import { Request, Response } from "express"
import { TrainerModel } from "../models/TrainerModel";
import { db } from "../database/db";

export const GetAll = (req: Request, res: Response) => {
    try {
        const result: TrainerModel = db.prepare("SELECT * FROM trainers").all();
        //console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(406).send(error);
    }
};