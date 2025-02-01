import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/TrainerSelect.scss";
import SearchBar from "./SearchBar";
import LayoutIcon from "./LayoutIcon";
import TrainerSelectCardContainer from "./TrainerSelectCardContainer";
import { TrainerSchema } from "../requests/TrainerRequests";

interface TrainerSelectProps {}

const TrainerSelect: React.FC<TrainerSelectProps> = () => {

    const [layoutSelected, setLayoutSelected] = useState<boolean>(false);

    const handleLayoutChange = () => { setLayoutSelected(prev => !prev); };

    return (
        <div className="TrainerSelect">
            <div className="CardTitle" style={{ width: '95%', marginTop: '3.65px' }}>
                Trainer Select
                <div className="CardTitleShadow">Trainer Select</div>
            </div>
            <div className="SearchContainer">
                <SearchBar/>
                <div className="Filter"/>
                <div className="LayoutContainer">
                    <LayoutIcon layout="Small Icons" isSelected={layoutSelected} onClick={handleLayoutChange}/>
                    <LayoutIcon layout="Large Icons" isSelected={!layoutSelected} onClick={handleLayoutChange}/>
                </div>
            </div>
            <TrainerSelectCardContainer layout={layoutSelected}/>
        </div>
    );

};

export default TrainerSelect;
