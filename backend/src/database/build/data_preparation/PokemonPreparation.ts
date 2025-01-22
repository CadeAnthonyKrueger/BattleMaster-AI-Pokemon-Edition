import * as fs from 'fs';
import * as path from 'path';
import { PokemonSchema } from '../../../models/PokemonModel';
import { StatSchema } from '../../../models/StatModel';


export const pokemonDataUncleaned: { name: string, types: string[], stats: number[], genderRatio: string, abilities: string[], hiddenAbilities: string[], moves: string[], tutorMoves: string[], eggMoves: string[], height: number, weight: number, color: string, category: string, pokedex_entry: string, evolutions: string, flags: string, image: string }[] = [];

// Path to the text file
const filePath = path.resolve(__dirname, '../../../../Pokemon Essentials v21.1 2023-07-30/PBS/pokemon.txt');

// Function to parse the file
function parseFile(filePath: string): void {
  // Read the file asynchronously
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Process the file contents
    console.log('File contents:', data);

    // Example: Split lines
    const lines = data.split('\n');
    console.log('Parsed lines:', lines);

    // Example: Further processing (e.g., extracting specific patterns)
    lines.forEach((line, index) => {
      console.log(`Line ${index + 1}: ${line.trim()}`);
    });
  });
}

// Call the function
parseFile(filePath);
