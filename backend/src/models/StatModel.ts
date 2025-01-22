export interface StatSchema {
    id?: number;
    pokemon_id: number;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
}

export class StatModel {
    static model(row: any): StatSchema {
        return {
            id: row.id,
            pokemon_id: row.pokemon_id,
            hp: row.hp,
            attack: row.attack,
            defense: row.defense,
            special_attack: row.special_attack,
            special_defense: row.special_defense,
            speed: row.speed
        };
    }
}