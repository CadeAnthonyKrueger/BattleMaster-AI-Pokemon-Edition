import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import "./styles/FilterOptionCard.scss";

interface FilterConditionContainerProps {
    isSelected: boolean;
    isBefore: boolean;
    setBetweenConditionSelected?: Dispatch<SetStateAction<boolean>>;
}

const FilterConditionContainer: FC<FilterConditionContainerProps> = ({ isSelected, isBefore, setBetweenConditionSelected = null }) => {

    const [conditionMenuOpen, setConditionMenuOpen] = useState<boolean>(false);
    const [conditions, setConditions] = useState<string[]>(['>']);
    const [conditionSelected, setConditionSelected] = useState<string>('>');
    const [inputText, setInputText] = useState<string>('0');

    const handleConditionMenuChange = (e: any, isOpening: boolean) => {
        e.stopPropagation();
        if (isOpening) {
            setConditionMenuOpen(prev => !prev);
            setConditions(isBefore ? ['>', '<', 'x'] : ['>', '=', '<', '⇄']);
        } else {
            setConditionMenuOpen(false);
            setConditions([conditionSelected]);
        }
    };

    const handleConditionChange = (e: any) => {
        let cond = e.target.id;
        if (cond === '⇄') {
            if (setBetweenConditionSelected) setBetweenConditionSelected(true);
            cond = '>';
        }
        e.stopPropagation();
        setConditionSelected(cond);
        setConditions([cond]);
        setConditionMenuOpen(false);
    };

    useEffect(() => {
        if (isSelected) {
            setConditionSelected('>');
            setConditions(['>']);
            setInputText('0');
            if (setBetweenConditionSelected) setBetweenConditionSelected(false);
        }
    }, [isSelected]);

    const inputSection = () => {
        return (
            <input 
                className={`NumberConditionInput ${isSelected ? 'isWritable' : ''}`} 
                placeholder="0" 
                onClick={(event) => event.stopPropagation()}
                type='text'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)} 
            />
        );
    };

    return (
        <div className={`FilterConditionContainer`}>
            {isBefore && inputSection()}
            <div className={`ConditionOptionsMenu ${conditionMenuOpen ? 'menuOpen' : ''}`}>
                {conditions.map((cond) => 
                    <div 
                        className={
                            `ConditionButton 
                            ${isSelected ? 'isClickable' : ''} 
                            ${conditionSelected === cond && conditions.length > 1 ? 'conditionIsSelected' : ''}`
                        } 
                        onClick={(event) => conditionMenuOpen ? handleConditionChange(event) : handleConditionMenuChange(event, true)}
                        key={cond} 
                        id={cond}
                        >
                        {cond}
                    </div>
                )}
            </div>
            {!isBefore && inputSection()}
        </div>
    );
};

export default FilterConditionContainer;