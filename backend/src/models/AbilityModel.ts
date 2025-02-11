export interface Ability {
    id: string;
    name: string;
    description: string;
}

export const AbilitySchema = {
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
        }
    },

    keys: (): (keyof Ability)[] => {
        return Object.keys(AbilitySchema.schema) as (keyof Ability)[];
    },
    
    types: (): Record<keyof Ability, string> => {
        const types: Record<keyof Ability, string> = {} as Record<keyof Ability, string>;
        Object.entries(AbilitySchema.schema).forEach(([key, value]) => {
            types[key as keyof Ability] = 
                typeof value.type === 'number' ? 'number' : String(value.type); 
        });
        return types;
    },
};