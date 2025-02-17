import React, { FC, Ref, RefObject, useEffect, useMemo, useRef } from "react";
import useClassNameBuilder from "../../hooks/useClassNameBuilder";
import { useTooltip } from "../../contexts/TooltipContext";
import { ConditionsData } from "./FilterOptionCard";
import './styles/FilterOptionButton.scss';

interface FilterOptionButtonProps {
    condition: string;
    isSelected: boolean;
    conditionsData: ConditionsData;
    conditionMenuOpen: boolean;
    handleConditionChange: (e: any) => void;
    handleConditionMenuChange: (e: any, isOpening: boolean) => void;
    additionalClassNames?: { cond: boolean, class: string }[];
}

const FilterOptionButton: FC<FilterOptionButtonProps> = ({ 
        condition, isSelected, conditionsData, 
        conditionMenuOpen, additionalClassNames = [],
        handleConditionChange, handleConditionMenuChange 
}) => {

    // Component refs
    const selfRef = useRef<HTMLDivElement>(null);

    // Register with the tooltip based on if condtion menu is open
    const { registerTooltip, unregisterTooltip } = useTooltip();

    useEffect(() => {
        if (!selfRef.current) return;
    
        const currentRef = selfRef.current;
        conditionMenuOpen ? registerTooltip(currentRef, conditionsData[currentRef.id]?.title || '') : unregisterTooltip(currentRef);
    
        return () => unregisterTooltip(currentRef);
    }, [conditionMenuOpen, conditionsData]);

    // Build conditional className for scss 
    const filterOptionButton = useClassNameBuilder('FilterOptionButton', [
        { cond: isSelected, class: 'isClickable' }, ...additionalClassNames
    ]);

    return (
        <div 
            className={filterOptionButton} 
            ref={selfRef}
            onClick={(e) => conditionMenuOpen ? handleConditionChange(e) : handleConditionMenuChange(e, true)}
            key={condition} 
            id={condition}
        >
            {condition}
        </div>
    );
};

export default FilterOptionButton;