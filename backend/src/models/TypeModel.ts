export interface TypeSchema {
    id?: number;
    name: string;
    icon_position: number;
}

export class TypeModel {
    static model(row: any): TypeSchema {
        return {
            id: row.id,
            name: row.name,
            icon_position: row.icon_position
        };
    }
}