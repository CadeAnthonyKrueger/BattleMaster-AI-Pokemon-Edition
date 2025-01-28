import React, { MouseEvent, RefObject, useEffect, useState } from "react";

interface OverlayProps {
    [key: string]: any;
}

export const DescriptionOverlay: React.FC<OverlayProps> = ({ isExpanded, metrics, description, handleMenuChange }) => {
    return (
        isExpanded && <div className={`DescriptionContainer Overlay`} style={{
            top: `${metrics.y}px`, left: `${metrics.x}px`, width: `${metrics.width}px`, height: `${metrics.height}px`,
            maxHeight: `calc(70% - ${metrics.y}px)`
        }}>
            <div className={`DescriptionMask Overlay ${isExpanded ? 'Expanded' : ''}`}>
                <div className="DescriptionTitle">Description</div>
                <div className="Description">{description}</div>
            </div>
            <div className="Expand" onClick={handleMenuChange} style={{
                backgroundImage: `url(/assets/${isExpanded ? 'minus_icon.png' : 'plus_icon.png'})`
            }}/>
        </div>
    );
}

export const PokemonCardOverlay: React.FC<OverlayProps> = ({ teamAreaRef, metrics, offset, onClickRelease }) => {

    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: metrics.left,
        y: metrics.top,
    });

    console.log(offset)
    
    useEffect(() => {
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        };

        const handleMouseLeave = (e: globalThis.MouseEvent) => {
            onClickRelease();
        };

        const teamAreaElement = teamAreaRef.current;

        teamAreaElement.addEventListener("mousemove", handleMouseMove);
        teamAreaElement.addEventListener("mouseup", handleMouseLeave);
        teamAreaElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            // Cleanup listener
            teamAreaElement.removeEventListener("mousemove", handleMouseMove);
            teamAreaElement.addEventListener("mouseup", handleMouseLeave);
            teamAreaElement.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div style={{ 
            top: `${position.y}px`, left: `${position.x}px`, height: `${metrics.height}px`, width: `${metrics.width}px`,
            backgroundColor: 'red', position: 'absolute', cursor: 'pointer'
        }}>

        </div>
    );
}