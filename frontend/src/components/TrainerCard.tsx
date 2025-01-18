import React, { useEffect, useRef, useState } from "react";
import "./styles/TrainerCard.scss";
import DescriptionContainer from "./DescriptionContainer";

interface TrainerCardProps {}

// interface ElementMetrics {
//     width: number;
//     height: number;
//     x: number;
//     y: number;
// }

const TrainerCard: React.FC<TrainerCardProps> = () => {

    // const description = "May is a skilled Pokémon Trainer from Hoenn with a balanced and strategic approach to battles. She favors well-rounded teams and often uses Pokémon like Blaziken, Beautifly, and Glaceon. May's battling style combines precision with adaptability, making her a formidable opponent and a talented coordinator in Pokémon Contests.";
    // const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // const descRef = useRef<HTMLDivElement | null>(null);
    // const [metrics, setMetrics] = useState<ElementMetrics>({
    //     width: 0,
    //     height: 0,
    //     x: 0,
    //     y: 0,
    // });

    // useEffect(() => {
    //     const container = descRef.current;

    //     if (!container) return;

    //     // Create a ResizeObserver
    //     const resizeObserver = new ResizeObserver((entries) => {
    //         for (let entry of entries) {
    //             const { width, height } = entry.contentRect;
    //             const { x, y } = container.getBoundingClientRect();
    //             setMetrics(prev => { return { ...prev, width, x, y }});
    //             console.log(isExpanded)
    //             //setMetrics(prev => { return { ...prev, height }});
    //             if (!isExpanded) {
    //                 setMetrics(prev => { return { ...prev, height }});
    //             } else {
    //                 const descriptionDiv = container.querySelector('.Description');
    //                 const descriptionTitleDiv = container.querySelector('.DescriptionTitle');
    //                 let h = 0;
    //                 if (descriptionDiv && descriptionTitleDiv) {
    //                     h = descriptionDiv.getBoundingClientRect().height + descriptionTitleDiv.getBoundingClientRect().height + 10;
    //                 }
    //                 setMetrics(prev => { return { ...prev, height: h }});
    //             }
    //         }
    //     });

    //     // Observe the container element
    //     resizeObserver.observe(container);

    //     // Cleanup observer on unmount
    //     return () => {
    //         resizeObserver.disconnect();
    //     };
    // }, [descRef, isExpanded]);

    // const handleMenuChange = () => {
    //     const container = descRef.current;
    //     if (!container) return;
    //     if (isExpanded) {
    //         setMetrics(prev => ({
    //             ...prev,
    //             height: container.getBoundingClientRect().height,
    //         }));
    //         setTimeout(() => {
    //             setIsExpanded(prev => !prev);
    //         }, 500);
    //     } else { 
    //         setIsExpanded(prev => !prev);
    //         const descriptionDiv = container.querySelector('.Description');
    //         const descriptionTitleDiv = container.querySelector('.DescriptionTitle');
    //         let h = 0;
    //         if (descriptionDiv && descriptionTitleDiv) {
    //             h = descriptionDiv.getBoundingClientRect().height + descriptionTitleDiv.getBoundingClientRect().height + 10;
    //         }
    //         setTimeout(() => { 
    //             setMetrics(prev => ({
    //                 ...prev,
    //                 height: (h as number),
    //             }));
    //         }, 1); 
    //     }
    // }

    const [bagItemCount, setBagItemCount] = useState<number>(0);

    return (
        <div className="TrainerCard">
            <div className="TrainerBackground">
                <div className="TrainerImage"><div className="TrainerAvatar"/></div>
            </div>
            <div className="TrainerInfo">
                <div className="Name">May</div>
                <DescriptionContainer/>
                <div className="TrainerOptions">
                    <div className="TeamPresets">
                        <div className="PresetsInner">
                            <div className="PresetsIcon"/>
                            <div className="PresetsTitle">Presets</div>
                        </div>
                    </div>
                    <div className="Bag">
                        <div className="ItemCount">{bagItemCount}</div>
                    </div>
                </div>
            </div>
            <div className="ControlsContainer">
                <div className="Randomize"/>
                <div className="Reset"/>
            </div>
        </div>
    )

};

export default TrainerCard;