import { create } from 'zustand';

interface TrainerSchema {
    id: number;
    name: string;
    description: string;
    player_trainer: boolean;
    image: string;
    color: string;
}

// Placeholder for the Trainer
const trainerPlaceholder: TrainerSchema = {
    id: -1,
    name: 'Trainer',
    description: ' ',
    player_trainer: false,
    image: '/assets/profile_placeholder.png',
    color: 'black'
};

// Define the global state
interface GlobalState {
    selectedTrainer: {
        current: TrainerSchema;
        loaded: TrainerSchema;
        default: TrainerSchema;
    };
    setSelectedTrainer: (updater: (prev: GlobalState['selectedTrainer']) => GlobalState['selectedTrainer']) => void;
}

// Create the Zustand store
export const useGlobalState = create<GlobalState>((set) => ({
    selectedTrainer: {
        current: trainerPlaceholder,
        loaded: trainerPlaceholder,
        default: trainerPlaceholder,
    },
    setSelectedTrainer: (updater) => set((state) => ({
        selectedTrainer: updater(state.selectedTrainer),
    })),
}));

