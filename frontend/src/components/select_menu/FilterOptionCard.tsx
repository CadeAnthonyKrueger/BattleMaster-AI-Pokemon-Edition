import React, { Dispatch, FC, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/FilterOptionCard.scss";
import { FilterOptions, OptionsSelected } from "../../views/SelectMenu";
import useScrollToCenter from "../../hooks/useScrollToCenter";
import useClassNameBuilder from "../../hooks/useClassNameBuilder";
import FilterConditionContainer from "./FilterConditionContainer";

export interface ConditionsData {
    [key: string]: {
        title: string;
        placeholder: string;
    }
}
interface FilterOptionCardProps {
    option: FilterOptions;
    optionsSelected: OptionsSelected;
    setOptionsSelected: Dispatch<SetStateAction<OptionsSelected>>;
    parent: RefObject<HTMLDivElement | null>;
}

const FilterOptionCard: FC<FilterOptionCardProps> = ({ option, optionsSelected, setOptionsSelected, parent }) => {

    // Filter option selected state
    const [isSelected, setIsSelected] = useState<boolean>(false);

    // Filter condition states
    const [conditionState, setConditionState] = useState({ selected: '≥', list: ['≥'] });
    // const conditionMenuOpen = conditionState.list.length > 1;
    const betweenConditionSelected = conditionState.selected === '⇄';
    
    // Filter input states
    const [inputValues, setInputValues] = useState<{ lhs: string, rhs: string }>({ lhs: '', rhs: '' });

    // Component refs
    const selfRef = useRef<HTMLDivElement>(null);
    const inputTextRef = useRef<HTMLInputElement>(null);

    // Conditions data
    const conditionsData: ConditionsData = {
        '≥': { title: 'Greater Than or Equal To', placeholder: '0' },
        '=': { title: 'Equal To', placeholder: option.min.toString() },
        '≤': { title: 'Less Than or Equal To', placeholder: option.max.toString() },
        '⇄': { title: 'Between', placeholder: option.max.toString() }
    };  
    
    // Helper for restoring default filter options
    const restoreDefaults = () => {
        setConditionState({ selected: '≥', list: ['≥'] });
        setInputValues({ lhs: '', rhs: '' });
        if (inputTextRef.current) inputTextRef.current.placeholder = '0';
    };

    // Hook used to center most recently selected filter option
    useScrollToCenter({ self: selfRef, parent: parent, cond: isSelected });

    // Clear lefthand input when unselecting between (⇄) condition
    useEffect(() => {
        if (!betweenConditionSelected) {
            setInputValues(prev => { return { ...prev, lhs: '' } });
        }
    }, [betweenConditionSelected]);

    // Reset all cards when no filters are selected, used for when the parent's reset button is clicked
    useEffect(() => {
        console.log(optionsSelected.filtersSelected.length);
        if (optionsSelected.filtersSelected.length === 0) {
            setIsSelected(false);
            restoreDefaults();
            if (parent.current) parent.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }, [optionsSelected.filtersSelected]);

    // Handle filter button click for allowing/disallowing interactivity
    const handleClick = () => {
        const title = option.title;
        setOptionsSelected(prev => {
            return {
                ...prev,
                filtersSelected: isSelected ? prev.filtersSelected.filter(item => item !== title) : [...prev.filtersSelected, title]
            };
        });
        if (isSelected) { restoreDefaults(); }
        setIsSelected(prev => !prev);
    };

    // Handle when the condition menu opens or closes
    const handleConditionMenuChange = (e: any, isOpening: boolean) => {
        e.stopPropagation();
        if (isOpening) {
            const { ref, parentRef } = { ref: selfRef.current, parentRef: parent.current };
            setTimeout(() => {
                if (ref && parentRef) {
                    const refRightEdge = ref.offsetLeft + ref.offsetWidth; // The right edge of the element
                    const parentRightEdge = parentRef.scrollLeft + parentRef.clientWidth; // The right edge of the visible area
    
                    if (refRightEdge > parentRightEdge) {
                        // Scroll just enough to make the right edge fully visible
                        parentRef.scrollTo({ left: refRightEdge - parentRef.clientWidth, behavior: "smooth" });
                    }
                }
            }, 300);
            setConditionState(prev => { return { ...prev, list: Object.keys(conditionsData) } });
        } else {
            setConditionState(prev => { return { ...prev, list: [prev.selected === '⇄' ? '≥' : prev.selected] } });
        }
    };

    // Handle user input and ensure it's within bounds
    const handleInputChange = (e: any, isLHS: boolean) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) {
            const numValue = val === '' ? '' : parseInt(val, 10);
            const cond = Number.isNaN(parseInt(inputValues.lhs)) ? Infinity : parseInt(inputValues.lhs);
            if (numValue === '' || (numValue <= Math.min(!isLHS ? cond : Infinity, option.max))) {
                setInputValues(prev => { return { lhs: isLHS ? val : prev.lhs, rhs: !isLHS ? val : prev.rhs } });
            }
        }
    };

    // Build conditional classNames for scss
    const filterOptionCard = useClassNameBuilder('FilterOptionCard', [{ cond: isSelected, class: 'optionSelected' }]);

    return (
        <div 
            className={filterOptionCard} 
            onClick={handleClick} 
            onMouseLeave={(e) => handleConditionMenuChange(e, false)}
            key={option.title}
            ref={selfRef}
        >
            {betweenConditionSelected && <FilterConditionContainer 
                isLHS={true} 
                inputValues={inputValues} 
                handleInputChange={handleInputChange}
                handleConditionMenuChange={handleConditionMenuChange}
                isSelected={isSelected} 
                conditionState={conditionState} 
                setConditionState={setConditionState}
                conditionsData={conditionsData}
                inputTextRef={inputTextRef} 
                option={option} 
            />}
            {option.title}
            <FilterConditionContainer 
                isLHS={false} 
                inputValues={inputValues} 
                handleInputChange={handleInputChange}
                handleConditionMenuChange={handleConditionMenuChange}
                isSelected={isSelected} 
                conditionState={conditionState} 
                setConditionState={setConditionState}
                conditionsData={conditionsData}
                inputTextRef={inputTextRef} 
                option={option} 
            />
        </div>
    );
};

export default FilterOptionCard;