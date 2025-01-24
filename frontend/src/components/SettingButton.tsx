import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/SettingButton.scss";
import "./styles/TrainerCard.scss";

interface SettingButtonProps {
    title: string;
    image: string;
    isActive: boolean;
    asControl: boolean;
    setAsControl: Dispatch<SetStateAction<boolean>>;
    iconOnly: boolean;
    setIconOnly: Dispatch<SetStateAction<boolean>>;
    refs: RefObject<HTMLDivElement | null>[];
    styleName?: string;
    blackIcon?: boolean;
    states?: React.Dispatch<React.SetStateAction<any>>[];
    minWidthRatios?: { asControl: number, iconOnly: number };
}

interface Dimensions { 
    width: number; 
    height: number;
    distance?: number;
    flag?: string;
}

const SettingButton: React.FC<SettingButtonProps> = ({ 
    title, image, isActive = false, asControl, setAsControl, iconOnly, setIconOnly, 
    refs, styleName = '', blackIcon = false, states, minWidthRatios
}) => {

    const stateFunc = states ? () => states[0]((prev: any) => !prev) : () => undefined;
    const [buttonRef, titleRef, iconRef] = refs;
    const [asControl1, setAsControl1] = [asControl, setAsControl];

    if (isActive) {

        const windowSize: Dimensions = { width: window.innerWidth, height: window.innerHeight };
    
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
                };
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

        }, [buttonRef, titleRef, iconRef, iconOnly, asControl1]);

        useEffect(() => {
            const handleResize = () => {
                const { innerWidth, innerHeight } =  window;
                if (checkPoint && checkPoint.flag === 'asControl') {
                    setCheckPoint(prev => {
                        if (!asControl1) { return { width: innerWidth, height: innerHeight, flag: 'asControl' }; }
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

        }, [asControl1]);

        const compareWidths = (refWidth: number, buttonWidth: number, minWidthRatio: number, expr1: boolean = true) => {
            const { lhs, rhs } = { lhs: (refWidth / buttonWidth) * 100, rhs: minWidthRatio };
            return expr1 ? (lhs < rhs) : (lhs >= rhs);
        };

        useEffect(() => {
            if (!refWidths || !minWidthRatios) return;
            
            const { button: buttonWidth, title: titleWidth, icon: iconWidth } = refWidths;
            //console.log(checkPoint?.distance);
            console.log(deltaMetrics.isIncreasing);
            if (deltaMetrics.isIncreasing) {
                if (asControl1 && (checkPoint?.distance && checkPoint?.distance > 0)) { setAsControl1(false); }
                if (!asControl1 && iconOnly) { !compareWidths(titleWidth, buttonWidth, minWidthRatios.iconOnly) || setIconOnly(false); }
            } else {
                if (iconOnly && !asControl1) { !compareWidths(iconWidth, buttonWidth, minWidthRatios.asControl, false) || setAsControl1(true); }
                if (!iconOnly && !asControl1) { !compareWidths(titleWidth, buttonWidth, minWidthRatios.iconOnly, false) || setIconOnly(true); }
            }

        }, [refWidths, checkPoint?.distance]);
    }

    return (
        <>
            {!asControl1 && <div className={`SettingButton ${styleName}`} ref={isActive ? refs[0] : null} 
                onMouseEnter={stateFunc} onMouseLeave={stateFunc}
            >
                <div className={`SettingInner ${styleName}`}>
                    <div className={`SettingIcon ${blackIcon ? 'blackIcon' : ''} ${styleName}`} ref={isActive ? refs[2] : null} style={{ 
                        backgroundImage: `url('/assets/${image}')` 
                    }}/>
                    {!iconOnly && <div className={`SettingTitle ${styleName}`} ref={isActive ? refs[1] : null}>{title}</div>}
                </div>
            </div>}
        </>
    );

};

export default SettingButton;
