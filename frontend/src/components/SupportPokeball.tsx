import React, { RefObject, useEffect, useRef } from "react";
import "./styles/SupportPokeball.scss";
import SpriteSheetMap from "../utilities/SpriteSheetMap";
import { useTooltip } from "../utilities/TooltipContext";

interface SupportPokeballProps {}

const SupportPokeball: React.FC<SupportPokeballProps> = () => {

    const spriteSheetRef = useRef<SpriteSheetMap>(null);

    const spin = () => {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            spriteSheetRef.current?.decrementSprite();
            if (count === 7) { clearInterval(interval) };
        }, 100);
    
        return () => clearInterval(interval);
    };

    useEffect(() => {
        if (spriteSheetRef.current) {
            //spin();
        }
    }, []);

    const self = useRef<HTMLDivElement>(null);
    const { registerTooltip, unregisterTooltip } = useTooltip();

    useEffect(() => {
        if (self.current) {
            registerTooltip((self as RefObject<HTMLDivElement>), 'Help', 'left');
        }
    }, [self]);

    return (
        <div className="SupportPokeball" ref={self} onMouseDown={spin}>
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
