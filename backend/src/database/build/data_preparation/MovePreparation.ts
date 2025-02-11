import { Move } from "../../../models/MoveModel";
import { typeData } from "./TypePreparation";
import { parseData } from "./utilities/DataParser";

const getTypeId = (value: string) => {
    for (let type of typeData) {
        if (value.toLowerCase() === type.name.toLowerCase()) {
            return type.id;
        }
    }
    return 0;
}

const statement = (key: string, value: string, row: Partial<any>) => {
    switch (key) {
        case 'Name': row.name = value; break;
        case 'Type': row.type_id = getTypeId(value); break;
        case 'Category': row.category = value; break;
        case 'Power': row.power = parseInt(value, 10) || 0; break;
        case 'Accuracy': row.accuracy = parseInt(value, 10) || 0; break;
        case 'TotalPP': row.pp = parseInt(value, 10) || 0; break;
        case 'Description': row.description = value; break;
    }
}

export const moveData: Move[] = parseData('moves.txt', statement);