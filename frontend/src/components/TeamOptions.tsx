import React, { useEffect, useRef } from "react";
import "./styles/TeamOptions.scss";
import "./styles/SharedStyles.scss";
import ControlsContainer from "./ControlsContainer";
import CardTitleContainer from "./CardTitleContainer";

interface TeamOptionsProps {}

const TeamOptions: React.FC<TeamOptionsProps> = () => {

    return (
        <div className="TeamOptions">
            <CardTitleContainer text={'Settings'} style={{ width: '94%', marginTop: '3.65px' }}/>
            <ControlsContainer container="TeamOptions"/>
        </div>
    );

};

export default TeamOptions;