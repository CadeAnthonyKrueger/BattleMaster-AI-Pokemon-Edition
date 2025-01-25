import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/SettingButton.scss";
import "./styles/TrainerCard.scss";

interface SettingButtonProps {
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

    return (
        <>
            {!asControl && <div className={`SettingButton ${styleName}`} ref={refs ? refs[0] : null} 
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
