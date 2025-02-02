import React, { Dispatch, RefObject, SetStateAction, use, useEffect, useRef, useState } from "react";
import "./styles/TrainerSelectCardContainer.scss";
import TrainerCard from "./TrainerCard";
import { fetchTrainers, fetchAllTrainers, TrainerSchema } from "../requests/TrainerRequests";
import { useGlobalState } from "../utilities/GlobalStateStore";

interface TrainerSelectCardContainerProps {
    layout: boolean;
    trainers: TrainerSchema[];
    setTrainers: Dispatch<SetStateAction<TrainerSchema[]>>;
}

const TrainerSelectCardContainer: React.FC<TrainerSelectCardContainerProps> = ({ trainers, setTrainers, layout }) => {

    const { selectedTrainer, setSelectedTrainer } = useGlobalState();
    const [updater, setUpdater] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const excluded = trainers.map((trainer) => trainer.id) as number[];
                console.log(excluded)
                const data: TrainerSchema[] = await fetchTrainers(12, excluded);
                setTrainers(prev => {
                    const selected = excluded !== undefined ? [selectedTrainer.current] : [];
                    return selected.concat(prev.concat(data));
                });
            } catch (error) {
                console.error("Error fetching trainers:", error);
            }
        };

        fetchData();
    }, [updater]);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollPosition = container.scrollTop;
            const containerHeight = container.clientHeight;
            const scrollHeight = container.scrollHeight;

            //console.log(`position: ${scrollPosition} container: ${containerHeight} scroll: ${scrollHeight}`);
    
            if ((scrollPosition + containerHeight >= scrollHeight / 2)) {
                setUpdater(prev => prev + 1);
            }
        };
    
        container.addEventListener("scroll", handleScroll);
    
        return () => container?.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="TrainerSelectCardContainer" ref={containerRef}>
            {trainers.map((trainer) => <TrainerCard trainer={trainer} isSelect={true} isMinimized={layout} key={trainer.id}/>)}
        </div>
    );

};

export default TrainerSelectCardContainer;