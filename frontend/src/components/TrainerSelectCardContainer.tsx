import React, { Dispatch, RefObject, SetStateAction, use, useEffect, useRef, useState } from "react";
import "./styles/TrainerSelectCardContainer.scss";
import TrainerCard from "./TrainerCard";
import { fetchTrainers, TrainerSchema } from "../requests/TrainerRequests";
import { useGlobalState } from "../utilities/GlobalStateStore";

interface TrainerSelectCardContainerProps {
    layout: boolean;
    trainers: TrainerSchema[];
    setTrainers: Dispatch<SetStateAction<TrainerSchema[]>>;
}

const TrainerSelectCardContainer: React.FC<TrainerSelectCardContainerProps> = ({ trainers, setTrainers, layout }) => {

    const { selectedTrainer, setSelectedTrainer } = useGlobalState();
    const [updater, setUpdater] = useState<number>(0);
    const [dataSize, setDataSize] = useState<number>(0);
    const lastTrainerId = useRef<number>(0);
    
    useEffect(() => {
        if (trainers.length > 0) { lastTrainerId.current = trainers[trainers.length - 1].id; }
        console.log(lastTrainerId.current);
    }, [trainers]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const excluded = selectedTrainer.current.id ? [selectedTrainer.current.id] : [];
                console.log(excluded)
                const data: TrainerSchema[] = await fetchTrainers({ 
                    limit: 20 - excluded.length + 1, 
                    exclude: excluded, 
                    lastElement: lastTrainerId.current,
                    returnWithSize: true
                });
                if (lastTrainerId.current === 0) { setDataSize(data[data.length - 1] as unknown as number); }
                setTrainers(prev => {
                    const condition = (selectedTrainer.current !== selectedTrainer.default) && prev[0] !== selectedTrainer.current;
                    const selected = condition ? [selectedTrainer.current] : [];
                    return selected.concat(prev.concat(data.slice(0, data.length - 1)));
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
                if (lastTrainerId.current < dataSize) setUpdater(prev => prev + 1);
            }
        };
    
        container.addEventListener("scroll", handleScroll);
    
        return () => container.removeEventListener("scroll", handleScroll);
    }, [lastTrainerId, dataSize, layout]);

    return (
        <div className="TrainerSelectCardContainer" ref={containerRef}>
            {trainers.map((trainer) => <TrainerCard trainer={trainer} isSelect={true} isMinimized={layout} key={trainer.id}/>)}
        </div>
    );

};

export default TrainerSelectCardContainer;