import React, { useEffect, useRef, useState } from "react";
import "./styles/TeamOptions.scss";
import "./styles/SharedStyles.scss";
import ControlsContainer from "./ControlsContainer";
import CardTitleContainer from "./CardTitleContainer";
import SettingButton, { SettingButtonProps } from "./SettingButton";
import SettingButtonContainer from "./SettingButtonContainer";
import "./styles/SettingButton.scss";

interface TeamOptionsProps {}

const TeamOptions: React.FC<TeamOptionsProps> = () => {

    const controlFunctions = { 
        'randomize': () => undefined, 
        'reset': () => undefined
    };

    const buttonRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const [iconOnly, setIconOnly] = useState<boolean>(false);
    const [asControl, setAsConstrol] = useState<boolean>(false);
    const settingButtonProps: SettingButtonProps[] = [
        { title: 'Reset', image: 'reset.png', styleName: "om", blackIcon: false},
        { title: 'Randomize', image: 'random.png', styleName: "om", blackIcon: false, refs: [buttonRef, titleRef, iconRef] }
    ];

    // export interface SettingButtonProps {
    //     title: string;
    //     image: string;
    //     styleName?: string;
    //     blackIcon?: boolean;
    //     refs?: (RefObject<HTMLDivElement | null>)[];
    //     iconOnly?: boolean;
    //     asControl?: boolean;
    //     states?: React.Dispatch<React.SetStateAction<any>>[];
    // }




    return (
        <div className="TeamOptions">
            <CardTitleContainer text={'Settings'} style={{ width: '94%', marginTop: '3.65px' }}/>
            <ControlsContainer functions={controlFunctions} container="TeamOptions"/>
            <div className="GeneralOptions">
                <SettingButton title={'Randomize All'} image={'random_color.png'} styleName="to"/>
                <SettingButton title={'Reset All'} image={'reset_colored.png'} styleName='to'/>
            </div>
        </div>
    );

};

export default TeamOptions;