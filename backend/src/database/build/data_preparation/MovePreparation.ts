import fs from "fs";
import path from "path";
import { typeData } from "./TypePreparation";

interface Move {
    id: number;
    type_id?: number;
    name: string;
    description: string;
    category: string;
    power: number;
    accuracy: number;
    pp: number;
}

export let moveData: Move[];

function parseMoveData(text: string): Move[] {
    const moves: Move[] = [];
    const blocks = text.split('#-------------------------------');
    let idCounter = 1;

    for (const block of blocks) {
        const lines = block.trim().split('\n');
        if (lines.length < 2) continue;

        const idMatch = lines[0].match(/\[(.*)\]/);
        if (!idMatch) continue;

        const move: Partial<Move> = { id: idCounter++ };

        for (const line of lines.slice(1)) {
            const [key, value] = line.split('=').map(s => s.trim());
            if (!key || !value) continue;

            switch (key) {
                case 'Name': move.name = value; break;
                case 'Type': move.type_id = getTypeId(value); break;
                case 'Category': move.category = value; break;
                case 'Power': move.power = parseInt(value, 10) || 0; break;
                case 'Accuracy': move.accuracy = parseInt(value, 10) || 0; break;
                case 'TotalPP': move.pp = parseInt(value, 10) || 0; break;
                case 'Description': move.description = value; break;
            }
        }

        if (move.id && move.name && move.description && move.category !== undefined) {
            moves.push(move as Move);
        }
    }

    return moves;
}

const getTypeId = (value: string) => {
    for (let type of typeData) {
        if (value.toLowerCase() === type.name.toLowerCase()) {
            return type.id;
        }
    }
    return 0;
}

const filePath = path.join(__dirname, "../../../../Pokemon Essentials v21.1 2023-07-30/PBS/moves.txt");
const fileData = fs.readFileSync(filePath, "utf-8");
moveData = parseMoveData(fileData);

