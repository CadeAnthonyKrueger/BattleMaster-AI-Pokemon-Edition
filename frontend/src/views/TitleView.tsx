import React, { RefObject, useEffect, useRef, useState } from "react";
import "./styles/TitleView.scss";
import { useNavigate } from "react-router-dom";

const TitleView = ({ introRef }: { introRef: RefObject<HTMLDivElement | null> }) => {

    const [isAnimated, setIsAnimated] = useState<boolean>(true);
    const [canClick, setCanClick] = useState<boolean>(false);
    const [startOpacity, setStartOpacity] = useState<number>(0);

    const titleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ref = titleRef.current;
        if (ref) {
            setTimeout(() => {
                ref.style.opacity = '1';
            }, 2000);
            setTimeout(() => {
                setIsAnimated(false);
                setCanClick(true);
                setStartOpacity(1);
            }, 4000);
        }
    }, [titleRef]);

    useEffect(() => {
        const toggleAnimation = () => {
            setIsAnimated(true);
            setTimeout(() => {
                setIsAnimated(false);
            }, 4000);
        };
        const intervalId = setInterval(toggleAnimation, 5000);
        return () => clearInterval(intervalId);
    }, [isAnimated]);

    const navigate = useNavigate();

    const startSetup = () => {
        const ref = introRef.current;
        if (ref) {
            ref.style.opacity = '0';
            ref.style.filter = 'blur(10px)';
            setTimeout(() => {
                navigate('/setup');
            }, 1000);
        }
    };

    return (
        <div className="TitleView" onClick={startSetup} style={{ 
                cursor: `${canClick ? 'pointer' : 'default'}`, 
                pointerEvents: `${canClick ? 'all' : 'none'}` 
            }}>
            <div className="GameTitle" ref={titleRef} style={{
                backgroundImage: 'url("/assets/game_title.png")',
                opacity: '0'
            }}/>
            <div className="GameTitle glimmer title" style={{ zIndex: 10000 }}>
                <div className={`Glimmer ${isAnimated ? 'animate' : ''}`}/>
            </div>
            <div className={`StartIndicator glimmer indicator`} style={{ opacity: `${startOpacity}` }}>
                <div className={`Glimmer ${isAnimated ? 'animate' : ''}`}/>
            </div>
        </div>
    );
};

export default TitleView;