import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import "./styles/FilterOptionCard.scss";
import { OptionsSelected } from "../views/SelectMenu";
import FilterConditionContainer from "./FilterConditionContainer";

interface FilterOptionCardProps {
    option: string;
    optionsSelected: OptionsSelected;
    setOptionsSelected: Dispatch<SetStateAction<OptionsSelected>>;
}

const FilterOptionCard: FC<FilterOptionCardProps> = ({ option, optionsSelected, setOptionsSelected }) => {

    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [betweenConditionSelected, setBetweenConditionSelected] = useState<boolean>(false);

    const handleClick = () => {
        setOptionsSelected(prev => {
            return {
                ...prev,
                filtersSelected: isSelected ? prev.filtersSelected.filter(item => item !== option) : [...prev.filtersSelected, option]
            };
        });
        setIsSelected(prev => !prev);
    };

    useEffect(() => {
        if (optionsSelected.filtersSelected.length === 0) {
            setIsSelected(false);
        }
    }, [optionsSelected.filtersSelected]);

    console.log(betweenConditionSelected)

    return (
        <div 
            className={`FilterOptionCard ${isSelected ? 'optionSelected' : ''}`} 
            onClick={handleClick} 
            //onMouseLeave={(event) => handleConditionMenuChange(event, false)}
        >
            {betweenConditionSelected && 
                <FilterConditionContainer isSelected={isSelected} isBefore={true}/>
            }
            {option}
            <FilterConditionContainer isSelected={isSelected} isBefore={false} setBetweenConditionSelected={setBetweenConditionSelected}/>
        </div>
    );
};

export default FilterOptionCard;