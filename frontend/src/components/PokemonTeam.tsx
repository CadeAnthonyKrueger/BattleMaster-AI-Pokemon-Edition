import React, { RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/PokemonTeam.scss";
import "./styles/SharedStyles.scss";
import PokemonCard from "./PokemonCard";
import ControlsContainer from "./ControlsContainer";
import SettingButton from "./SettingButton";

interface PokemonTeamProps {}

interface PokemonSetting {
    title: string;
    image: string;
    blackIcon: boolean;
    refs?: RefObject<HTMLDivElement | null>[];
}

interface Dimensions { 
    width: number; 
    height: number;
    distance?: number;
    flag?: string;
}

const PokemonTeam: React.FC<PokemonTeamProps> = () => {

    const buttonRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const pokemonSettings: PokemonSetting[] = [
        { title: 'Save', image: 'save.png', blackIcon: true },
        { title: 'Load', image: 'load.png', blackIcon: true },
        { title: 'Presets', image: 'pokeball_icon_bw.png', blackIcon: false, refs: [buttonRef, titleRef, iconRef] }
    ];

    const minWidthRatios = { asControl: 60.79, iconOnly: 67 };
    const windowSize: Dimensions = { width: window.innerWidth, height: window.innerHeight };

    const [iconOnly, setIconOnly] = useState<boolean>(false);
    const [asControl, setAsControl] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [refWidths, setRefWidths] = useState<{ button: number; title: number; icon: number }>();
    const [checkPoint, setCheckPoint] = useState<Dimensions>({ width: window.innerWidth, height: window.innerHeight, flag: 'asControl' });
    const [deltaMetrics, setDeltaMetrics] = useState<{ delta: Dimensions; isIncreasing: boolean }>({
        delta: { width: 0, height: 0 }, isIncreasing: false 
    });

    useEffect(() => {
        const { bRef, tRef, iRef } = { bRef: buttonRef.current, tRef: titleRef.current, iRef: iconRef.current };

        if (!bRef || !tRef || !iRef) return;

        setRefWidths(() => {
            return {
                button: bRef.getBoundingClientRect().width, 
                title: tRef.getBoundingClientRect().width, 
                icon: iRef.getBoundingClientRect().width
            }
        });

    }, [buttonRef, titleRef, iconRef]);

    useEffect(() => {
        const { bRef, tRef, iRef } = { 
            bRef: buttonRef.current, tRef: titleRef.current, iRef: iconRef.current 
        };

        if (!bRef) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width } = entry.contentRect;
                let { titleWidth, iconWidth } = { titleWidth: 0, iconWidth: 0 };
                if (tRef) { titleWidth = tRef.getBoundingClientRect().width; }
                if (iRef) { iconWidth = iRef.getBoundingClientRect().width; }
                setRefWidths((prev) => {
                    if (!prev) return;
                    //console.log(`titleRatio: ${(titleWidth !== 0 ? titleWidth : prev.title) / (width !== 0 ? width : prev.button)}`);
                    //console.log(`iconRatio: ${(iconWidth !== 0 ? iconWidth : prev.icon) / (width !== 0 ? width : prev.button)}`);
                    //const iconRatio = (iconWidth !== 0 ? iconWidth : prev.icon) / (width !== 0 ? width : prev.button);
                    return {
                            button: width !== 0 ? width : prev.button,
                            title: titleWidth !== 0 ? titleWidth : prev.title,
                            icon: iconWidth !== 0 ? iconWidth : prev.icon
                    };
                });       
            }
        });

        resizeObserver.observe((bRef as HTMLDivElement));

        return () => {
            resizeObserver.disconnect();
        };

    }, [buttonRef, titleRef, iconRef, asControl, iconOnly]);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth, innerHeight } =  window;
            // const iconRatio = (refWidths?.icon || 0) / (refWidths?.button || 1) * 100;
            // if (!buttonRef.current && (iconRatio > minWidthRatios.asControl)) {
            //     setRefWidths(prev => {
            //         if (!prev) return;
            //         console.log(iconRatio);
            //         //console.log(prev.button + 1);
            //         return { ...prev, button: prev.button };
            //     });
            // }
            if (checkPoint && checkPoint.flag === 'asControl') {
                setCheckPoint(prev => {
                    // if ((prev.height && innerHeight !== prev.height) || !asControl) { 
                    //     return { width: innerWidth, height: innerHeight, flag: 'asControl' };
                    // }
                    if (!asControl) { return { width: innerWidth, height: innerHeight, flag: 'asControl' }; }
                    const dist = innerWidth - prev.width;
                    const dist2 = -(innerHeight - prev.height);
                    console.log(dist + dist2);
                    return { ...prev, distance: dist + dist2 };
                });
            }
            setDeltaMetrics(prev => {
                const curr = { width: (innerWidth - windowSize.width), height: (innerHeight - windowSize.height) };
                const change = (curr.width - prev.delta.width) - (curr.height - prev.delta.height);
                return { 
                    delta: curr,
                    isIncreasing: (change * 10) > 0 ? (change * 10) > 0 : (change * 10) === 0 ? prev.isIncreasing : false
                };
            });
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [asControl]);

    const compareWidths = (refWidth: number, buttonWidth: number, minWidthRatio: number, expr1: boolean = true) => {
        const { lhs, rhs } = { lhs: (refWidth / buttonWidth) * 100, rhs: minWidthRatio };
        return expr1 ? (lhs < rhs) : (lhs >= rhs);
    };

    useEffect(() => {
        if (!refWidths) return;
        
        const { button: buttonWidth, title: titleWidth, icon: iconWidth } = refWidths;
        if (deltaMetrics.isIncreasing) {
            if (asControl && (checkPoint?.distance && checkPoint?.distance > 0)) { 
                //if (compareWidths(iconWidth, buttonWidth, minWidthRatios.asControl)) { setAsControl(false); }
                setAsControl(false);
            }
            if (!asControl && iconOnly) { !compareWidths(titleWidth, buttonWidth, minWidthRatios.iconOnly) || setIconOnly(false); }
        } else {
            if (iconOnly && !asControl) { !compareWidths(iconWidth, buttonWidth, minWidthRatios.asControl, false) || setAsControl(true); }
            if (!iconOnly && !asControl) { !compareWidths(titleWidth, buttonWidth, minWidthRatios.iconOnly, false) || setIconOnly(true); }
        }

    }, [refWidths, checkPoint?.distance]);

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
                        return <SettingButton title={setting.title} image={setting.image} blackIcon={setting.blackIcon} 
                                    refs={setting.refs} iconOnly={iconOnly} asControl={asControl} key={index}/>
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