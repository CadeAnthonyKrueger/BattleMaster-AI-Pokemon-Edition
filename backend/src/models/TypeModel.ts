export interface Type {
    id: number;
    name: string;
    icon_position: number;
}

export const TypeSchema = {
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
        icon_position: {
            validator: (value: any): boolean => Number.isInteger(parseInt(value)) && parseInt(value) > 0 && parseInt(value) < 20,
            message: 'icon_position must be an integer between 1 and 19',
            type: 'number'
        }
    },

    keys: (): (keyof Type)[] => {
        return Object.keys(TypeSchema.schema) as (keyof Type)[];
    },
    
    types: (): Record<keyof Type, string> => {
        const types: Record<keyof Type, string> = {} as Record<keyof Type, string>;
        Object.entries(TypeSchema.schema).forEach(([key, value]) => {
            types[key as keyof Type] = value.type;
        });
        return types;
    },
};
  