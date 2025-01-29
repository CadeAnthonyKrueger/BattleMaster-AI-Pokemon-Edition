import React, { useRef, useState, useEffect } from "react";
import "./styles/TrainerView.scss";
import SupportPokeball from "../components/SupportPokeball";
import TrainerCard from "../components/TrainerCard";
import TeamOptions from "../components/TeamOptions";
import PokemonTeam from "../components/PokemonTeam";

const TrainerView = () => {

    const optionsRef = useRef(null);
    const [optionsDimensions, setOptionsDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setOptionsDimensions({ width, height });
            }
        });

        if (optionsRef.current) {
            observer.observe(optionsRef.current);
        }

        return () => {
            if (optionsRef.current) {
                observer.unobserve(optionsRef.current);
            }
        };
    }, []);

    return (
        <div className="TrainerView">
            <div className="Header">
                <div className="Title">My Trainer</div>
                <SupportPokeball />
            </div>
            <div className="Options" ref={optionsRef}>
                <div className="TrainerCardArea">
                    <TrainerCard/>
                </div>
                <div className="OptionsArea">
                    <TeamOptions/>
                </div>
                <div className="PokemonTeamArea">
                    <PokemonTeam/>
                    {/* <div style={{ backgroundColor: 'white', height: '100%', width: '100%' }}/> */}
                </div>
            </div>
        </div>
    );
};

export default TrainerView;
