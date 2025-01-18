import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import NavigationView from "./views/NavigationView";
import TrainerView from "./views/TrainerView";
import OverlayPane from "./views/OverlayPane";
import { OverlayProvider } from "./utilities/OverlayContext";

const App = () => {

    const showDimensions = true;

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
        <div className="App">
            {showDimensions && <div className='Dimension width'>{screenSize.width}</div>}
            {showDimensions && <div className='Dimension height'>{screenSize.height}</div>}
            <div className="AppBackground"/>
            <OverlayProvider>
                <div className="ContentPane">
                    <NavigationView/>
                    <TrainerView/>
                </div>
                <OverlayPane/>
            </OverlayProvider>
        </div>
    )

};

export default App;