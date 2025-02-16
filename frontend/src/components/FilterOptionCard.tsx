import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import "./styles/FilterOptionCard.scss";
import { FilterOptions, OptionsSelected } from "../views/SelectMenu";

interface FilterOptionCardProps {
    option: FilterOptions;
    optionsSelected: OptionsSelected;
    setOptionsSelected: Dispatch<SetStateAction<OptionsSelected>>;
}

const FilterOptionCard: FC<FilterOptionCardProps> = ({ option, optionsSelected, setOptionsSelected }) => {

    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [conditionMenuOpen, setConditionMenuOpen] = useState<boolean>(false);
    const [conditions, setConditions] = useState<string[]>(['>']);
    const [beforeConditions, setBeforeConditions] = useState<string[]>(['>']);
    const [conditionSelected, setConditionSelected] = useState<string>('>');
    const [betweenConditionSelected, setBetweenConditionSelected] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>('');
    const [inputTextBefore, setInputTextBefore] = useState<string>('');

    const handleClick = () => {
        const title = (option as FilterOptions).title;
        setOptionsSelected(prev => {
            return {
                ...prev,
                filtersSelected: isSelected ? prev.filtersSelected.filter(item => item !== title) : [...prev.filtersSelected, title]
            };
        });
        setIsSelected(prev => !prev);
        if (isSelected) {
            setConditionSelected('>');
            setConditions(['>']);
            setBetweenConditionSelected(false);
            setInputText('');
            setInputTextBefore('');
        }
    };

    useEffect(() => {
        if (optionsSelected.filtersSelected.length === 0) {
            setIsSelected(false);
        }
    }, [optionsSelected.filtersSelected]);

    const handleConditionMenuChange = (e: any, isOpening: boolean) => {
        e.stopPropagation();
        if (isOpening) {
            setConditionMenuOpen(prev => !prev);
            setConditions(['>', '=', '<', '⇄']);
            setBeforeConditions(['>', 'x']);
        } else {
            setConditionMenuOpen(false);
            setConditions([conditionSelected]);
            setBeforeConditions([conditionSelected]);
        }
    };

    const handleConditionChange = (e: any) => {
        let cond = e.target.id;
        if (cond === '⇄') {
            setBetweenConditionSelected(prev => !prev);
            cond = '>';
        }
        if (cond === 'x') {
            setBetweenConditionSelected(false);
            cond = '>';
        }
        if (cond === '=' || cond === '<') {
            setBetweenConditionSelected(false);
        }
        e.stopPropagation();
        setConditionSelected(cond);
        setConditions([cond]);
        setBeforeConditions([cond]);
        setConditionMenuOpen(false);
    };

    const handleInputChange = (e: any, isBefore: boolean) => {
        const val = e.target.value;
    
        if (/^\d*$/.test(val)) {
            const numValue = val === '' ? '' : parseInt(val, 10);

            if (numValue === '' || (numValue <= option.max)) {
                isBefore? setInputTextBefore(val) : setInputText(val);
            }
        } else {
            e.target.setCustomValidity('Error')
        }
    };

    useEffect(() => {
        if (!betweenConditionSelected) {
            setInputTextBefore('');
        }
    }, [betweenConditionSelected]);

    return (
        <div 
            className={`FilterOptionCard ${isSelected ? 'optionSelected' : ''}`} 
            onClick={handleClick} 
            onMouseLeave={(event) => handleConditionMenuChange(event, false)}
        >
            {betweenConditionSelected && <div className={`FilterConditionContainer`}>
                <input 
                    className={`NumberConditionInput ${isSelected ? 'isWritable' : ''}`} 
                    onClick={(event) => { event.stopPropagation(); setConditionMenuOpen(false); }}
                    type='text'
                    value={inputTextBefore}
                    onChange={(e) => handleInputChange(e, true)}
                    placeholder={option.max.toString()}
                />
                <div className='ConditionOptionsMenu' style={{ width: `${25 * (conditionMenuOpen ? beforeConditions.length : 1)}px`}}>
                    {beforeConditions.map((cond) => 
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
            </div>}
            {option.title}
            <div className={`FilterConditionContainer`}>
                <div className='ConditionOptionsMenu' style={{ width: `${25 * (conditionMenuOpen ? conditions.length : 1)}px`}}>
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
                <input 
                    className={`NumberConditionInput ${isSelected ? 'isWritable' : ''}`} 
                    onClick={(event) => { event.stopPropagation(); setConditionMenuOpen(false); }}
                    type='text'
                    value={inputText}
                    onChange={(e) => handleInputChange(e, false)}
                    placeholder={option.min.toString()}
                />
            </div>
        </div>
    );
};

export default FilterOptionCard;