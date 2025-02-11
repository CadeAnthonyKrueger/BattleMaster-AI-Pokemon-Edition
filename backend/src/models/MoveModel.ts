// export interface Move {
//     id?: number;
//     type_id: number;
//     name: string;
//     description: string;
//     category: string;
//     power: number;
//     accuracy: number;
//     pp: number;
// }

import { MoveCategory } from "../enums/MoveEnums";

interface Move {
    id: string;
    name: string;
    description: string;
    category: string;
    power: number;
    accuracy: number;
    pp: number;
}

export const MoveSchema = {
    schema: {
        id: {
            validator: (id: any): boolean => typeof id === 'number',
            message: 'id must be a number',
            type: 'number'
        },
        name: {
            validator: (name: any): boolean => typeof name === 'string' && name.trim().length > 0,
            message: 'name must be a non-empty string',
            type: 'string'
        },
        description: {
            validator: (description: any): boolean => typeof description === 'string',
            message: 'description must be a string',
            type: 'string'
        },
        category: {
            validator: (value: any): boolean => 
                Object.values(MoveCategory).includes(value as MoveCategory),
            message: 'category must be a valid MoveCategory',
            type: 'string'
        },        
        power: {
            validator: (value: any): boolean => Number.isInteger(value),
            message: 'power must be an integer',
            type: 'number'
        },
        accuracy: {
            validator: (value: any): boolean => Number.isInteger(value),
            message: 'accuracy must be an integer',
            type: 'number'
        },
        pp: {
            validator: (value: any): boolean => Number.isInteger(value),
            message: 'pp must be an integer',
            type: 'number'
        },
    },

    keys: (): (keyof Move)[] => {
        return Object.keys(MoveSchema.schema) as (keyof Move)[];
    },
    
    types: (): Record<keyof Move, string> => {
        const types: Record<keyof Move, string> = {} as Record<keyof Move, string>;
        Object.entries(MoveSchema.schema).forEach(([key, value]) => {
            types[key as keyof Move] = 
                typeof value.type === 'number' ? 'number' : String(value.type); 
        });
        return types;
    },
};