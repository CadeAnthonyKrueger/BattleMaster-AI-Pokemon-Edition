import React, { useRef, useState } from "react";
import "./styles/TrainerView.scss";
import SupportPokeball from "../components/SupportPokeball";

const TrainerView = () => {

    return (
        <div className="TrainerView">
            <div className="Header">
                <div className="Title">My Trainer</div>
                <SupportPokeball/>
            </div>        
        </div>
    )

};

export default TrainerView;