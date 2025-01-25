import React, { useEffect, useRef, useState } from "react";
import "./styles/PokemonCard.scss";
import SpriteSheetMap from "../utilities/SpriteSheetMap";

interface PokemonCardProps {
    pokemonInstance: string;
    position: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonInstance, position }) => {

    const spriteSheetRef = useRef<SpriteSheetMap>(null);
    const [columns, setColumns] = useState<number>(1);
    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    const cycle = () => {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            spriteSheetRef.current?.decrementSprite();
            //if (count === 7) { clearInterval(interval) };
        }, 120);
    
        return () => clearInterval(interval);
    };

    useEffect(() => {
        const img = new Image();
        img.onload = () => { setColumns(img.width / img.height); };
        img.src = `/assets/${pokemonInstance}`;
    }, []);

    useEffect(() => {
        !isAnimated || cycle();
    }, [isAnimated]);

    return (
        <div className="PokemonCard">
            {position < 3 && <div className="PokemonBackground"/>}
            <div className='ImageContainer'>
                <SpriteSheetMap 
                    ref={spriteSheetRef} 
                    src={`${pokemonInstance}`} 
                    rows={1} 
                    cols={columns}
                />
            </div>
        </div>
    );

};

export default PokemonCard;