import React, { RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/PokemonTeam.scss";
import "./styles/SharedStyles.scss";
import PokemonCard from "./PokemonCard";
import ControlsContainer from "./ControlsContainer";
import SettingButton from "./SettingButton";

interface PokemonTeamProps {}

export interface PokemonSetting {
    title: string;
    image: string;
    blackIcon?: boolean;
    refs?: RefObject<HTMLDivElement | null>[];
}

const PokemonTeam: React.FC<PokemonTeamProps> = () => {

    const pokemonSettings: PokemonSetting[] = [
        { title: 'Save', image: 'save.png', blackIcon: true },
        { title: 'Load', image: 'load.png', blackIcon: true },
        { title: 'Presets', image: 'pokeball_icon_bw.png'}
    ];

    const [asControl, setAsControl] = useState<boolean>(false);
    const [iconOnly, setIconOnly] = useState<boolean>(false);

    const refs: RefObject<HTMLDivElement | null>[] = [
        useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)
    ];

    return (
        <div className="PokemonTeam">
            <div className="CardTitle" style={{ width: '95%', marginTop: '3.65px' }}>
                Pokemon
                <div className="CardTitleShadow" style={{ color: 'none' }}>Pokemon</div>
            </div>
            <div className="PokemonTeamArea">
                <div className="PokemonTeamGrid">
                    {[1, 2, 3, 4, 5, 6].map((i) => <div className='PokemonSlot' key={i}>
                        <PokemonCard/>
                    </div>)}
                </div>
                {!asControl && <div className="PokemonSettings">
                    {pokemonSettings.map((setting, index) => {
                        return <SettingButton title={setting.title} image={setting.image} isActive={index === 2} 
                            blackIcon={setting.blackIcon} minWidthRatios={{ asControl: 60.79, iconOnly: 67 }} 
                            asControl={asControl} setAsControl={setAsControl} iconOnly={iconOnly}
                            setIconOnly={setIconOnly} refs={refs} key={index}/>
                    })}
                </div>}
            </div>
            <ControlsContainer additionalControls={pokemonSettings.map((setting) => { 
                return { title: setting.title, image: setting.image } 
            })} additionalActive={asControl}/>
        </div>
    );

};

export default PokemonTeam;