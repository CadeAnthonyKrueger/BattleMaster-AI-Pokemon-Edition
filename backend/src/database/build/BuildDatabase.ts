import { db } from "../db";
import { abilityData } from "./data_preparation/AbilityPreparation";
import { moveData } from "./data_preparation/MovePreparation";
import { trainerData } from "./data_preparation/TrainerPreparation";
import { typeData, typeEffectivenessData } from "./data_preparation/TypePreparation";

db.prepare(`PRAGMA foreign_keys = ON;`).run();

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

db.prepare(`DELETE FROM trainers`).run();
db.prepare(`DELETE FROM sqlite_sequence WHERE name='trainers'`).run();

trainerData.forEach((row) => {
    db.prepare(`
        INSERT INTO trainers (name, description, player_trainer, image, color) 
        VALUES (?, ?, ?, ?, ?)
    `).run(row.name, row.description, row.player_trainer ? 1 : 0, row.image, row.color);
});

// Ability table
db.prepare(`
    CREATE TABLE IF NOT EXISTS abilities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
    );
`).run();

db.prepare(`DELETE FROM abilities`).run();
db.prepare(`DELETE FROM sqlite_sequence WHERE name='abilities'`).run();

abilityData.forEach((row) => {
    db.prepare(`
        INSERT INTO abilities (name, description) 
        VALUES (?, ?)
    `).run(row.name, row.description);
});

// Type table
db.prepare(`
    CREATE TABLE IF NOT EXISTS types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon_position INTEGER
    );
`).run();

db.prepare(`DELETE FROM types`).run();
db.prepare(`DELETE FROM sqlite_sequence WHERE name='types'`).run();

typeData.forEach((row) => {
    db.prepare(`
        INSERT INTO types (name, icon_position) 
        VALUES (?, ?)
    `).run(row.name, row.icon_position);
});

// Type Effectiveness table
db.prepare(`
    CREATE TABLE IF NOT EXISTS type_effectiveness (
        type_id INTEGER,
        weakness INTEGER,
        resistance INTEGER,
        immunity INTEGER,
        FOREIGN KEY (type_id) REFERENCES types(id) ON DELETE CASCADE
    );
`).run();

db.prepare(`DELETE FROM type_effectiveness`).run();
db.prepare(`DELETE FROM sqlite_sequence WHERE name='type_effectiveness'`).run();

typeEffectivenessData.forEach((row) => {
    db.prepare(`
        INSERT INTO type_effectiveness (type_id, weakness, resistance, immunity) 
        VALUES (?, ?, ?, ?)
    `).run(row.type_id, row.weakness, row.resistance, row.immunity);
});

// Move table
db.prepare(`
    CREATE TABLE IF NOT EXISTS moves (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type_id INTEGER,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT,
        power INTEGER,
        accuracy INTEGER,
        pp INTEGER,
        FOREIGN KEY (type_id) REFERENCES types(id) ON DELETE CASCADE
    );
`).run();

db.prepare(`DELETE FROM moves`).run();
db.prepare(`DELETE FROM sqlite_sequence WHERE name='moves'`).run();

moveData.forEach((row) => {
    db.prepare(`
        INSERT INTO moves (type_id, name, description, category, power, accuracy, pp) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(row.type_id, row.name, row.description, row.category, row.power, row.accuracy, row.pp);
});

