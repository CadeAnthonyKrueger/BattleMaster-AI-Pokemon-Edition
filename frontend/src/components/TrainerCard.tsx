import React, { RefObject, useEffect, useRef, useState } from "react";
import "./styles/TrainerCard.scss";
import "./styles/SharedStyles.scss";
import "./styles/SettingButton.scss";
import DescriptionContainer from "./DescriptionContainer";
import ControlsContainer from "./ControlsContainer";
import SettingButton from "./SettingButton";
import { useOverlay } from "../utilities/OverlayContext";
import { TrainerSelectOverlay } from "../utilities/Overlays";

interface TrainerCardProps {
    isSelect?: boolean;
    isMinimized?: boolean;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ isSelect = false, isMinimized = false }) => {

    const [iconOnly, setIconOnly] = useState<boolean>(false);

    const buttonRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const [refWidths, setRefWidths] = useState<{ button: number; title: number; icon: number }>();

    useEffect(() => {
        const { bRef, tRef, iRef } = { bRef: buttonRef.current, tRef: titleRef.current, iRef: iconRef.current };

        if (!bRef || !tRef || !iRef) return;

        setRefWidths(() => {
            return {
                button: bRef.getBoundingClientRect().width, 
                title: tRef.getBoundingClientRect().width, 
                icon: iRef.getBoundingClientRect().width
            }
        });

    }, [buttonRef, titleRef, iconRef]);

    useEffect(() => {
        const { bRef, tRef, iRef } = { 
            bRef: buttonRef.current, tRef: titleRef.current, iRef: iconRef.current 
        };

        if (!bRef) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width } = entry.contentRect;
                let { titleWidth, iconWidth } = { titleWidth: 0, iconWidth: 0 };
                if (tRef) { titleWidth = tRef.getBoundingClientRect().width; }
                if (iRef) { iconWidth = iRef.getBoundingClientRect().width; }
                setRefWidths((prev) => {
                    if (!prev) return;
                    return {
                            button: width !== 0 ? width : prev.button,
                            title: titleWidth !== 0 ? titleWidth : prev.title,
                            icon: iconWidth !== 0 ? iconWidth : prev.icon
                    };
                });       
            }
        });

        resizeObserver.observe((bRef as HTMLDivElement));

        return () => {
            resizeObserver.disconnect();
        };

    }, [buttonRef, titleRef, iconRef, iconOnly]);

    useEffect(() => {
        if (!refWidths) return;
        
        const { button: buttonWidth, title: titleWidth, icon: iconWidth } = refWidths;
        //console.log(buttonWidth)
        if (iconWidth + titleWidth >= buttonWidth - 15) {
            setIconOnly(true);
        } else if (iconWidth + titleWidth < buttonWidth - 5) {
            setIconOnly(false);
        }
    }, [refWidths]);

    const { addOverlay } = useOverlay();

    useEffect(() => {
        addOverlay({
            className: "TrainerSelect Overlay",
            component: TrainerSelectOverlay,
            props: {},
            flag: true
        });
    }, []);

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [bagItemCount, setBagItemCount] = useState<number>(0);

    return (
        <div className={`TrainerCard ${isMinimized ? 'minimized' : ''}`}>
            <div className={`TrainerBackground ${isMinimized ? 'minimized' : ''}`}>
                <div className="TrainerImage Sprite">
                    <div className="TrainerAvatar"/>
                    {isMinimized && <div className="CardTitle" style={{ position: 'absolute', top: '5px', left: '10px', borderBottom: 'none' }}>
                        May
                        <div className="CardTitleShadow" style={{ color: 'rgb(251, 0, 0)' }}>May</div>
                    </div>}
                    {!isSelect && <div className="Edit tc" style={{ backgroundImage: `url('/assets/edit.png')`, filter: 'invert(1)' }}/>}
                </div>
            </div>
            {!isMinimized && <div className="TrainerInfo">
                <div className="CardTitle">
                    May
                    <div className="CardTitleShadow" style={{ color: 'rgb(251, 0, 0)' }}>May</div>
                </div>
                <DescriptionContainer/>
                {!isSelect && <div className="TrainerOptions">
                    <SettingButton title="Presets" image={`pokeball_icon${!isHovered ? '_bw' : ''}.png`} 
                        styleName="tc" states={[setIsHovered]} refs = {[buttonRef, titleRef, iconRef]}
                        iconOnly={iconOnly}
                    />
                    <div className="Bag">
                        <div className="ItemCount">{bagItemCount}</div>
                    </div>
                </div>}
            </div>}
            {!isSelect && <ControlsContainer container='TrainerCard'/>}
        </div>
    )

};

export default TrainerCard;