import React from "react";
import "./styles/TrainerCard.scss";

interface TrainerCardProps {}

const TrainerCard: React.FC<TrainerCardProps> = () => {

    return (
        <div className="TrainerCard">
            <div className="TrainerImage"/>
            <div className="Bag"/>
        </div>
    )

};

export default TrainerCard;