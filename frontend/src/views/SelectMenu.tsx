import React, { CSSProperties, FC, useEffect, useState } from "react";
import "./styles/SelectMenu.scss";
import CardTitleContainer from "../components/CardTitleContainer";
import SelectSearchContainer from "../components/select_menu/SelectSearchContainer";
import { useSelectMenuStore } from "../stores/SelectMenuStore";
import SortFilterOptions from "../components/select_menu/SortFilterOptions";
import { toTitleCase } from "../utils/HelperFunctions";
import useClassNameBuilder from "../hooks/useClassNameBuilder";
import { useAnchorMenuTransition } from "../hooks/useAnchorMenuTransition";

export interface OptionsSelected { filtersSelected: string[], sortBySelected: string[] }

export interface FilterOptions {
    title: string;
    min: number;
    max: number;
}

interface SelectMenuProps {
    currentMenu: string | null;
}

const SelectMenu: FC<SelectMenuProps> = ({ currentMenu }) => {

    // Global state vars
    const { closeMenu, baseRef, trainerMenuActive, pokemonMenuActive, itemMenuActive } = useSelectMenuStore();

    // Component state
    const [filterClicked, setFilterClicked] = useState<boolean>(false);
    const [sortByClicked, setSortByClicked] = useState<boolean>(false);

    //const tempFilterOptions = ['National No.', 'Generation', 'HP', 'Attack', 'Defense', 'Sp. Atk.', 'Sp. Def.', 'Speed'];
    const filterOptions: FilterOptions[] = [
        { title: 'National No.', min: 1, max: 898 }, // Gen 8 goes up to Calyrex (#898)
        { title: 'Generation', min: 1, max: 8 },
        { title: 'Total', min: 180, max: 720 }, // Base stat totals range from weak Pokémon (~180) to legendaries (~720)
        { title: 'HP', min: 1, max: 255 }, // Blissey has the highest HP (255)
        { title: 'Attack', min: 5, max: 190 }, // Highest is Mega Mewtwo X (190)
        { title: 'Defense', min: 5, max: 230 }, // Shuckle has the highest (230)
        { title: 'Sp. Atk.', min: 10, max: 194 }, // Mega Mewtwo Y (194)
        { title: 'Sp. Def.', min: 20, max: 230 }, // Shuckle again (230)
        { title: 'Speed', min: 5, max: 200 } // Regieleki is the fastest (200)
    ];
    const tempSortByOptions = ['National No.', 'Name', 'Type', 'Generation', 'Rarity', 'HP', 'Attack', 'Defense', 'Sp. Atk.', 'Sp. Def.', 'Speed'];

    // Keeps track of fields that are selected for filtering and sorting
    const [optionsSelected, setOptionsSelected] = useState<OptionsSelected>({ 
        filtersSelected: [], sortBySelected: []
    });

    // Animation for menu transition
    const [menuClosing, setMenuClosing] = useState<boolean>(false);

    const { className, styles } = useAnchorMenuTransition({ baseRef, finalClassName: 'SelectMenu', menuClosing, closeMenu });

    // Class name for css
    const selectMenu = useClassNameBuilder(className, [
        { cond: filterClicked, class: 'filterMenuOpen' },
        { cond: sortByClicked, class: 'sortByMenuOpen' }
    ])

    return (
        <div className={selectMenu} style={styles.menu}>
            <div className='SelectContent' style={styles.content}>
                <CardTitleContainer text={`${toTitleCase(currentMenu as string)} Select`} style={{ width: '95%', marginTop: '3.65px' }}/>
                <SelectSearchContainer 
                    filterClicked={filterClicked}
                    sortByClicked={sortByClicked}
                    setFilterClicked={setFilterClicked} 
                    setSortByClicked={setSortByClicked} 
                    optionsSelected={optionsSelected}/>
                <SortFilterOptions 
                    optionType={'filter'} 
                    expanded={filterClicked} 
                    closeMenu={setFilterClicked}
                    options={filterOptions} 
                    optionsSelected={optionsSelected}
                    setOptionsSelected={setOptionsSelected}
                />
                <SortFilterOptions 
                    optionType={'sort'} 
                    expanded={sortByClicked} 
                    closeMenu={setSortByClicked}
                    options={tempSortByOptions}
                    optionsSelected={optionsSelected} 
                    setOptionsSelected={setOptionsSelected}
                />
            {/* <TrainerSelectCardContainer trainers={trainers} setTrainers={setTrainers} layout={layoutSelected}/> */}
            <div className="CloseSelectMenu" onClick={() => setMenuClosing(true)}/>
            </div>
        </div>
    );
};

export default SelectMenu;