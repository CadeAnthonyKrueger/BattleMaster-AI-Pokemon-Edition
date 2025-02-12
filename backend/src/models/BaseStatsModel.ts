export interface BaseStats {
    pokemon_id: number;
    total: number;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
}

export const BaseStatsSchema = {
    schema: {
        pokemon_id: {
            validator: (pokemon_id: any): boolean => typeof pokemon_id === 'number',
            message: 'pokemon_id must be a number',
            type: 'number'
        },
        total: {
            validator: (total: any): boolean => Number.isInteger(total),
            message: 'total must be an integer',
            type: 'number'
        },
        hp: {
            validator: (hp: any): boolean => Number.isInteger(hp) && hp >= 1 && hp <= 255,
            message: 'hp must be an integer between 1 and 255',
            type: 'number'
        },
        attack: {
            validator: (attack: any): boolean => Number.isInteger(attack) && attack >= 1 && attack <= 255,
            message: 'attack must be an integer between 1 and 255',
            type: 'number'
        },
        defense: {
            validator: (defense: any): boolean => Number.isInteger(defense) && defense >= 1 && defense <= 255,
            message: 'defense must be an integer between 1 and 255',
            type: 'number'
        },
        special_attack: {
            validator: (special_attack: any): boolean => Number.isInteger(special_attack) && special_attack >= 1 && special_attack <= 255,
            message: 'special_attack must be an integer between 1 and 255',
            type: 'number'
        },
        special_defense: {
            validator: (special_defense: any): boolean => Number.isInteger(special_defense) && special_defense >= 1 && special_defense <= 255,
            message: 'special_defense must be an integer between 1 and 255',
            type: 'number'
        },
        speed: {
            validator: (speed: any): boolean => Number.isInteger(speed) && speed >= 1 && speed <= 255,
            message: 'speed must be an integer between 1 and 255',
            type: 'number'
        }
    },

    keys: (): (keyof BaseStats)[] => {
        return Object.keys(BaseStatsSchema.schema) as (keyof BaseStats)[];
    },

    types: (): Record<keyof BaseStats, string> => {
        const types: Record<keyof BaseStats, string> = {} as Record<keyof BaseStats, string>;
        Object.entries(BaseStatsSchema.schema).forEach(([key, value]) => {
            types[key as keyof BaseStats] = value.type;
        });
        return types;
    },
};
