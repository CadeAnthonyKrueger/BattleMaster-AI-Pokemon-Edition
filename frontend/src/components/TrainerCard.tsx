import React, { CSSProperties, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/TrainerCard.scss";
import "./styles/SharedStyles.scss";
import "./styles/SettingButton.scss";
import DescriptionContainer from "./DescriptionContainer";
import ControlsContainer from "./ControlsContainer";
import SettingButton from "./SettingButton";
import { useOverlay } from "../utilities/OverlayContext";
import { TrainerSelectOverlay } from "../utilities/Overlays";
import { fetchTrainerById, TrainerSchema } from "../requests/TrainerRequests";
import { useGlobalState } from "../utilities/GlobalStateStore";
import CardTitleContainer from "./CardTitleContainer";

interface TrainerCardProps {
    id: number;
    trainer: TrainerSchema;
    isSelect?: boolean;
    isMinimized?: boolean;
    cardWidth?: number;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ id, trainer, isSelect = false, isMinimized = false, cardWidth }) => {

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

    const [isClicked, setIsClicked] = useState<boolean>(false);
    const { addOverlay } = useOverlay();

    useEffect(() => {
        if (!isSelect) {
            //console.log('adding overlay')
            addOverlay({
                className: "TrainerSelect Overlay",
                component: TrainerSelectOverlay,
                props: { isClicked, setIsClicked },
                flag: isClicked
            });
        }
    }, [isClicked]);

    const { selectedTrainer, setSelectedTrainer } = useGlobalState();
    const isTrainerChoice = selectedTrainer?.loaded === trainer;

    const handleSelect = () => {
        if (!isSelect || !selectedTrainer) return;
        setSelectedTrainer(prev => {
            return { ...prev, loaded: (prev.loaded === trainer ? prev.default : trainer) }
        });
    };

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [bagItemCount, setBagItemCount] = useState<number>(0);

    const fetchData = async () => {
        try {
            const data: TrainerSchema = await fetchTrainerById(Math.floor(Math.random() * 72) + 1);
            setSelectedTrainer(prev => { return { ...prev, loaded: data, current: data }; });
        } catch (error) {
            console.error("Error fetching trainers:", error);
        }
    };

    const controlFunctions = { 
        'randomize': () => fetchData(), 
        'reset': () => setSelectedTrainer(prev => { return { ...prev, current: prev.default } })
    };

    return (
        <div className={
            `TrainerCard ${isMinimized ? 'minimized' : ''} ${isSelect ? 'select' : ''} ${isSelect && isTrainerChoice ? 'choice' : ''} ${isSelect && cardWidth ? 'isLastRow' : ''}`
        } onClick={handleSelect} id={`${id}`} style={cardWidth ? { width: cardWidth } : {}}>
            <div className={`TrainerBackground ${isMinimized ? 'minimized' : ''}`} style={{ 
                    background: `radial-gradient(circle at 50% 160%, ${trainer.color} 60%, rgba(0, 0, 0, 0) 80%)` }}
                >
                <div className="TrainerImage Sprite" onClick={() => isSelect ? undefined : setIsClicked(true)} style={{ 
                    backgroundImage: trainer.image && trainer.image.slice(0, 1) === '/' ? `url('${trainer.image}')` : `url('http://localhost:3001/${trainer.image}')` 
                }}>
                    <div className="TrainerAvatar"/>
                    {isMinimized && <CardTitleContainer text={trainer.name} color={trainer.color} wrap={true} fontSize={11} style={{
                        position: 'absolute', top: '0', left: '0', borderBottom: 'none', backgroundColor: 'rgba(24, 24, 24, 0.7)',
                        width: '100%', paddingLeft: '5%', paddingRight: '5%', paddingTop: '5%', boxSizing: 'border-box'
                    }}/>}
                    {!isSelect && <div className="Edit tc" style={{ backgroundImage: `url('/assets/edit.png')`, filter: 'invert(1)' }}/>}
                </div>
            </div>
            {!isMinimized && <div className="TrainerInfo">
                <CardTitleContainer text={trainer.name} width={isSelect ? 100 : 80} color={trainer.color} wrap={true}/>
                <DescriptionContainer description={trainer.description} overflow={isSelect}/>
                {!isSelect && <div className="TrainerOptions">
                    <SettingButton title="Presets" image={`pokeball_icon.png`} 
                        styleName="tc" refs={[buttonRef, titleRef, iconRef]} iconOnly={iconOnly}
                    />
                    <div className="Bag">
                        <div className="ItemCount">{bagItemCount}</div>
                    </div>
                </div>}
            </div>}
            {!isSelect && <ControlsContainer functions={controlFunctions} container='TrainerCard'/>}
        </div>
    )

};

export default TrainerCard;