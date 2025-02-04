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
    const [updater, setUpdater] = useState<{ update: number, asc: boolean }>({ update: 0, asc: true });
    const [dataSize, setDataSize] = useState<number>(0);
    const trainerIDsFL = useRef<{ first: number, last: number }>({ first: 0, last: 0 });
    const columns = useRef<number>(1);
    const LOAD_SIZE = columns.current * 6;
    const MAX_LOAD = LOAD_SIZE * 2 + 10;

    const [lastScrolled, setLastScrolled] = useState<Element>();
    
    useEffect(() => {
        if (trainers.length > 0) { trainerIDsFL.current = { first: trainers[0].id, last: trainers[trainers.length - 1].id } };
    }, [trainers]);
    const fetchData = async (asc: boolean) => {
        try {
            const excluded = selectedTrainer.current.id ? [selectedTrainer.current.id] : [];
            //console.log(excluded)
            const data: TrainerSchema[] = await fetchTrainers({ 
                limit: LOAD_SIZE, 
                exclude: excluded, 
                lastElement: asc ? trainerIDsFL.current.last : trainerIDsFL.current.first,
                returnWithSize: true,
                asc: asc
            });
            //console.log(data)
            if (trainerIDsFL.current.last === 0) { setDataSize(data[data.length - 1] as unknown as number); }
            setTrainers(prev => {
                const condition = (selectedTrainer.current !== selectedTrainer.default) && prev[0] !== selectedTrainer.current;
                const selected = condition ? [selectedTrainer.current] : [];
                let result;
                if (asc) {
                    result = selected.concat(prev.concat(data.slice(0, data.length - 1)));
                } else {
                    //console.log(selected.concat(data.slice(0, data.length - 1).reverse().concat(prev)))
                    result = selected.concat(data.slice(0, data.length - 1).reverse().concat(prev));
                }
                //const result = selected.concat(prev.concat(data.slice(0, data.length - 1)));
                return result;
            });
        } catch (error) {
            console.error("Error fetching trainers:", error);
        }
    };

    const min = useRef<number>(10);
    const asc = useRef<boolean | ''>(true);

    useEffect(() => {
        fetchData(updater.asc);
    }, [updater]);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !(trainers.length > 0)) return;
    
        const cards = Array.from(container.children);

        columns.current = Math.max(Math.floor(container.getBoundingClientRect().width / cards[0]?.getBoundingClientRect().width), 1);
        //console.log(columns)

        if (trainers.length > MAX_LOAD) {
            console.log('max: ' + MAX_LOAD)
            setTrainers(prev => {
                //console.log(prev.length)
                return asc.current ? prev.slice(LOAD_SIZE) : prev.slice(0, MAX_LOAD);
            });
        }

        let prevId: string;
        let animationFrameId: number | null = null;
    
        const observer = new IntersectionObserver((entries) => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        
            animationFrameId = requestAnimationFrame(() => {
                let rowPassed = 0;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setLastScrolled(entry.target);
                        const columns = Math.max(Math.floor(container.getBoundingClientRect().width / entry.boundingClientRect.width), 1);
                        asc.current = (prevId && (parseInt(entry.target.id, 10) > parseInt(prevId, 10))) ?? asc.current;
                        if (rowPassed >= columns - 1) {
                            prevId = entry.target.id;
                            rowPassed = 0;
                        }
                        const above = parseInt(entry.target.id, 10);
                        const below = cards.length - parseInt(entry.target.id, 10) - 1;
                        if (trainerIDsFL.current.last !== dataSize && below < min.current && asc.current) {
                            //console.log('adding to bottom');
                            setUpdater(prev => { return { update: prev.update + 1, asc: true } });
                        } else if (trainerIDsFL.current.first !== 1 && above < min.current && !asc.current) {
                            //console.log('adding to top');
                            setUpdater(prev => { return { update: prev.update + 1, asc: false } });
                        }
                        rowPassed += 1;
                    }
                });
            });
        }, { root: container, threshold: 1 });
    
        cards.forEach(card => { observer.observe(card) });
    
        return () => {
            observer.disconnect();
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }
    }, [containerRef, trainers]);

    useEffect(() => {
        if (lastScrolled) lastScrolled.scrollIntoView();
    }, [layout])

    //const [placeholderCount, setPlaceholderCount] = useState<number>(0);
    const placeholderCount = ((trainers.length % columns.current) === 0 ? 0 : columns.current - trainers.length % columns.current);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
    
        // Create a new ResizeObserver
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const { width } = entry.contentRect;
                const children = Array.from(container.children);
                const cardWidth = children[0]?.getBoundingClientRect().width || Infinity;
                columns.current = Math.max(Math.floor(width / cardWidth), 1);
                //const psuedoCount = ((trainers.length % columns) === 0 ? 0 : columns - trainers.length % columns);
                //if (placeholderCount !== psuedoCount) setPlaceholderCount(psuedoCount);
            });
        });
    
        // Observe the container
        resizeObserver.observe(container);
    
        // Cleanup observer on component unmount
        return () => resizeObserver.disconnect();
      }, [containerRef, layout, trainers.length]);

    return (
        <div className="TrainerSelectCardContainer" ref={containerRef}>
            {trainers.map((trainer, index) => <TrainerCard id={index} trainer={trainer} isSelect={true} isMinimized={layout} key={trainer.id}/>)}
            {Array.from({ length: placeholderCount }, (_, index) => index).map((index: number) => { 
                return <div key={index} style={{ height: '1px', flex: '1 1 auto' }}/>
            })}
        </div>
    );

};

export default TrainerSelectCardContainer;