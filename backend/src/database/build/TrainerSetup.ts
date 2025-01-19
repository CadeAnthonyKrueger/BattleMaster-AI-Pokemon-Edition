import { db } from "../db"

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

