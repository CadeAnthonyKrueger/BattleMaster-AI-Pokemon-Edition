export interface Trainer {
    id?: number;
    name: string;
    description: string;
    player_trainer: boolean;
    image: string;
    color: string;
}

export const TrainerSchema = {
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
        player_trainer: {
            validator: (player_trainer: any): boolean => typeof player_trainer === 'boolean',
            message: 'player_trainer must be a boolean',
            type: 'boolean'
        },
        image: {
            validator: (image: any): boolean => typeof image === 'string' && image.trim().length > 0,
            message: 'image must be a non-empty string',
            type: 'string'
        },
        color: {
            validator: (color: any): boolean => typeof color === 'string' && color.trim().length > 0,
            message: 'color must be a non-empty string',
            type: 'string'
        }
    },

    keys: (): (keyof Trainer)[] => {
        return Object.keys(TrainerSchema.schema) as (keyof Trainer)[];
    },
    
    types: (): Record<keyof Trainer, string> => {
        const types: Record<keyof Trainer, string> = {} as Record<keyof Trainer, string>;
        Object.entries(TrainerSchema.schema).forEach(([key, value]) => {
            types[key as keyof Trainer] = value.type;
        });
        return types;
    },
};
  