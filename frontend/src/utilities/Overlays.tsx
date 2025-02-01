import React, { RefObject, useEffect, useRef, useState } from "react";
import '../components/styles/TrainerSelect.scss';
import TrainerSelect from "../components/TrainerSelect";

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

export const TrainerSelectOverlay: React.FC<OverlayProps> = () => {

    return (
        <div className='TrainerSelect Overlay'>
            <TrainerSelect/>
        </div>
    );
}