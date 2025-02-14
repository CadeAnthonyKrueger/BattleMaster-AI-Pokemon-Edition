import { create } from "zustand";

interface SelectMenuStore {
    selectMenuActive: boolean;
    currentMenuActive: string | null; // New field to track the current active menu
    pokemonMenuActive: boolean;
    trainerMenuActive: boolean;
    itemMenuActive: boolean;
    openMenu: (menu: string) => void;
    closeMenu: () => void;
}

export const useSelectMenuStore = create<SelectMenuStore>((set) => ({
    selectMenuActive: false,
    currentMenuActive: null,  // Initialize as null or default to 'pokemon' or any other menu
    pokemonMenuActive: false,
    trainerMenuActive: false,
    itemMenuActive: false,

    openMenu: (menu) => set(() => ({
        selectMenuActive: true,
        currentMenuActive: menu, // Set the active menu to the selected menu
        pokemonMenuActive: menu === "pokemon",
        trainerMenuActive: menu === "trainer",
        itemMenuActive: menu === "item",
    })),

    closeMenu: () => set(() => ({
        selectMenuActive: false,
        currentMenuActive: null,  // Reset the active menu to null when closing
        pokemonMenuActive: false,
        trainerMenuActive: false,
        itemMenuActive: false,
    })),
}));
