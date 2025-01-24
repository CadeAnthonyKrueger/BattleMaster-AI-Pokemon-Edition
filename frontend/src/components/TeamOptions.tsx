import React, { useEffect, useRef } from "react";
import "./styles/TeamOptions.scss";
import "./styles/SharedStyles.scss";
import ControlsContainer from "./ControlsContainer";

interface TeamOptionsProps {}

const TeamOptions: React.FC<TeamOptionsProps> = () => {

    return (
        <div className="TeamOptions">
            <div className="CardTitle" style={{ width: '94%', marginTop: '3.65px' }}>
                Settings
                <div className="CardTitleShadow">Settings</div>
            </div>
            <ControlsContainer/>
        </div>
    );

};

export default TeamOptions;