import { db } from "../db"

db.prepare(`
    CREATE TABLE IF NOT EXISTS trainers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        image TEXT
    );
`).run();

// Create any other necessary tables
db.prepare(`
    CREATE TABLE IF NOT EXISTS pokemon (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        health INTEGER NOT NULL
    );
`).run();

// Add initial data (optional)
const insertTrainer = db.prepare(`
    INSERT INTO trainers (name, description, image)
    VALUES (?, ?, ?)
`);
insertTrainer.run('Ash Ketchum', 'A skilled Pokémon trainer', 'ash-image.png');

// More initialization code for other tables or data...

console.log("Database setup complete!");