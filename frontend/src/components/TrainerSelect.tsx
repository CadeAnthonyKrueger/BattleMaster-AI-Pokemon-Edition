import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/TrainerSelect.scss";
import SearchBar from "./SearchBar";
import LayoutIcon from "./LayoutIcon";
import TrainerSelectCardContainer from "./TrainerSelectCardContainer";
import CardTitleContainer from "./CardTitleContainer";
import { TrainerSchema } from "../requests/TrainerRequests";

interface TrainerSelectProps {
    trainers: TrainerSchema[];
    setTrainers: Dispatch<SetStateAction<TrainerSchema[]>>;
}

const TrainerSelect: React.FC<TrainerSelectProps> = ({ trainers, setTrainers }) => {

    const [layoutSelected, setLayoutSelected] = useState<boolean>(false);

    useEffect(() => {
        console.log("TrainerSelect mounted");
        return () => {
            console.log("TrainerSelect unmounted");
        }
    }, []);

    const handleLayoutChange = () => { setLayoutSelected(prev => !prev); };

    return (
        <div className="TrainerSelect">
            <CardTitleContainer text={'Trainer Select'} style={{ width: '95%', marginTop: '3.65px' }}/>
            <div className="SearchContainer">
                <SearchBar/>
                <div className="Filter"/>
                <div className="LayoutContainer">
                    <LayoutIcon layout="Small Icons" isSelected={layoutSelected} onClick={handleLayoutChange}/>
                    <LayoutIcon layout="Large Icons" isSelected={!layoutSelected} onClick={handleLayoutChange}/>
                </div>
            </div>
            <TrainerSelectCardContainer trainers={trainers} setTrainers={setTrainers} layout={layoutSelected}/>
        </div>
    );

};

export default TrainerSelect;
