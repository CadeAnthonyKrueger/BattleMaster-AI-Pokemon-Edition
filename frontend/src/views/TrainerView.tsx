import React, { useRef, useState, useEffect } from "react";
import "./styles/TrainerView.scss";
import SupportPokeball from "../components/SupportPokeball";
import TrainerCard from "../components/TrainerCard";

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
                <div className="OptionsArea"><div className="temp" /></div>
                <div className="PokemonTeamArea"><div className="temp" /></div>
                <div className="LoadOptionsArea"><div className="temp" /></div>
            </div>
        </div>
    );
};

export default TrainerView;
