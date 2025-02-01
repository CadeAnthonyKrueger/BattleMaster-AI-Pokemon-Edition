import React, { RefObject, useEffect, useRef, useState } from "react";
import "./styles/TrainerSelectCardContainer.scss";
import TrainerCard from "./TrainerCard";

interface TrainerSelectCardContainerProps {
    layout: boolean;
}

const TrainerSelectCardContainer: React.FC<TrainerSelectCardContainerProps> = ({ layout }) => {

    const arr = Array.from({ length: 15 }, (_, i) => i);
    //const []

    return (
        <div className="TrainerSelectCardContainer">
            {arr.map(() => <TrainerCard isSelect={true} isMinimized={layout}/>)}
        </div>
    );

};

export default TrainerSelectCardContainer;