import React, { RefObject, useEffect, useRef, useState } from "react";
import "./styles/PokemonTeam.scss";
import "./styles/SharedStyles.scss";
import PokemonTeamGridArea from "./PokemonTeamGridArea";
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
    id: string;
    pokemon: Pokemon;
    level: number;
    gender: string;
}

const PokemonTeam: React.FC<PokemonTeamProps> = () => {

    const teamAreaRef = useRef<HTMLDivElement | null>(null);
    const teamInnerRef = useRef<HTMLDivElement | null>(null);
    const [parentWidthRatio, setParentWidthRatio] = useState<number>(0);

    useEffect(() => {
        const { teamRef, innerRef } = { teamRef: teamAreaRef.current, innerRef: teamInnerRef.current };
        if (!(teamRef && innerRef)) return;

        const handleResize = () => {
            // console.log(`Team width: ${teamRef.getBoundingClientRect().width}  Inner width: ${innerRef.getBoundingClientRect().width}`);
            // console.log(`Team width: ${innerRef.getBoundingClientRect().width / teamRef.getBoundingClientRect().width}`);
            setParentWidthRatio((innerRef.getBoundingClientRect().width / teamRef.getBoundingClientRect().width) * 100);
        };
    
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
      }, []);

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

    return (
        <div className="PokemonTeam" ref={teamAreaRef}>
            <div className="CardTitle" style={{ width: '95%', marginTop: '3.65px' }}>
                Pokemon
                <div className="CardTitleShadow" style={{ color: 'none' }}>Pokemon</div>
            </div>
            <div className="PokemonTeamInner">
                <PokemonTeamGridArea  ref={teamInnerRef}/>
                <SettingButtonContainer className="PokemonSettings" iconOnly={iconOnly} setIconOnly={setIconOnly} 
                    asControl={asControl} setAsControl={setAsControl} settingButtonProps={settingButtonProps}
                    parentWidthRatio={parentWidthRatio}
                />
            </div>
            <ControlsContainer container='PokemonTeam' additionalControls={settingButtonProps.map((setting) => { 
                return { title: setting.title, image: setting.image } 
            })} additionalActive={asControl}/>
        </div>
    );

};

export default PokemonTeam;