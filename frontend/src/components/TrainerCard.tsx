import React, { useEffect, useRef, useState } from "react";
import "./styles/TrainerCard.scss";
import DescriptionContainer from "./DescriptionContainer";

interface TrainerCardProps {}

const TrainerCard: React.FC<TrainerCardProps> = () => {

    const [bagItemCount, setBagItemCount] = useState<number>(0);

    return (
        <div className="TrainerCard">
            <div className="TrainerBackground">
                <div className="TrainerImage"><div className="TrainerAvatar"/></div>
            </div>
            <div className="TrainerInfo">
                <div className="Name">May</div>
                <DescriptionContainer/>
                <div className="TrainerOptions">
                    <div className="TeamPresets">
                        <div className="PresetsInner">
                            <div className="PresetsIcon"/>
                            <div className="PresetsTitle">Presets</div>
                        </div>
                    </div>
                    <div className="Bag">
                        <div className="ItemCount">{bagItemCount}</div>
                    </div>
                </div>
            </div>
            <div className="ControlsContainer">
                <div className="Randomize"/>
                <div className="Reset"/>
            </div>
        </div>
    )

};

export default TrainerCard;