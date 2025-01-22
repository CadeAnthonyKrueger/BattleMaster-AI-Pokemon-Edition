export interface MoveSchema {
    id?: number;
    type_id: number;
    name: string;
    description: string;
    category: string;
    power: number;
    accuracy: number;
    pp: number;
}

export class MoveModel {
    static model(row: any): MoveSchema {
        return {
            id: row.id,
            type_id: row.type_id,
            name: row.name,
            description: row.description,
            category: row.category,
            power: row.power,
            accuracy: row.accuracy,
            pp: row.pp
        };
    }
}