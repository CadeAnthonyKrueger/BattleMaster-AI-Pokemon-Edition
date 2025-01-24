import React, { useEffect, useRef, useState } from "react";
import "./styles/TrainerCard.scss";
import "./styles/SharedStyles.scss";
import "./styles/SettingButton.scss";
import DescriptionContainer from "./DescriptionContainer";
import ControlsContainer from "./ControlsContainer";
import SettingButton from "./SettingButton";

interface TrainerCardProps {}

const TrainerCard: React.FC<TrainerCardProps> = () => {

    const buttonRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);

    const [iconOnly, setIconOnly] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    
    const [bagItemCount, setBagItemCount] = useState<number>(0);

    return (
        <div className="TrainerCard">
            <div className="TrainerBackground">
                <div className="TrainerImage"><div className="TrainerAvatar"/></div>
            </div>
            <div className="TrainerInfo">
                <div className="CardTitle">
                    May
                    <div className="CardTitleShadow" style={{ color: 'rgb(251, 0, 0)' }}>May</div>
                </div>
                <DescriptionContainer/>
                <div className="TrainerOptions">
                    <SettingButton title="Presets" image={`pokeball_icon${!isHovered ? '_bw' : ''}.png`} refs={[buttonRef, titleRef]} 
                        iconOnly={iconOnly} styleName="tc" states={[setIsHovered]}
                    />
                    <div className="Bag">
                        <div className="ItemCount">{bagItemCount}</div>
                    </div>
                </div>
            </div>
            <ControlsContainer/>
        </div>
    )

};

export default TrainerCard;