import Database from "better-sqlite3";

export const db = new Database('./src/database/database.db', { verbose: console.log });