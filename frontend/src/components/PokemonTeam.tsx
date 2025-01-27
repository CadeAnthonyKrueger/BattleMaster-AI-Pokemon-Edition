import React, { RefObject, useRef, useState } from "react";
import "./styles/PokemonTeam.scss";
import "./styles/SharedStyles.scss";
import PokemonCard from "./PokemonCard";
import ControlsContainer from "./ControlsContainer";
//import SettingButton from "./SettingButton";
import SettingButtonContainer from "./SettingButtonContainer";
import { SettingButtonProps } from "./SettingButton";

interface PokemonTeamProps {}

interface Pokemon {
    name: string;
    pokedexNumber: string;
    typeIndexes: number[],
    image: string;
}

export interface PokemonInstance {
    pokemon: Pokemon;
    level: number;
    gender: string;
}

const PokemonTeam: React.FC<PokemonTeamProps> = () => {

    const buttonRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const settingButtonProps: SettingButtonProps[] = [
        { title: 'Save', image: 'save.png', blackIcon: true },
        { title: 'Load', image: 'load.png', blackIcon: true },
        { title: 'Presets', image: 'pokeball_icon_bw.png', blackIcon: false, refs: [buttonRef, titleRef, iconRef] }
    ];

    const [iconOnly, setIconOnly] = useState<boolean>(false);
    const [asControl, setAsControl] = useState<boolean>(false);

    const pokemonTeam: PokemonInstance[] = [
        { pokemon: { name: 'Deoxys', pokedexNumber: '0386', typeIndexes: [14], image: 'DEOXYS.png' }, level: 35, gender: 'male' },
        { pokemon: { name: 'Kirlia', pokedexNumber: '0281', typeIndexes: [14], image: 'KIRLIA.png' }, level: 16, gender: 'female' },
        { pokemon: { name: 'Houndoom', pokedexNumber: '0229', typeIndexes: [10, 17], image: 'HOUNDOOM.png' }, level: 41, gender: 'male' },
        { pokemon: { name: 'Lycanroc', pokedexNumber: '0745', typeIndexes: [5], image: 'LYCANROC.png' }, level: 32, gender: 'male' },
        { pokemon: { name: 'Vespiquen', pokedexNumber: '0416', typeIndexes: [6, 2], image: 'VESPIQUEN.png' }, level: 38, gender: 'female' },
        { pokemon: { name: 'Archen', pokedexNumber: '0566', typeIndexes: [5, 2], image: 'ARCHEN.png' }, level: 12, gender: 'male' }
    ]

    return (
        <div className="PokemonTeam">
            <div className="CardTitle" style={{ width: '95%', marginTop: '3.65px' }}>
                Pokemon
                <div className="CardTitleShadow" style={{ color: 'none' }}>Pokemon</div>
            </div>
            <div className="PokemonTeamArea">
                <div className="PokemonTeamGrid">
                    {pokemonTeam.map(
                        (pkmn, i) => <div className='PokemonSlot' key={i}>
                            <PokemonCard pokemonInstance={pkmn} position={i} key={i}/>
                        </div>
                    )}
                </div>
                <SettingButtonContainer className="PokemonSettings" iconOnly={iconOnly} setIconOnly={setIconOnly} 
                    asControl={asControl} setAsControl={setAsControl} settingButtonProps={settingButtonProps}
                />
            </div>
            <ControlsContainer additionalControls={settingButtonProps.map((setting) => { 
                return { title: setting.title, image: setting.image } 
            })} additionalActive={asControl}/>
        </div>
    );

};

export default PokemonTeam;