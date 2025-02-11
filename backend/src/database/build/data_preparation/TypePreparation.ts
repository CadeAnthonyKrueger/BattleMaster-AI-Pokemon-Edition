import fs from "fs";
import path from "path";
import { Type } from "../../../models/TypeModel";
import { parseData } from "./utilities/DataParser";

interface TypeEffectiveness {
    type_id: number;
    weakness: number;
    resistance: number;
    immunity: number;
}

const statement = (key: string, value: string, row: Partial<any>) => {
    switch (key) {
        case 'Name': row.name = value; break;
        case 'IconPosition': row.icon_position = parseInt(value); break;
    }
}

export const typeData: Type[] = parseData('types.txt', statement);
export let typeEffectivenessData: TypeEffectiveness[] = [];

function getTypeEffectiveness(typeData: Type[], effectivenessData: string): TypeEffectiveness[] {
    const typeEffectiveness: TypeEffectiveness[] = [];

    // A helper function to map type names to their ids
    const getTypeId = (typeName: string): number => {
        const type = typeData.find(t => t.name.toUpperCase() === typeName.toUpperCase());
        return type ? type.id : -1; // -1 if type not found
    };

    const lines = effectivenessData.split('\n');
    let currentTypeName = '';
    let weaknesses: string[] = [];
    let resistances: string[] = [];
    let immunities: string[] = [];

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('[') && line.endsWith(']')) {
            // New type block begins (e.g., [NORMAL])
            if (currentTypeName) {
                const typeId = getTypeId(currentTypeName);
                if (typeId !== -1) {
                    // Add weaknesses, resistances, and immunities for the current type
                    weaknesses.forEach(weakness => {
                        const weaknessId = getTypeId(weakness);
                        if (weaknessId !== -1) {
                            typeEffectiveness.push({ type_id: typeId, weakness: weaknessId, resistance: 0, immunity: 0 });
                        }
                    });
                    resistances.forEach(resistance => {
                        const resistanceId = getTypeId(resistance);
                        if (resistanceId !== -1) {
                            typeEffectiveness.push({ type_id: typeId, weakness: 0, resistance: resistanceId, immunity: 0 });
                        }
                    });
                    immunities.forEach(immunity => {
                        const immunityId = getTypeId(immunity);
                        if (immunityId !== -1) {
                            typeEffectiveness.push({ type_id: typeId, weakness: 0, resistance: 0, immunity: immunityId });
                        }
                    });
                }
            }

            // Update for the new type block
            currentTypeName = line.replace('[', '').replace(']', '').trim();
            weaknesses = [];
            resistances = [];
            immunities = [];
        } else if (line.startsWith('Weaknesses =')) {
            weaknesses = line.replace('Weaknesses = ', '').split(',').map(w => w.trim());
        } else if (line.startsWith('Resistances =')) {
            resistances = line.replace('Resistances = ', '').split(',').map(r => r.trim());
        } else if (line.startsWith('Immunities =')) {
            immunities = line.replace('Immunities = ', '').split(',').map(i => i.trim());
        }
    });

    // Handle the last type block after loop ends
    if (currentTypeName) {
        const typeId = getTypeId(currentTypeName);
        if (typeId !== -1) {
            weaknesses.forEach(weakness => {
                const weaknessId = getTypeId(weakness);
                if (weaknessId !== -1) {
                    typeEffectiveness.push({ type_id: typeId, weakness: weaknessId, resistance: 0, immunity: 0 });
                }
            });
            resistances.forEach(resistance => {
                const resistanceId = getTypeId(resistance);
                if (resistanceId !== -1) {
                    typeEffectiveness.push({ type_id: typeId, weakness: 0, resistance: resistanceId, immunity: 0 });
                }
            });
            immunities.forEach(immunity => {
                const immunityId = getTypeId(immunity);
                if (immunityId !== -1) {
                    typeEffectiveness.push({ type_id: typeId, weakness: 0, resistance: 0, immunity: immunityId });
                }
            });
        }
    }

    return typeEffectiveness;
}

const filePath = path.join(__dirname, "../../../../Pokemon Essentials v21.1 2023-07-30/PBS/types.txt");
const fileData = fs.readFileSync(filePath, "utf-8");
typeEffectivenessData = getTypeEffectiveness(typeData, fileData);