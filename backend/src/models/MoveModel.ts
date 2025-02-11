import { db } from "../database/db";
import { MoveCategory } from "../enums/MoveEnums";

export interface Move {
    id: string;
    type_id: number;
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
        type_id: {
            validator: async (id: any): Promise<boolean> => {
                // Check if id is a number
                if (typeof id !== 'number') {
                    throw new Error('id must be a number');
                }
        
                // Query to check if the type_id exists in the types table
                const result = await db.prepare('SELECT 1 FROM types WHERE id = ?').get(id);
                
                // Return true if a record exists, otherwise false
                if (result) {
                    return true;
                } else {
                    throw new Error('id must be a valid type_id in the types table');
                }
            },
            message: 'id must be a number and exist in the types table',
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