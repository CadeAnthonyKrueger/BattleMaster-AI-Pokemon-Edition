import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

export const db = new Database('./database/database.db', { verbose: console.log });

// // Example route to get all trainers
// app.get('/trainers', (req, res) => {
//   try {
//     const stmt = db.prepare('SELECT * FROM trainers');
//     const trainers = stmt.all();
//     res.json(trainers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Example route to get a specific trainer by ID
// app.get('/trainers/:id', (req, res) => {
//   const { id } = req.params;
//   try {
//     const stmt = db.prepare('SELECT * FROM trainers WHERE id = ?');
//     const trainer = stmt.get(id);
//     if (trainer) {
//       res.json(trainer);
//     } else {
//       res.status(404).json({ error: 'Trainer not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Example route to insert a new trainer
// app.post('/trainers', (req, res) => {
//   const { name, description, image } = req.body;
//   try {
//     const stmt = db.prepare('INSERT INTO trainers (name, description, image) VALUES (?, ?, ?)');
//     const result = stmt.run(name, description, image);
//     res.status(201).json({ id: result.lastInsertRowid });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
