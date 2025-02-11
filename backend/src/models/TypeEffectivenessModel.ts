import { db } from "../database/db";

export interface TypeEffectiveness {
    type_id: number;
    weakness: number;
    resistance: number;
    immunity: number;
}

export const TypeEffectivenessSchema = {
    schema: {
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
        weakness: {
            validator: async (id: any): Promise<boolean> => {
                // Check if id is a number
                if (typeof id !== 'number') {
                    throw new Error('id must be a number');
                }
        
                // Query to check if the type_id exists in the types table
                const result = await db.prepare('SELECT 1 FROM types WHERE id = ?').get(id);
                
                // Return true if a record exists, otherwise false
                if (result || result === 0) {
                    return true;
                } else {
                    throw new Error('weakness must be a valid type_id in the types table');
                }
            },
            message: 'weakness must be a number and exist in the types table',
            type: 'number'
        },
        resistance: {
            validator: async (id: any): Promise<boolean> => {
                // Check if id is a number
                if (typeof id !== 'number') {
                    throw new Error('id must be a number');
                }
        
                // Query to check if the type_id exists in the types table
                const result = await db.prepare('SELECT 1 FROM types WHERE id = ?').get(id);
                
                // Return true if a record exists, otherwise false
                if (result || result === 0) {
                    return true;
                } else {
                    throw new Error('resistance must be a valid type_id in the types table');
                }
            },
            message: 'resistance must be a number and exist in the types table',
            type: 'number'
        },
        immunity: {
            validator: async (id: any): Promise<boolean> => {
                // Check if id is a number
                if (typeof id !== 'number') {
                    throw new Error('id must be a number');
                }
        
                // Query to check if the type_id exists in the types table
                const result = await db.prepare('SELECT 1 FROM types WHERE id = ?').get(id);
                
                // Return true if a record exists, otherwise false
                if (result || result === 0) {
                    return true;
                } else {
                    throw new Error('immunity must be a valid type_id in the types table');
                }
            },
            message: 'immunity must be a number and exist in the types table',
            type: 'number'
        }
    },

    keys: (): (keyof TypeEffectiveness)[] => {
        return Object.keys(TypeEffectivenessSchema.schema) as (keyof TypeEffectiveness)[];
    },
    
    types: (): Record<keyof TypeEffectiveness, string> => {
        const types: Record<keyof TypeEffectiveness, string> = {} as Record<keyof TypeEffectiveness, string>;
        Object.entries(TypeEffectivenessSchema.schema).forEach(([key, value]) => {
            types[key as keyof TypeEffectiveness] = value.type;
        });
        return types;
    },
};
