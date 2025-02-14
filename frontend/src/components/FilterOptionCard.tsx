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
    const [isAsc, setIsAsc] = useState<boolean>(true);

    const handleClick = () => {
        if (isSelected) {
            setIsAsc(!isAsc);
            if (!isAsc) {
                setIsSelected(false);
                setOptionsSelected(prev => {
                    return {
                        ...prev,
                        filtersSelected: prev.filtersSelected.filter(item => item !== option)
                    };
                });
            }
        } else {
            setIsSelected(true);
            setOptionsSelected(prev => {
                return {
                    ...prev,
                    filtersSelected: [...prev.filtersSelected, option]
                };
            });
        }
    };

    useEffect(() => {
        if (optionsSelected.filtersSelected.length === 0) {
            setIsSelected(false);
            setIsAsc(true);
        }
    }, [optionsSelected.filtersSelected]);

    return (
        <div className={`FilterOptionCard ${isSelected ? 'optionSelected' : ''}`} onClick={handleClick}>
            {option}
            <div className={`FilterConditionContainer`}>
                {['>'].map((cond) => <div className='ConditionButton'>{cond}</div>)}
                <input className='NumberConditionInput' placeholder="0"/>
            </div>
        </div>
    );
};

export default FilterOptionCard;