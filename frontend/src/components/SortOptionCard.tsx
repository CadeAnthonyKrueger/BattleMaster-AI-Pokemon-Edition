import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import "./styles/SortOptionCard.scss";
import { OptionsSelected } from "../views/SelectMenu";

interface SortOptionCardProps {
    option: string;
    optionsSelected: OptionsSelected;
    setOptionsSelected: Dispatch<SetStateAction<OptionsSelected>>;
}

const SortOptionCard: FC<SortOptionCardProps> = ({ option, optionsSelected, setOptionsSelected }) => {

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
                        sortBySelected: prev.sortBySelected.filter(item => item !== option)
                    };
                });
            }
        } else {
            setIsSelected(true);
            setOptionsSelected(prev => {
                return {
                    ...prev,
                    sortBySelected: [...prev.sortBySelected, option]
                };
            });
        }
    };

    useEffect(() => {
        if (optionsSelected.sortBySelected.length === 0) {
            setIsSelected(false);
            setIsAsc(true);
        }
    }, [optionsSelected.sortBySelected]);

    return (
        <div className={`SortOptionCard ${isSelected ? 'optionSelected' : ''}`} onClick={handleClick}>
            {option}
            <div className={`AscIndicator ${isAsc ? 'asc' : ''} ${isSelected ? 'optionSelected' : ''}`}/>
        </div>
    );
};

export default SortOptionCard;