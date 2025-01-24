import React, { useEffect, useRef, useState } from "react";
import "./styles/IntroPage.scss";
import TitleView from "../views/TitleView";
import CreditPage from "../components/CreditPage";

const IntroPage = ({ disabled } : { disabled: boolean }) => {

    const IntroRef = useRef<HTMLDivElement | null>(null);

    const [creditIndex, setCreditIndex] = useState<number>(disabled ? 3 : 0);
    let time = 0;

    const credits = [
        <>
            <div className="CreditIcon" style={{ backgroundImage: `url('/assets/porygon_logo2.png')` }}/>
            <div className="CreditsContainer">
                <div className="AttributionType">Developed By</div>
                <div className="Creditee">Cade<div style={{ width: '10px' }}></div>Krueger</div>
            </div>
        </>,
        <CreditPage designation="Adapted from the work of" backgroundImage="pokemon_essentials_logo.png" aspectRatio="4/3" credits={[
            'Pokemon Essentials', '2011 - 2023 Maruno', '2007 - 2010 Peter O.', 'Based on work by Flameguru'
        ]}/>,
        <CreditPage designation="Utilizing the engine created by" backgroundImage="mkxp_logo.png" credits={[
            'MKXP-Z', 'Roza', 'Based on mkxp by Ancurio et al.'
        ]}/>,
        <TitleView introRef={IntroRef}/>
    ];

    useEffect(() => {
        const ref = IntroRef.current;
        if (ref && !disabled) {
            setTimeout(() => {
                ref.style.opacity = '1';
                ref.style.filter = 'blur()';
            }, time + 1000);
            if (creditIndex < credits.length - 1) {
                setTimeout(() => {
                    ref.style.opacity = '0';
                    ref.style.filter = 'blur(10px)';
                }, time + 4000);
            }
            time += 5000;
        }
    }, [creditIndex]);

    useEffect(() => {
        const ref = IntroRef.current;
        if (ref && !disabled) {
            const interval = 5000;
            for (let i = 0; i < credits.length - 1; i++) {
                setTimeout(() => {
                    setCreditIndex(i + 1);
                }, interval * (i + 1));
            };
        }
        if (ref && disabled) {
            ref.style.opacity = '1';
            ref.style.filter = 'blur()';
        }
    }, [IntroRef]);

    return (
        <div className="IntroPage">
            <div className="IntroContent" ref={IntroRef}>
                {credits[creditIndex]}
            </div>
        </div>
    )
}

export default IntroPage;