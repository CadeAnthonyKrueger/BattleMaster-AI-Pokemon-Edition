export interface TrainerSchema {
    id?: number;
    name: string;
    description: string;
    player_trainer: boolean;
    image: string;
    color: string;
}

export class TrainerModel {
    static model(row: any): TrainerSchema {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            player_trainer: row.player_trainer,
            image: row.image,
            color: row.color
        };
    }
}