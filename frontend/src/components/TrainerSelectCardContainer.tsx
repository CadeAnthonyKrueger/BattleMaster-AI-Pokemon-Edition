import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import "./styles/TrainerSelectCardContainer.scss";
import TrainerCard from "./TrainerCard";
import fetchAllTrainers, { TrainerSchema } from "../requests/TrainerRequests";

interface TrainerSelectCardContainerProps {
    layout: boolean;
}

const TrainerSelectCardContainer: React.FC<TrainerSelectCardContainerProps> = ({ layout }) => {

    const [trainers, setTrainers] = useState<TrainerSchema[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllTrainers();
                setTrainers(data);
            } catch (error) {
                console.error("Error fetching trainers:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="TrainerSelectCardContainer">
            {trainers.map((trainer) => <TrainerCard trainer={trainer} isSelect={true} isMinimized={layout} key={trainer.id}/>)}
        </div>
    );

};

export default TrainerSelectCardContainer;