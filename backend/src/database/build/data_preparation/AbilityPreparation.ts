import { Ability } from "../../../models/AbilityModel";
import { parseData } from "./utilities/DataParser";

const statement = (key: string, value: string, row: Partial<any>) => {
    switch (key) {
        case 'Name': row.name = value; break;
        case 'Description': row.description = value; break;
    }
}

export const abilityData: Ability[] = parseData('abilities.txt', statement);