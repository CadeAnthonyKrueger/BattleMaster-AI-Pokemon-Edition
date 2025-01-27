import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import SettingButton, { SettingButtonProps } from "./SettingButton";

interface SettingButtonContainerProps {
    className: string;
    iconOnly: boolean;
    setIconOnly: Dispatch<SetStateAction<boolean>>;
    asControl: boolean;
    setAsControl: Dispatch<SetStateAction<boolean>>;
    settingButtonProps: SettingButtonProps[];
}

interface Dimensions { 
    width: number; 
    height: number;
    distance?: number;
    flag?: string;
}

const SettingButtonContainer: React.FC<SettingButtonContainerProps> = ({ 
    className, iconOnly, setIconOnly, asControl, setAsControl, settingButtonProps
}) => {

    const [buttonRef, titleRef, iconRef] = settingButtonProps[2].refs ? settingButtonProps[2].refs : [];

    const minWidthRatios = { asControl: 60.79, iconOnly: 67 };

    const [refWidths, setRefWidths] = useState<{ button: number; title: number; icon: number }>();
    const [checkPoint, setCheckPoint] = useState<Dimensions>({ 
        width: window.innerWidth, height: window.innerHeight, flag: 'asControl' 
    });

    useEffect(() => {
        const { bRef, tRef, iRef } = { bRef: buttonRef.current, tRef: titleRef.current, iRef: iconRef.current };

        if (!bRef) return;

        setRefWidths(() => {
            return {
                button: bRef.getBoundingClientRect().width, 
                title: tRef ? tRef.getBoundingClientRect().width : 0, 
                icon: iRef ? iRef.getBoundingClientRect().width : 0
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
            if (checkPoint && checkPoint.flag === 'asControl') {
                setCheckPoint(prev => {
                    if (!asControl) { return { ...prev, width: innerWidth, height: innerHeight, flag: 'asControl' }; }
                    const dist = innerWidth - prev.width;
                    const dist2 = -(innerHeight - prev.height);
                    //console.log(dist + dist2);
                    return { ...prev, distance: (dist*0.55) + (dist2*1.22) };
                });
            }
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
        
        console.log(checkPoint.distance);
        const { button: buttonWidth, title: titleWidth, icon: iconWidth } = refWidths;
        if (asControl && checkPoint?.distance && !buttonRef.current) {
            if (buttonWidth > iconWidth && checkPoint?.distance > 0) { 
                setTimeout(() => {
                    if (checkPoint?.distance && checkPoint?.distance > 4) setAsControl(false); 
                }, 100);
            }
        } else if (iconOnly && !asControl && buttonRef.current) {
            !compareWidths(iconWidth, buttonWidth, minWidthRatios.asControl, false) || setAsControl(true);
        }
        if (!asControl && iconOnly && !titleRef.current) { 
            !compareWidths(titleWidth, buttonWidth, minWidthRatios.iconOnly) || setIconOnly(false); 
        } else if (!iconOnly && !asControl && titleRef.current) { 
            !compareWidths(titleWidth, buttonWidth, minWidthRatios.iconOnly, false) || setIconOnly(true); 
        }
    }, [refWidths, checkPoint?.distance]);

    return (
        <>
            {!asControl && <div className={className}>
                {settingButtonProps.map((setting, index) => {
                    return <SettingButton title={setting.title} image={setting.image} blackIcon={setting.blackIcon} 
                        refs={setting.refs} iconOnly={iconOnly} asControl={asControl} key={index}/>
                })}
            </div>}
        </>
    );

};

export default SettingButtonContainer;