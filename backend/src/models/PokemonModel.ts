export interface PokemonSchema {
    id?: number;
    name: string;
    gender_ratio: string;
    height: number;
    weight: number;
    color: string;
    category: string;
    pokedex_entry: string;
    image: string;
}

export class PokemonModel {
    static model(row: any): PokemonSchema {
        return {
            id: row.id,
            name: row.name,
            gender_ratio: row.gender_ratio,
            height: row.height,
            weight: row.weight,
            color: row.color,
            category: row.category,
            pokedex_entry: row.pokedex_entry,
            image: row.image
        };
    }
}