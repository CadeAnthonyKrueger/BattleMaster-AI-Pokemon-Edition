export interface AbilitySchema {
    id?: number;
    name: string;
    description: string;
}

export class AbilityModel {
    static model(row: any): AbilitySchema {
        return {
            id: row.id,
            name: row.name,
            description: row.description
        };
    }
}