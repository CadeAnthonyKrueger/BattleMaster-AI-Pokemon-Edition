import axios from 'axios';

export interface TrainerSchema {
    id: number;
    name: string;
    description: string;
    player_trainer: boolean;
    image: string;
    color: string;
}

export interface FetchTrainersParams {
    field?: string;
    asc?: boolean;
    limit?: number;
    exclude?: number[];
    lastElement?: any;
    returnWithSize?: boolean;
}

export const fetchTrainerById = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:3001/trainers/getById/${id}`);
        return response.data as TrainerSchema; // Return the data from the API response
    } catch (error) {
        throw error; // If the request fails, throw the error
    }
};

export const fetchTrainers = async (params: FetchTrainersParams = {}) => {
    try {
        const response = await axios.post("http://localhost:3001/trainers/get", params);
        return response.data as TrainerSchema[]; // Return the data from the API response
    } catch (error) {
        throw error; // If the request fails, throw the error
    }
};


