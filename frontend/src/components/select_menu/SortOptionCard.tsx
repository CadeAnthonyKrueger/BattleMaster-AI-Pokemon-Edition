import React, { Dispatch, FC, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/SortOptionCard.scss";
import { OptionsSelected } from "../../views/SelectMenu";
import useScrollToCenter from "../../hooks/useScrollToCenter";
import useClassNameBuilder from "../../hooks/useClassNameBuilder";

interface SortOptionCardProps {
    option: string;
    optionsSelected: OptionsSelected;
    setOptionsSelected: Dispatch<SetStateAction<OptionsSelected>>;
    parent: RefObject<HTMLDivElement | null>;
}

const SortOptionCard: FC<SortOptionCardProps> = ({ option, optionsSelected, setOptionsSelected, parent }) => {

    const selfRef = useRef<HTMLDivElement>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isAsc, setIsAsc] = useState<boolean>(true);

    const handleClick = () => {
        if (isSelected) {
            if (!isAsc) {
                setIsSelected(false);
                setOptionsSelected(prev => {
                    return {
                        ...prev,
                        sortBySelected: prev.sortBySelected.filter(item => item !== option)
                    };
                });
            }
            setIsAsc(!isAsc);
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

    useScrollToCenter({ self: selfRef, parent: parent, cond: isSelected });

    useEffect(() => {
        if (optionsSelected.sortBySelected.length === 0) {
            setIsSelected(false);
            setIsAsc(true);
            if (parent.current) parent.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }, [optionsSelected.sortBySelected]);

    const sortOptionCard = useClassNameBuilder('SortOptionCard', [{ cond: isSelected, class: 'optionSelected' }]);
    const ascIndicator = useClassNameBuilder('AscIndicator', [
        { cond: isAsc, class: 'asc' },
        { cond: isSelected, class: 'optionSelected' }
    ]);

    return (
        <div className={sortOptionCard} onClick={handleClick} key={option} ref={selfRef}>
            {option}
            <div className={ascIndicator}/>
        </div>
    );
};

export default SortOptionCard;