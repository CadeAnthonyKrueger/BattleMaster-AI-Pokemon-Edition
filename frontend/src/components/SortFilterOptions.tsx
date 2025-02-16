import React, { Dispatch, FC, SetStateAction, useState } from "react";
import "./styles/SortFilterOptions.scss";
import SortOptionCard from "./SortOptionCard";
import { toTitleCase } from "../utilities/HelperFunctions";
import { FilterOptions, OptionsSelected } from "../views/SelectMenu";
import FilterOptionCard from "./FilterOptionCard";

interface SortFilterOptionsProps {
    optionType: string;
    expanded: boolean;
    options: string[] | FilterOptions[];
    optionsSelected: OptionsSelected;
    setOptionsSelected: Dispatch<SetStateAction<OptionsSelected>>;
}

const SortFilterOptions: FC<SortFilterOptionsProps> = ({ optionType, expanded, options, optionsSelected, setOptionsSelected }) => {

    const handleReset = () => {
        setOptionsSelected(prev => {
            return {
                filtersSelected: optionType === 'filter' ? [] : prev.filtersSelected,
                sortBySelected: optionType === 'sort' ? [] : prev.sortBySelected
            }
        })
    };

    return (
        <div className={`SortFilterOptions ${optionType} ${expanded ? 'expanded' : ''}`}>
            <>
                <div className="OptionTypeContainer" style={{ visibility: `${expanded ? 'visible' : 'hidden'}`}}>
                    <div className='OptionTypeTitle'>{toTitleCase(optionType)} By:</div>
                </div>
                <div className='SortFilterOptionsContainer' style={{ visibility: `${expanded ? 'visible' : 'hidden'}`}}>
                    {optionType === 'sort' && options.map((option) => 
                        <SortOptionCard 
                            option={option as string} 
                            optionsSelected={optionsSelected} 
                            setOptionsSelected={setOptionsSelected}
                        />
                    )}
                    {optionType === 'filter' && options.map((option) => 
                        <FilterOptionCard 
                            option={option as FilterOptions} 
                            optionsSelected={optionsSelected} 
                            setOptionsSelected={setOptionsSelected}
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