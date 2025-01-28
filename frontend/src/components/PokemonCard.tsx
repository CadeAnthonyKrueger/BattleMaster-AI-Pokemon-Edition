import React, { createElement, CSSProperties, MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import "./styles/PokemonCard.scss";
import SpriteSheetMap from "../utilities/SpriteSheetMap";
import { PokemonInstance } from "./PokemonTeam";
import { useOverlay } from "../utilities/OverlayContext";
import { PokemonCardOverlay } from "../utilities/Overlays";

interface PokemonCardProps {
    teamAreaRef: RefObject<HTMLDivElement | null>;
    pokemonInstance: PokemonInstance | null;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ teamAreaRef, pokemonInstance }) => {

    const spriteSheetRef = useRef<SpriteSheetMap>(null);
    const [columns, setColumns] = useState<number>(1);
    const [isAnimated, setIsAnimated] = useState<boolean>(true);

    const typeColors = [
        '#8796A0', '#C03028', '#768FC2', '#9358AE', '#B15D31', '#A99D76', '#80AD25', '#5E52AD', '#4F7D8E', '#CFCFCF',
        '#D87B38', '#437BB9', '#4EA745', '#DEBA1F', '#F85888', '#5EAEA2', '#085BA5', '#565062', '#C874C2'
    ];

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
        if (!pokemonInstance) return;
        const img = new Image();
        img.onload = () => { setColumns(img.width / img.height); };
        img.src = `/assets/${pokemonInstance.pokemon.image}`;
    }, []);

    useEffect(() => {
        !isAnimated || cycle();
    }, [isAnimated]);

    const { addOverlay, removeOverlay } = useOverlay();
    const cardRef = useRef<HTMLDivElement | null>(null);
    //const [isDragging, setIsDragging] = useState<boolean>(false);
    const onClickHold = (e: MouseEvent) => {
        const ref = cardRef.current;
        if (!ref) return;
        const metrics: { top: number, left: number, height: number, width: number } = ref.getBoundingClientRect();
        const offset: { x: number, y: number } = { x: e.clientX - metrics.left, y: e.clientY - metrics.top };
        console.log(offset);
        //setIsDragging(true);
        addOverlay({
            className: "none",
            component: PokemonCardOverlay,
            props: { teamAreaRef, metrics, offset, onClickRelease },
            flag: false
        });
    };

    const onClickRelease = () => {
        const ref = cardRef.current;
        if (!ref) return;
        //setIsDragging(false);
        //const metrics: { top: number, left: number, height: number, width: number } = ref.getBoundingClientRect();
        //console.log({ top, left, height, width });
        removeOverlay("none");
    };

    return (
        <div className="PokemonCard" ref={cardRef} onMouseDown={onClickHold} onMouseUp={onClickRelease}>
            {!pokemonInstance && <div className="PokemonCardContent placeholder"/>}
            {pokemonInstance && <div className="PokemonCardContent">
                <div className="PokemonBackground" style={{ 
                    background: `radial-gradient(circle at 50% 160%, 
                        ${typeColors[pokemonInstance.pokemon.typeIndexes[0]]} 60%, 
                        rgba(0, 0, 0, 0) 80%)`
                    // background: `linear-gradient(4deg, white 30%, ${typeColors[pokemonInstance.pokemon.typeIndexes[0]]} 31%,
                    //     rgba(0, 0, 0, 0) 70%)`
                }}/>
                <div className='ImageContainer'>
                    <SpriteSheetMap 
                        ref={spriteSheetRef} 
                        src={pokemonInstance.pokemon.image} 
                        rows={1} 
                        cols={columns}
                    />
                </div>
                <div className="AttributesContainer">
                    <div style={{ height: 'fit-content', width: '100%' }}>
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
                        <div className="AttributeRow middle" style={{ backgroundColor: 'none' }}>
                            <div className="PokedexNumber">{`#${pokemonInstance.pokemon.pokedexNumber}`}</div>
                            <div className="HealthBar" style={{ backgroundImage: `url('/assets/hp_bar.png')` }}/>
                        </div>
                    </div>
                    <div className="AttributeRow end" style={{ backgroundColor: 'none' }}>
                        <div className="Types">
                            {pokemonInstance.pokemon.typeIndexes.map((position) => {
                                return <SpriteSheetMap 
                                    ref={null} 
                                    src={'types.png'} 
                                    rows={19} 
                                    cols={1}
                                    startRow={position + 1}
                                    style={{ marginBottom: '2px' }}
                                />
                            })}
                        </div>
                        <div className="ItemContainer">
                            <div className="Item" style={{ backgroundImage: `url('/assets/REVIVALHERB.png')` }}/>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );

};

export default PokemonCard;