import React, { useEffect, useRef, useState } from "react";
import "./styles/DescriptionContainer.scss";
import { useOverlay } from "../utilities/OverlayContext";
import { DescriptionOverlay } from "../utilities/Overlays";

interface DescriptionContainerProps {}

interface ElementMetrics {
    width: number;
    height: number;
    x: number;
    y: number;
}

const DescriptionContainer: React.FC<DescriptionContainerProps> = ({}) => {

    const description = "May is a skilled Pokémon Trainer from Hoenn with a balanced and strategic approach to battles. She favors well-rounded teams and often uses Pokémon like Blaziken, Beautifly, and Glaceon. May's battling style combines precision with adaptability, making her a formidable opponent and a talented coordinator in Pokémon Contests.";
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const descRef = useRef<HTMLDivElement | null>(null);

    const [metrics, setMetrics] = useState<ElementMetrics>({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const container = descRef.current;

        if (!container) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                const { x, y } = container.getBoundingClientRect();
                setMetrics(prev => { return { ...prev, width, x, y }});
                if (!isExpanded) {
                    setMetrics(prev => { return { ...prev, height }});
                } else {
                    const descriptionDiv = container.querySelector('.Description');
                    const descriptionTitleDiv = container.querySelector('.DescriptionTitle');
                    let h = 0;
                    if (descriptionDiv && descriptionTitleDiv) {
                        h = descriptionDiv.getBoundingClientRect().height + descriptionTitleDiv.getBoundingClientRect().height + 10;
                    }
                    setMetrics(prev => { return { ...prev, height: h }});
                }
            }
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [descRef, isExpanded]);

    const { addOverlay } = useOverlay();

    const handleMenuChange = () => {
        const container = descRef.current;
        if (!container) return;
        else { console.log("rendered") + "isExpanded?: " + isExpanded }
        if (isExpanded) {
            setMetrics(prev => ({
                ...prev,
                height: container.getBoundingClientRect().height,
            }));
            setTimeout(() => {
                setIsExpanded((prev: boolean) => !prev);
            }, 500);
        } else {
            setIsExpanded(prev => !prev);
            const descriptionDiv = container.querySelector('.Description');
            const descriptionTitleDiv = container.querySelector('.DescriptionTitle');
            let h = 0;
            if (descriptionDiv && descriptionTitleDiv) {
                h = descriptionDiv.getBoundingClientRect().height + descriptionTitleDiv.getBoundingClientRect().height + 10;
            }
            setTimeout(() => { 
                setMetrics(prev => ({
                    ...prev,
                    height: (h as number),
                }));
            }, 1); 
        }
    }

    useEffect(() => {
        let time = 1
        if (!isExpanded) { time = 500 }
        setTimeout(() => {
            addOverlay({
                    className: "DescriptionContainer Overlay",
                    component: DescriptionOverlay,
                    props: { isExpanded, metrics, description, handleMenuChange }
            });
        }, time);
    }, [isExpanded]);

    useEffect(() => {
        let time = 100;
        if (!isExpanded) { time = 1 }
        setTimeout(() => {
            addOverlay({
                    className: "DescriptionContainer Overlay",
                    component: DescriptionOverlay,
                    props: { isExpanded, metrics, description, handleMenuChange }
            });
        }, time);
    }, [metrics]);

    return (
        <div className='DescriptionContainer Static' ref={descRef} style={{
            opacity: `${isExpanded ? 0 : 1}`
        }}>
            <div className={`DescriptionMask ${isExpanded ? 'Expanded' : ''}`}>
                <div className="DescriptionTitle">Description</div>
                <div className="Description">{description}</div>
            </div>
            <div className="Expand" onClick={handleMenuChange} style={{
                backgroundImage: `url(/assets/${isExpanded ? 'minus_icon.png' : 'plus_icon.png'})`
            }}/>
        </div>
    )
}

export default DescriptionContainer;