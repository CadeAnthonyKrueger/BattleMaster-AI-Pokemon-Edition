import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Define the static folder for serving images
const trainersFolder = path.join(__dirname, '../Pokemon Essentials v21.1 2023-07-30/Graphics/Trainers');
app.use(express.static(trainersFolder)); // Now, images will be accessible directly

// Example route to verify server is running
app.get('/', (req, res) => {
  res.send('Server is running! Access images directly by their filename, e.g., http://localhost:3001/g.png');
});

//app.use('/images', express.static(path.join(__dirname, 'public/images')));


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
