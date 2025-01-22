export interface TypeEffectivenessSchema {
    type_id: number;
    weakness: string;
    resistance: string;
    immunity: string;
}

export class TypeEffectivenessModel {
    static model(row: any): TypeEffectivenessSchema {
        return {
            type_id: row.type_id,
            weakness: row.weakness,
            resistance: row.resistance,
            immunity: row.immunity
        };
    }
}