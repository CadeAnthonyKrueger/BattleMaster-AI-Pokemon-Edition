import { Type } from "../../../models/TypeModel";
import { parseData } from "./utilities/DataParser";
import { TypeEffectiveness } from "../../../models/TypeEffectivenessModel";

interface TypeRaw {
    id: number;
    name: string;
    icon_position: number;
    weaknesses?: string[];
    resistances?: string[];
    immunities?: string[];
}

const statement = (key: string, value: string, row: Partial<any>) => {
    switch (key) {
        case 'Name': row.name = value; break;
        case 'IconPosition': row.icon_position = parseInt(value); break;
        case 'Weaknesses': row.weaknesses = value.split(','); break;
        case 'Resistances': row.resistances = value.split(','); break;
        case 'Immunities': row.immunities = value.split(','); break;
    }
}

export const typeDataRaw: TypeRaw[] = parseData('types.txt', statement);
export const typeData: Type[] = typeDataRaw.map((v: TypeRaw) => { return { id: v.id, name: v.name, icon_position: v.icon_position }; });
export const typeEffectivenessData: TypeEffectiveness[] = [];

typeDataRaw.forEach((value: TypeRaw) => {
    const getTypeId = (typeName: string): number => {
        const type = typeData.find(t => t.name.toUpperCase() === typeName.toUpperCase());
        return type ? type.id : -1; // -1 if type not found
    };

    if (value.weaknesses) {
        value.weaknesses.forEach((type: string) => {
            typeEffectivenessData.push({ type_id: value.id, weakness: getTypeId(type), resistance: 0, immunity: 0 });
        });
    }
    if (value.resistances) {
        value.resistances.forEach((type: string) => {
            typeEffectivenessData.push({ type_id: value.id, weakness: 0, resistance: getTypeId(type), immunity: 0 });
        });
    }
    if (value.immunities) {
        value.immunities.forEach((type: string) => {
            typeEffectivenessData.push({ type_id: value.id, weakness: 0, resistance: 0, immunity: getTypeId(type) });
        });
    }
});