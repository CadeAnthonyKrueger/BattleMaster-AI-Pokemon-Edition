export interface Pokemon {
    id: number;
    name: string;
    gender_ratio: string;
    base_happiness: number;
    height: number;
    weight: number;
    color: string;
    category: string;
    pokedex_entry: string;
    generation: number;
    pokemon_class: string;
    has_gendered_form: number;
    image: string;
}

export const PokemonSchema = {
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
        gender_ratio: {
            validator: (ratio: any): boolean => typeof ratio === 'string' && ratio.includes(':'),
            message: 'gender_ratio must be a valid ratio string (e.g., "50:50")',
            type: 'string'
        },
        base_happiness: {
            validator: (happiness: any): boolean => Number.isInteger(happiness) && happiness >= 0 && happiness <= 255,
            message: 'base_happiness must be an integer between 0 and 255',
            type: 'number'
        },
        height: {
            validator: (height: any): boolean => typeof height === 'number' && height > 0,
            message: 'height must be a positive number',
            type: 'number'
        },
        weight: {
            validator: (weight: any): boolean => typeof weight === 'number' && weight > 0,
            message: 'weight must be a positive number',
            type: 'number'
        },
        color: {
            validator: (color: any): boolean => typeof color === 'string' && color.trim().length > 0,
            message: 'color must be a non-empty string',
            type: 'string'
        },
        category: {
            validator: (category: any): boolean => typeof category === 'string' && category.trim().length > 0,
            message: 'category must be a non-empty string',
            type: 'string'
        },
        pokedex_entry: {
            validator: (entry: any): boolean => typeof entry === 'string' && entry.trim().length > 0,
            message: 'pokedex_entry must be a non-empty string',
            type: 'string'
        },
        generation: {
            validator: (gen: any): boolean => Number.isInteger(gen) && gen > 0,
            message: 'generation must be a positive integer',
            type: 'number'
        },
        pokemon_class: {
            validator: (entry: any): boolean => typeof entry === 'string' && entry.trim().length > 0,
            message: 'pokemon_class must be a non-empty string',
            type: 'string'
        },
        has_gendered_form: {
            validator: (gen: any): boolean => Number.isInteger(gen) && gen > 0,
            message: 'has_gendered_form must be a positive integer',
            type: 'number'
        },
        image: {
            validator: (image: any): boolean => typeof image === 'string' && image.startsWith('http'),
            message: 'image must be a valid URL',
            type: 'string'
        }
    },

    keys: (): (keyof Pokemon)[] => {
        return Object.keys(PokemonSchema.schema) as (keyof Pokemon)[];
    },
    
    types: (): Record<keyof Pokemon, string> => {
        const types: Record<keyof Pokemon, string> = {} as Record<keyof Pokemon, string>;
        Object.entries(PokemonSchema.schema).forEach(([key, value]) => {
            types[key as keyof Pokemon] = value.type;
        });
        return types;
    },
};
