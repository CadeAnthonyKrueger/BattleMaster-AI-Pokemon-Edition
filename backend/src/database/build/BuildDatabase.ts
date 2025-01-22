import { db } from "../db";
import { trainerData } from "./data_preparation/TrainerPreparation";


// Trainer table
db.prepare(`
    CREATE TABLE IF NOT EXISTS trainers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        player_trainer INTEGER,
        image TEXT,
        color TEXT
    );
`).run();

trainerData.forEach((row) => {
    db.prepare(`
        INSERT INTO trainers (name, description, player_trainer, image, color) 
        VALUES (?, ?, ?, ?, ?)
    `).run(row.name, row.description, row.player_trainer ? 1 : 0, row.image, row.color);
});