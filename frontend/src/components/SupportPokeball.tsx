import React, { useEffect, useRef } from "react";
import "./styles/SupportPokeball.scss";
import SpriteSheetMap from "../utilities/SpriteSheetMap";

interface SupportPokeballProps {}

const SupportPokeball: React.FC<SupportPokeballProps> = () => {

    const spriteSheetRef = useRef<SpriteSheetMap>(null);

    const spin = () => {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            spriteSheetRef.current?.decrementSprite();
            //if (count === 7) { clearInterval(interval) };
        }, 100);
    
        return () => clearInterval(interval);
    };

    useEffect(() => {
        if (spriteSheetRef.current) {
            //spin();
        }
    }, []);

    return (
        <div className="SupportPokeball">
            <SpriteSheetMap 
                ref={spriteSheetRef} 
                src="hd_pokeball_sheet.png" 
                rows={1} 
                cols={7}
            />
        </div>
    );

};

export default SupportPokeball;
