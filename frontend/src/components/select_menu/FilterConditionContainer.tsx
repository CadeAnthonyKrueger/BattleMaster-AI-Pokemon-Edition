import React, { FC } from "react";
import FilterOptionButton from "./FilterOptionButton";
import useClassNameBuilder from "../../hooks/useClassNameBuilder";
import './styles/FilterConditionContainer.scss';

interface FilterConditionContainerProps {
    isLHS: boolean;
    inputValues: { lhs: string; rhs: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, isLhs: boolean) => void;
    handleConditionMenuChange: (e: React.MouseEvent<HTMLDivElement | HTMLInputElement>, isOpening: boolean) => void;
    isSelected: boolean;
    conditionState: { selected: string; list: string[] };
    setConditionState: (state: { selected: string; list: string[] }) => void;
    conditionsData: Record<string, { title: string; placeholder: string }>;
    inputTextRef: React.RefObject<HTMLInputElement | null>;
    option: { min: number, max: number };
}

const FilterConditionContainer: FC<FilterConditionContainerProps> = ({ 
    isLHS, inputValues, handleInputChange, handleConditionMenuChange, isSelected, 
    conditionState, setConditionState, conditionsData, inputTextRef, option 
}) => {

    const conditionMenuOpen = conditionState.list.length > 1;

    // Handle when a new filter option is selected
    const handleConditionChange = (e: any) => {
        e.stopPropagation();
        const value = e.target.id === '⇄' ? '≥' : e.target.id;
        setConditionState({ selected: e.target.id, list: [value] });
        if (inputTextRef.current) inputTextRef.current.placeholder = conditionsData[value].placeholder;
    };

    // Build conditional className for scss
    const numberConditionInput = useClassNameBuilder('NumberConditionInput', [{ cond: isSelected, class: 'isWritable' }]);

    // Render the child components conditionally 
    const inputField = () => {
        return (
            <input 
                className={numberConditionInput} 
                onClick={(e) => { handleConditionMenuChange(e, false); }}
                type='text'
                value={isLHS ? inputValues.lhs : inputValues.rhs}
                onChange={(e) => handleInputChange(e, isLHS)}
                placeholder={isLHS ? option.max.toString() : '0'}
                ref={isLHS ? null : inputTextRef}
            />
        );
    };

    const conditionOptionsMenu = () => {
        return (
            <div className='ConditionOptionsMenu' style={isLHS ? {} : { 
                width: `${25 * (conditionMenuOpen ? conditionState.list.length : 1)}px`
            }}>
                {conditionState.list.slice(0, isLHS ? 1 : conditionState.list.length).map((cond) => 
                    <FilterOptionButton 
                        condition={cond} 
                        isSelected={isSelected}
                        conditionsData={conditionsData}
                        conditionMenuOpen={conditionMenuOpen}
                        handleConditionChange={handleConditionChange}
                        handleConditionMenuChange={handleConditionMenuChange}
                        additionalClassNames={isLHS ? [] : [{ 
                            cond: conditionState.selected === cond && conditionState.list.length > 1, class: 'conditionIsSelected' 
                        }]}
                    />
                )}
            </div>
        );
    };

    return (
        <div className='FilterConditionContainer'>
            {isLHS && inputField()}
            {conditionOptionsMenu()}
            {!isLHS && inputField()}
        </div>
    );
};

export default FilterConditionContainer;