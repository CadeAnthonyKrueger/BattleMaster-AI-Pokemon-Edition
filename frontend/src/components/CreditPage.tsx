import React, { FC } from "react";
import "../pages/styles/IntroPage.scss";

interface CreditPageProps {
    designation: string;
    backgroundImage: string;
    aspectRatio?: string;
    credits: string[];
}

const CreditPage: FC<CreditPageProps> = ({ designation, backgroundImage, aspectRatio, credits }) => {

    // <>
    //         <div className="CreditDesignation">Adapted from the work of</div>
    //         <div className="CreditIcon other" style={{ 
    //             backgroundImage: `url('/assets/pokemon_essentials_logo.png')`,
    //             aspectRatio: '4/3'
    //         }}/>
    //         <div className="CreditsContainer multiple">
    //             <div className="Credit header"><strong>Pokemon Essentials</strong></div>
    //             <div className="Credit">2011 - 2023 Maruno</div>
    //             <div className="Credit">2007 - 2010 Peter O.</div>
    //             <div className="Credit">Based on work by Flameguru</div>
    //         </div>
    //     </>,
    //     <>
    //         <div className="CreditDesignation">Utilizing the engine created by</div>
    //         <div className="CreditIcon other" style={{ backgroundImage: `url('/assets/mkxp_logo.png')` }}/>
    //         <div className="CreditsContainer multiple">
    //             <div className="Credit header"><strong>MKXP-Z</strong></div>
    //             <div className="Credit">Roza</div>
    //             <div className="Credit">Based on mkxp by Ancurio et al.</div>
    //         </div>
    //     </>

    return (
        <>
            <div className="CreditDesignation">{designation}</div>
                <div className="CreditIcon other" style={{ 
                    backgroundImage: `url('/assets/${backgroundImage}')`,
                    aspectRatio: `${aspectRatio}`
                }}/>
            <div className="CreditsContainer multiple">
                <div className="Credit header"><strong>{credits[0]}</strong></div>
                {credits.slice(1).map((credit, index) => <div className="Credit" key={index}>{credit}</div>)}
            </div>
        </>
    )
}

export default CreditPage;