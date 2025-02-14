import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import "./styles/FilterOptionCard.scss";
import { OptionsSelected } from "../views/SelectMenu";

interface FilterOptionCardProps {
    option: string;
    optionsSelected: OptionsSelected;
    setOptionsSelected: Dispatch<SetStateAction<OptionsSelected>>;
}

const FilterOptionCard: FC<FilterOptionCardProps> = ({ option, optionsSelected, setOptionsSelected }) => {

    const [isSelected, setIsSelected] = useState<boolean>(false);

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

    return (
        <div className={`FilterOptionCard ${isSelected ? 'optionSelected' : ''}`} onClick={handleClick}>
            {option}
            <div className={`FilterConditionContainer`}>
                {['⇄'].map((cond) => <div className='ConditionButton'>{cond}</div>)}
                <input className='NumberConditionInput' placeholder="0"/>
            </div>
        </div>
    );
};

export default FilterOptionCard;