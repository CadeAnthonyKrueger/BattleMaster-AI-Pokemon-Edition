export interface TrainerSchema {
    id: number;
    name: string;
    description: string;
    image: string;
}

export class TrainerModel {
    static model(row: any): TrainerSchema {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            image: row.image,
        };
    }
}