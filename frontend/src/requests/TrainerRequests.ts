import axios from 'axios';

export interface TrainerSchema {
    id?: number;
    name: string;
    description: string;
    player_trainer: boolean;
    image: string;
    color: string;
}

export const fetchAllTrainers = async () => {
    try {
        const response = await axios.get('http://localhost:3001/trainers/getAll');
        //console.log(response.data);
        return response.data; // Return the data from the API response
    } catch (error) {
        throw error; // If the request fails, throw the error
    }
};

export const fetchTrainers = async (limit: number, minId: number) => {
    try {
        const response = await axios.get(`http://localhost:3001/trainers/getBySize/${limit}/${minId}`);
        //console.log(response.data);
        return response.data; // Return the data from the API response
    } catch (error) {
        throw error; // If the request fails, throw the error
    }
};

