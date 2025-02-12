export interface PokemonEvolution {
    pokemon_id: number;
    pokemon_evolution_id: number;
    evolution_method: string;
    evolution_level: number;
}

export const PokemonEvolutionSchema = {
    schema: {
        pokemon_id: {
            validator: (id: any): boolean => typeof id === 'number' && id > 0,
            message: 'pokemon_id must be a positive number',
            type: 'number'
        },
        pokemon_evolution_id: {
            validator: (id: any): boolean => typeof id === 'number' && id > 0,
            message: 'pokemon_evolution_id must be a positive number',
            type: 'number'
        },
        evolution_method: {
            validator: (method: any): boolean => typeof method === 'string' && method.trim().length > 0,
            message: 'evolution_method must be a non-empty string',
            type: 'string'
        },
        evolution_level: {
            validator: (level: any): boolean => 
                level === null || (typeof level === 'number' && level >= 0),
            message: 'evolution_level must be a non-negative number or null',
            type: 'number | null'
        }
    },

    keys: (): (keyof PokemonEvolution)[] => {
        return Object.keys(PokemonEvolutionSchema.schema) as (keyof PokemonEvolution)[];
    },
    
    types: (): Record<keyof PokemonEvolution, string> => {
        const types: Record<keyof PokemonEvolution, string> = {} as Record<keyof PokemonEvolution, string>;
        Object.entries(PokemonEvolutionSchema.schema).forEach(([key, value]) => {
            types[key as keyof PokemonEvolution] = value.type;
        });
        return types;
    },
};
