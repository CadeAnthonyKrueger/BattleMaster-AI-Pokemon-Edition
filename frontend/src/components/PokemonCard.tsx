import React, { RefObject, useEffect, useRef, useState } from "react";
import "./styles/PokemonCard.scss";
import SpriteSheetMap from "../utilities/SpriteSheetMap";
import { PokemonInstance } from "./PokemonTeam";
import HPBar from "./HPBar";
import { useTooltip } from "../utilities/TooltipContext";

interface PokemonCardProps {
    pokemonInstance: PokemonInstance;
    removePokemon: (id: string) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonInstance, removePokemon }) => {

    const spriteSheetRef = useRef<SpriteSheetMap>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState<number>(1);
    const [isAnimated, setIsAnimated] = useState<boolean>(true);

    const typeColors = [
        '#8796A0', '#C03028', '#768FC2', '#9358AE', '#B15D31', '#A99D76', '#80AD25', '#5E52AD', '#4F7D8E', '#CFCFCF',
        '#D87B38', '#437BB9', '#4EA745', '#DEBA1F', '#F85888', '#5EAEA2', '#085BA5', '#565062', '#C874C2'
    ];

    const handleRemove = () => {
        removePokemon(pokemonInstance.id);
        setOptionsMenuVisible(false);
        unregisterTooltip(optionButtons[2].ref);
    }

    const [optionButtons, setOptionButtons] = useState<any>([
        { title: 'View', style: { marginRight: '1.5px' }, onClick: (e: any) => undefined, ref: useRef<HTMLDivElement | null>(null) },
        { title: 'Edit', style: {}, onClick: (e: any) => undefined, ref: useRef<HTMLDivElement | null>(null) },
        { title: 'Remove', style: {}, onClick: handleRemove, ref: useRef<HTMLDivElement | null>(null) }
    ]);

    const cycle = () => {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            spriteSheetRef.current?.decrementSprite();
            //if (count === 7) { clearInterval(interval) };
        }, 90);
    
        return () => clearInterval(interval);
    };

    useEffect(() => {
        const img = new Image();
        img.onload = () => { setColumns(img.width / img.height); };
        img.src = `/assets/${pokemonInstance.pokemon.image}`;
    }, []);

    useEffect(() => {
        if (isAnimated) { return cycle(); }
    }, [isAnimated]);

    const cardRef = useRef<HTMLDivElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [optionsMenuVisible, setOptionsMenuVisible] = useState<boolean>(false);

    const handleGrab = (isGrabbing: boolean) => {
        const ref = cardRef.current;
        if (!ref) return;

        if (isGrabbing) {
            timerRef.current = setTimeout(() => {
                ref.style.cursor = 'grabbing';
                setIsDragging(true);
            }, 300);
        } else {
            if (timerRef.current) {
                isDragging || setOptionsMenuVisible(true);
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            setIsDragging(false);
            ref.style.cursor = 'pointer';
        }
    };

    const handleMouseLeave = () => {
        const ref = cardRef.current;
        if (!ref) return;
        setOptionsMenuVisible(false);
        if (!isDragging) { ref.style.cursor = 'pointer'; }
    };

    const optionsRef = useRef<HTMLDivElement>(null);
    const [optionsIconClicked, setOptionsIconClicked] = useState<boolean>(false);

    const { registerTooltip, unregisterTooltip } = useTooltip();

    useEffect(() => {
        let timeout: NodeJS.Timeout;
    
        if (optionsMenuVisible) {
            timeout = setTimeout(() => {
                optionButtons.forEach((element: any) => {
                    const ref = element.ref.current;
                    let clear;
                    if (ref) clear = registerTooltip(ref, element.title, 'top', element.title === 'Remove' && optionsIconClicked);
                    setOptionsIconClicked(false);
                    return clear;
                });
            }, 300);
        } else {
            optionButtons.forEach((element: any) => {
                const ref = element.ref.current;
                if (ref) return unregisterTooltip(ref);
            });
    
            timeout = setTimeout(() => {
                const ref = optionsRef.current;
                if (ref) return registerTooltip(ref, 'Options');
            }, 300);
        }
    
        return () => clearTimeout(timeout);
    }, [optionsMenuVisible, optionsRef, optionsIconClicked]);
    

    return (
        <div className="PokemonCard" ref={cardRef} onMouseDown={() => handleGrab(true)}
            onMouseUp={() => handleGrab(false)} onMouseLeave={handleMouseLeave}>
            <div className="PokemonCardContent">
                <div className="PokemonBackground" ref={bgRef} style={{ 
                    backgroundImage: `radial-gradient(circle at 50% 160%, 
                        ${typeColors[pokemonInstance.pokemon.typeIndexes[0]]} 60%,
                        rgba(0, 0, 0, 0) 80%)`
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
                            <HPBar/>
                        </div>
                    </div>
                    <div className="AttributeRow end" style={{ backgroundColor: 'none' }}>
                        <div className="Types">
                            {pokemonInstance.pokemon.typeIndexes.map((position, i) => {
                                return <SpriteSheetMap 
                                    ref={null} 
                                    src={'types.png'} 
                                    rows={19} 
                                    cols={1}
                                    startRow={position + 1}
                                    style={{ marginBottom: '2px' }}
                                    key={i}
                                />
                            })}
                        </div>
                        <div className="ItemContainer">
                            <div className="Item" style={{ backgroundImage: `url('/assets/REVIVALHERB.png')` }}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="OptionsContainer" style={{ width: `${optionsMenuVisible ? 48 : 15}px` }}>
                {!optionsMenuVisible ? <div className="OptionIcon closed" ref={optionsRef} onMouseDown={() => setOptionsIconClicked(true)}/> : 
                    optionButtons.map((option: any, index: number) => { 
                        return <div className="OptionIcon" ref={option.ref} key={index} 
                            onMouseUp={option.onClick} 
                            style={{ ...{ backgroundImage: `url('/assets/${option.title}.png')` }, ...option.style}}/> 
                    })
                }
            </div>
        </div>
    );

};

export default PokemonCard;