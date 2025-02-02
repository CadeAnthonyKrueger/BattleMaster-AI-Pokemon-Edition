import { Request, Response } from "express"
import { Trainer, TrainerSchema } from "../models/TrainerModel";
import { db } from "../database/db";

export const GetById = (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const schemaId = TrainerSchema.schema.id;
        if (!schemaId.validator(id)) { res.status(400).json({ error: schemaId.message }); }
        const result: Trainer = db.prepare("SELECT * FROM trainers WHERE id = ?").all(id)[0] as Trainer;
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(406).send(error);
    }
};

interface GetParams {
    field?: string;
    asc?: boolean;
    limit?: number;
    exclude?: number[];
    lastElement?: any;
    returnWithSize?: boolean;
}

// Example params:
// {
//     "field": "id",
//     "asc": true,
//     "limit": 12,
//     "exclude": [1],
//     "lastElement": 1,
//     "returnWithSize": true
// }

export const Get = (req: Request, res: Response) => {
    try {
        const params: GetParams = req.body;
        let query = "SELECT * FROM trainers";
        const sqlParams = [];
        //console.log(params);

        const field = params.field ? params.field : 'id';
        const exclude = params.exclude ? params.exclude : [];
        const lastElement = params.lastElement ? params.lastElement : null;
        const asc = params.asc === false ? false : true;
        const limit = params.limit ? params.limit : -1;

        // Verify field
        let fieldValid = false;
        if (typeof field !== "string" || !(TrainerSchema.keys().includes(field as keyof Trainer))) {
            res.status(400).json({ error: "Invalid field parameter" });
        } else {
            fieldValid = true;
        }

        // Verify exclude
        let excludeValid = false;
        if (exclude && !Array.isArray(exclude)) {
            res.status(400).json({ error: "Exclude parameter must be an array of numbers" });
        } else if (exclude && exclude.length > 0) {
            excludeValid = true;
            sqlParams.push(...exclude);
            const placeholders = (exclude)?.map(() => "?").join(", ");
            query += ` WHERE id NOT IN (${placeholders})`;
        }

        // Verify lastElement
        if (lastElement !== null && (typeof lastElement !== TrainerSchema.types()[field as keyof Trainer])) {
            res.status(400).json({ error: "Invalid last element. Must match field type" });
        } else if (lastElement !== null) {
            sqlParams.push(lastElement);
            query += ` ${excludeValid ? 'AND' : 'WHERE'} ${field} ${asc ? '>' : '<'} ?`;
            if (typeof field === 'string') { query += ' COLLATE NOCASE' }
        }

        // Add field to query if valid
        if (fieldValid) { query += ` ORDER BY ${field}`; }

        // Verify asc
        console.log(asc)
        if (typeof asc !== "boolean") {
            res.status(400).json({ error: "Invalid asc parameter" });
        } else {
            query += ` ${asc ? 'ASC' : 'DESC'}`;
        }

        // Verify limit
        if (typeof limit !== "number") {
            res.status(400).json({ error: "Invalid limit parameter" });
        } else if (limit >= 0) {
            sqlParams.push(limit);
            query += " LIMIT ?";
        }

        // If return with size
        const returnWithSize = params.returnWithSize ? params.returnWithSize : false;
        let totalRecords = returnWithSize ? db.prepare("SELECT COUNT(*) as count FROM trainers").get() as { count: number } : null;

        //console.log(query);
        const result = db.prepare(query).all(...sqlParams);
        if (totalRecords) result.push(totalRecords.count);
        //console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

