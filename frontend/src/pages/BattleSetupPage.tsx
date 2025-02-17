import React, { useEffect, useRef, useState } from "react";
import "./styles/BattleSetupPage.scss";
import NavigationView from "../views/NavigationView";
import TrainerView from "../views/TrainerView";
import OverlayPane from "../views/OverlayPane";
import { OverlayProvider } from "../utils/OverlayContext";
import { TooltipProvider } from "../contexts/TooltipContext";

const BattleSetupPage = () => {

    const contentRef = useRef<HTMLDivElement | null>(null);

    const showDimensions = false;

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    
    // Handler to update screen size on resize
    const handleResize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
    };
    
    useEffect(() => {
        // Add event listener to handle screen resize
        window.addEventListener("resize", handleResize);
    
        // Cleanup on unmount
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    return (
        <div className="BattleSetupPage">
            {showDimensions && <div className='Dimension width'>{screenSize.width}</div>}
            {showDimensions && <div className='Dimension height'>{screenSize.height}</div>}
            <div className="BattleSetupBackground"/>
            <TooltipProvider>
                <OverlayProvider>
                    <div className="ContentPane" ref={contentRef}>
                        <NavigationView/>
                        <TrainerView/>
                    </div>
                    <OverlayPane contentRef={contentRef}/>
                </OverlayProvider>
            </TooltipProvider>
        </div>
    )
}

export default BattleSetupPage;