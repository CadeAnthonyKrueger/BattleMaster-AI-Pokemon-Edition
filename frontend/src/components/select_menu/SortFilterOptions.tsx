import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/SortFilterOptions.scss";
import SortOptionCard from "./SortOptionCard";
import { FilterOptions, OptionsSelected } from "../../views/SelectMenu";
import FilterOptionCard from "./FilterOptionCard";

interface SortFilterOptionsProps {
    optionType: string;
    expanded: boolean;
    closeMenu: Dispatch<SetStateAction<boolean>>;
    options: string[] | FilterOptions[];
    optionsSelected: OptionsSelected;
    setOptionsSelected: Dispatch<SetStateAction<OptionsSelected>>;
}

const SortFilterOptions: FC<SortFilterOptionsProps> = ({ optionType, expanded, closeMenu, options, optionsSelected, setOptionsSelected }) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [filtersReset, setFiltersReset] = useState<boolean>(false);
    const [sortByReset, setSortByReset] = useState<boolean>(false);

    const handleReset = () => {
        setOptionsSelected(prev => {
            return {
                filtersSelected: optionType === 'filter' ? [] : prev.filtersSelected,
                sortBySelected: optionType === 'sort' ? [] : prev.sortBySelected
            }
        });
    };

    return (
        <div className={`SortFilterOptions ${optionType} ${expanded ? 'expanded' : ''}`}>
            <>
                <div className="OptionTypeContainer" style={{ visibility: `${expanded ? 'visible' : 'hidden'}`}}>
                    <div 
                        className={`OptionTypeIcon ${optionType === 'filter' ? 'filter' : 'sortBy'}`} 
                        onClick={() => closeMenu(false)}
                    />
                </div>
                <div 
                    className='SortFilterOptionsContainer' 
                    style={{ visibility: `${expanded ? 'visible' : 'hidden'}`}}
                    ref={scrollRef}
                >
                    {optionType === 'sort' && options.map((option) => 
                        <SortOptionCard 
                            option={option as string} 
                            optionsSelected={optionsSelected} 
                            setOptionsSelected={setOptionsSelected}
                            parent={scrollRef}
                        />
                    )}
                    {optionType === 'filter' && options.map((option) => 
                        <FilterOptionCard 
                            option={option as FilterOptions} 
                            optionsSelected={optionsSelected} 
                            setOptionsSelected={setOptionsSelected}
                            parent={scrollRef}
                        />
                    )}
                </div>
                <div 
                    className='ClearSortFilterSelections' 
                    style={{ visibility: `${expanded ? 'visible' : 'hidden'}`}}
                    onClick={handleReset}>Reset</div>
            </>
        </div>
    );
};

export default SortFilterOptions;