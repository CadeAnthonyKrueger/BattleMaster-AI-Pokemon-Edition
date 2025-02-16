import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/SelectSearchContainer.scss";
import SearchBar from "../SearchBar";
import LayoutIcon from "../LayoutIcon";
import { useTooltip } from "../../contexts/TooltipContext";
import { OptionsSelected } from "../../views/SelectMenu";

interface SelectSearchContainerProps {
    filterClicked: boolean;
    sortByClicked: boolean;
    setFilterClicked: Dispatch<SetStateAction<boolean>>;
    setSortByClicked: Dispatch<SetStateAction<boolean>>;
    optionsSelected: OptionsSelected;
}

const SelectSearchContainer: FC<SelectSearchContainerProps> = ({ 
    filterClicked, sortByClicked, setFilterClicked, setSortByClicked, optionsSelected 
}) => {

    // Layout vars
    const [layoutSelected, setLayoutSelected] = useState<boolean>(false);
    const handleLayoutChange = () => { setLayoutSelected(prev => !prev); };

    // Tooltip setup
    const tooltipItems = ['Filter By', 'Sort By', 'Small Icons', 'Large Icons'];
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const { registerTooltip } = useTooltip();

    useEffect(() => {
        refs.current.forEach((element, index) => {
            if (element) {
                registerTooltip(element, tooltipItems[index]);
            }    
        });
    }, [refs]);

    return (
        <div className="SelectSearchContainer">
            <SearchBar/>
            <div 
                className={`Filter ${optionsSelected.filtersSelected.length > 0 ? 'optionsSelected' : ''} ${filterClicked ? 'isOpen' : ''}`} 
                ref={(el) => { refs.current[0] = el; }} 
                onClick={() => setFilterClicked(prev => !prev)}
            />
            <div 
                className={`SortBy ${optionsSelected.sortBySelected.length > 0 ? 'optionsSelected' : ''} ${sortByClicked ? 'isOpen' : ''}`} 
                ref={(el) => { refs.current[1] = el; }} 
                onClick={() => setSortByClicked(prev => !prev)}
            />
            <div className="LayoutContainer">
                <LayoutIcon layout="Small Icons" ref={(el) => { refs.current[2] = el; }} isSelected={layoutSelected} onClick={handleLayoutChange}/>
                <LayoutIcon layout="Large Icons" ref={(el) => { refs.current[3] = el; }} isSelected={!layoutSelected} onClick={handleLayoutChange}/>
            </div>
        </div>
    );
};

export default SelectSearchContainer;