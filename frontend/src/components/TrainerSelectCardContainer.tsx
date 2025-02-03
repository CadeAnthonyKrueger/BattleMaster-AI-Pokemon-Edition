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
    const LOAD_SIZE = 22;

    const [cardsScrolled, setCardsScrolled] = useState<number>(0);
    const [lastScrolled, setLastScrolled] = useState<HTMLDivElement>();
    
    useEffect(() => {
        if (trainers.length > 0) { lastTrainerId.current = trainers[trainers.length - 1].id; }
        //console.log(lastTrainerId.current);
    }, [trainers]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const excluded = selectedTrainer.current.id ? [selectedTrainer.current.id] : [];
                //console.log(excluded)
                const data: TrainerSchema[] = await fetchTrainers({ 
                    limit: LOAD_SIZE, 
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
        if (!container || !(trainers.length > 0)) return;
    
        const cards = Array.from(container.children);
        //console.log(cards)
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    //console.log("Card in view:", entry.target);
                    setCardsScrolled(prev => prev + 1);
                    setLastScrolled(entry.target as HTMLDivElement);
                }
            });
        }, { root: container, threshold: 1 });
    
        cards.forEach(card => {
            //card.scrollIntoView({ behavior: "smooth", block: "nearest" });
            observer.observe(card)
        });
    
        return () => observer.disconnect();
    }, [containerRef, trainers, layout]);

    useEffect(() => {
        console.log(lastScrolled);
    }, [lastScrolled]);

    useEffect(() => {
        if (lastScrolled) lastScrolled.scrollIntoView();
    }, [layout])

    const [placeholderCount, setPlaceholderCount] = useState<number>(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
    
        // Create a new ResizeObserver
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const { width } = entry.contentRect;
                const children = Array.from(container.children);
                const cardWidth = children[0]?.getBoundingClientRect().width || Infinity;
                let { columns, adder } = { columns: 1, adder: cardWidth };
                while (adder <= width) {
                    adder += cardWidth;
                    if (adder > width) break;
                    else columns += 1;
                }
                const psuedoCount = ((trainers.length % columns) === 0 ? 0 : columns - trainers.length % columns);
                if (placeholderCount !== psuedoCount) setPlaceholderCount(psuedoCount);
            });
        });
    
        // Observe the container
        resizeObserver.observe(container);
    
        // Cleanup observer on component unmount
        return () => resizeObserver.disconnect();
      }, [containerRef, layout]);

    return (
        <div className="TrainerSelectCardContainer" ref={containerRef}>
            {trainers.map((trainer) => <TrainerCard trainer={trainer} isSelect={true} isMinimized={layout} key={trainer.id}/>)}
            {Array.from({ length: placeholderCount }, (_, index) => index).map((index: number) => { 
                return <div key={index} style={{ height: '1px', flex: '1 1 auto' }}/>
            })}
        </div>
    );

};

export default TrainerSelectCardContainer;