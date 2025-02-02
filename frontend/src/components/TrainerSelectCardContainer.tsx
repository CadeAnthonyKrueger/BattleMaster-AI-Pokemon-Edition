import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
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

    const [fetchCount, setFetchCount] = useState<number>(0);
    const { selectedTrainer, setSelectedTrainer } = useGlobalState();
    
    useEffect(() => {

        const fetchData = async () => {
            try {
                const data: TrainerSchema[] = await fetchTrainers(12, fetchCount);
                console.log(data);
                setTrainers(prev => {
                    if (selectedTrainer.current !== selectedTrainer.default) return [(selectedTrainer.current)].concat(prev.concat(data));
                    return prev.concat(data);
                });
            } catch (error) {
                console.error("Error fetching trainers:", error);
            }
        };

        fetchData();
    }, [fetchCount]);

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
                setFetchCount(prev => prev + 12);
                console.log('here')
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