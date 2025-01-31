import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/SettingButton.scss";
import "./styles/TrainerCard.scss";
import { useTooltip } from "../utilities/TooltipContext";

export interface SettingButtonProps {
    title: string;
    image: string;
    styleName?: string;
    blackIcon?: boolean;
    refs?: (RefObject<HTMLDivElement | null>)[];
    iconOnly?: boolean;
    asControl?: boolean;
    states?: React.Dispatch<React.SetStateAction<any>>[];
}

const SettingButton: React.FC<SettingButtonProps> = ({ 
    title, image, styleName = '', blackIcon = false, refs, iconOnly = false, asControl = false, states
}) => {

    const stateFunc = states ? () => states[0]((prev: any) => !prev) : () => undefined;

    const sub = useRef<HTMLDivElement>(null);
    
    const { registerTooltip, unregisterTooltip } = useTooltip();

    useEffect(() => {
        let ref = !(refs && refs[0]) ? sub.current : refs[0].current;
        if (!ref) return;
        return iconOnly ? registerTooltip(ref, title) : unregisterTooltip(ref);
    }, [refs, iconOnly]);

    return (
        <>
            {!asControl && <div className={`SettingButton ${styleName}`} ref={refs ? refs[0] : sub} 
                onMouseEnter={stateFunc} onMouseLeave={stateFunc}
            >
                <div className={`SettingInner ${styleName}`}>
                    <div className={`SettingIcon ${blackIcon ? 'blackIcon' : ''} ${styleName}`} ref={refs && refs[2] ? refs[2] : null} style={{ 
                        backgroundImage: `url('/assets/${image}')` 
                    }}/>
                    {!iconOnly && <div className={`SettingTitle ${styleName}`} ref={refs ? refs[1] : null}>{title}</div>}
                </div>
            </div>}
        </>
    );

};

export default SettingButton;
