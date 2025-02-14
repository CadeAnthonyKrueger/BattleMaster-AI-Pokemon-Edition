import React, { FC, useState } from "react";
import "./styles/SelectMenu.scss";
import CardTitleContainer from "../components/CardTitleContainer";
import SelectSearchContainer from "../components/SelectSearchContainer";
import { useSelectMenuStore } from "../global_stores/SelectMenuStore";
import SortFilterOptions from "../components/SortFilterOptions";
import { toTitleCase } from "../utilities/HelperFunctions";

export interface OptionsSelected { filtersSelected: string[], sortBySelected: string[] }

interface SelectMenuProps {
    currentMenu: string | null;
}

const SelectMenu: FC<SelectMenuProps> = ({ currentMenu }) => {

    const { closeMenu, trainerMenuActive, pokemonMenuActive, itemMenuActive } = useSelectMenuStore();

    const [filterClicked, setFilterClicked] = useState<boolean>(false);
    const [sortByClicked, setSortByClicked] = useState<boolean>(false);

    const tempFilterOptions = ['National No.', 'Generation', 'HP', 'Attack', 'Defense', 'Sp. Atk.', 'Sp. Def.', 'Speed'];
    const tempSortByOptions = ['National No.', 'Name', 'Type', 'Generation', 'Rarity', 'HP', 'Attack', 'Defense', 'Sp. Atk.', 'Sp. Def.', 'Speed'];

    const [optionsSelected, setOptionsSelected] = useState<OptionsSelected>({ 
        filtersSelected: [], sortBySelected: []
    });

    return (
        <div className="SelectMenu">
            <CardTitleContainer text={`${toTitleCase(currentMenu as string)} Select`} style={{ width: '95%', marginTop: '3.65px' }}/>
            <SelectSearchContainer setFilterClicked={setFilterClicked} setSortByClicked={setSortByClicked} optionsSelected={optionsSelected}/>
            <SortFilterOptions 
                optionType={'filter'} 
                expanded={filterClicked} 
                options={tempFilterOptions} 
                optionsSelected={optionsSelected}
                setOptionsSelected={setOptionsSelected}
            />
            <SortFilterOptions 
                optionType={'sort'} 
                expanded={sortByClicked} 
                options={tempSortByOptions}
                optionsSelected={optionsSelected} 
                setOptionsSelected={setOptionsSelected}
            />
            {/* <TrainerSelectCardContainer trainers={trainers} setTrainers={setTrainers} layout={layoutSelected}/> */}
            <div className="CloseSelectMenu" onClick={closeMenu}/>
        </div>
    );
};

export default SelectMenu;