import React, { useEffect, useRef, useState } from "react";
import "./styles/PokemonCard.scss";
import SpriteSheetMap from "../utilities/SpriteSheetMap";
import { PokemonInstance } from "./PokemonTeam";

interface PokemonCardProps {
    pokemonInstance: PokemonInstance;
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
        img.src = `/assets/${pokemonInstance.pokemon.image}`;
    }, []);

    useEffect(() => {
        !isAnimated || cycle();
    }, [isAnimated]);

    return (
        <div className="PokemonCard">
            <div className="PokemonCardContent">
                {position < 3 && <div className="PokemonBackground"/>}
                <div className='ImageContainer'>
                    <SpriteSheetMap 
                        ref={spriteSheetRef} 
                        src={pokemonInstance.pokemon.image} 
                        rows={1} 
                        cols={columns}
                    />
                </div>
                <div className="AttributesContainer">
                    <div className="AttributeRow" style={{ backgroundColor: 'none' }}>
                        <div className="NameEditContainer">
                            <div className="PokemonName">{pokemonInstance.pokemon.name}</div>
                            <div className="Edit" style={{ backgroundImage: `url('/assets/edit.png')`, filter: 'invert(1)' }}/>
                        </div>
                        <div className="LevelAndGender">
                            <div className="Level">{`Lvl ${pokemonInstance.level}`}</div>
                            <div className="Gender" style={{ 
                                backgroundImage: `url('/assets/${pokemonInstance.gender === 'male' ? '' : 'fe' }male.png')`
                            }}/>
                        </div>
                    </div>
                    <div className="AttributeRow" style={{ backgroundColor: 'none' }}>
                        <div className="PokedexNumber">{`#${pokemonInstance.pokemon.pokedexNumber}`}</div>
                        <div className="HealthBar" style={{ backgroundImage: `url('/assets/hp_bar.png')` }}/>
                    </div>
                    <div className="AttributeRow" style={{ backgroundColor: 'none' }}>
                        <div className="Types">
                            {pokemonInstance.pokemon.typeIndexes.map((position) => {
                                return <SpriteSheetMap 
                                    ref={null} 
                                    src={'types.png'} 
                                    rows={19} 
                                    cols={1}
                                    startRow={position + 1}
                                />
                            })}
                        </div>
                        <div className="ItemContainer">
                            <div className="Item" style={{ backgroundImage: `url('/assets/REVIVALHERB.png')` }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default PokemonCard;