import { RefObject, useRef } from "react";
import { NormalModule } from "webpack";
import { create } from "zustand";

interface SelectMenuStore {
    selectMenuActive: boolean;
    currentMenuActive: string | null;
    pokemonMenuActive: boolean;
    trainerMenuActive: boolean;
    itemMenuActive: boolean;
    baseRef: HTMLElement | null;
    openMenu: (menu: string, ref: HTMLElement) => void;
    closeMenu: () => void;
}

export const useSelectMenuStore = create<SelectMenuStore>((set) => ({
    selectMenuActive: false,
    currentMenuActive: null,
    pokemonMenuActive: false,
    trainerMenuActive: false,
    itemMenuActive: false,
    baseRef: null,
    
    openMenu: (menu: string, ref: HTMLElement) => set(() => ({
        selectMenuActive: true,
        currentMenuActive: menu,
        pokemonMenuActive: menu === "pokemon",
        trainerMenuActive: menu === "trainer",
        itemMenuActive: menu === "item",
        baseRef: ref
    })),

    closeMenu: () => set(() => ({
        selectMenuActive: false,
        currentMenuActive: null,
        pokemonMenuActive: false,
        trainerMenuActive: false,
        itemMenuActive: false,
        baseRef: null
    })),
}));
