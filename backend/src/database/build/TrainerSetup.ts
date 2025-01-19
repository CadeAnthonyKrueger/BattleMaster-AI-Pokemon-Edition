//import { db } from "../db"
import { listFilesInFolder } from "./helpers/listFilesInFolder";

// db.prepare(`
//     CREATE TABLE IF NOT EXISTS trainers (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         description TEXT,
//         player_trainer INTEGER,
//         image TEXT,
//         color TEXT
//     );
// `).run();

// This could be semi-automated using the trainer class names and doing some webscraping on bulbapedia,
// but this will work for now. That's only if we decide to add more trainer sprites.
const trainerNames = [
    'Anna', 'Beth', 'Eli', 'Luke', 'Noah', 'Jack', 'Ryan', 'Sam', 
    'Blue', 'Clara', 'Ethan & Mia', 'Daisy', 'Max', 'Ella', 'Jason & Rose', 
    'Liam', 'Jake', 'Owen', 'Nate', 'Tyler', 'Leo', 'Jude', 
    'Grace', 'Megan', 'Sophia', 'Emma', 'Zane', 'Holly', 'Chloe', 'Adam', 
    'Oak', 'Sarah', 'Evan', 'Blue', 'Blue', 'Kyle', 'Aaron', 'Toby', 
    'Dylan', 'Eric', 'Joel', 'Emma & Alex', 'Ian', 'Paige', 'Cole', 
    'Ivy', 'Shawn', 'Vince', 'Grunt', 'Grunt', 'Maya', 'Wyatt', 'Lila', 
    'Drew', 'Ruby', 'Clara & Ethan', 'Miles'
];

const imagePaths = listFilesInFolder("./backend/Pokemon Essentials v21.1 2023-07-30/Graphics/Trainers");
console.log(imagePaths);


