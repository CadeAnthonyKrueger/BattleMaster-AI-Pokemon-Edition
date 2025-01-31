import React, { FC, RefObject, useEffect, useRef, useState } from "react";
import "./styles/ControlsContainer.scss";
import { useTooltip } from "../utilities/TooltipContext";

interface Control {
    title: string;
    image: string;
    function?: () => void;
    ref?: RefObject<HTMLDivElement | null>;
}

interface ControlsContainerProps {
    container: string;
    additionalControls?: Control[];
    additionalActive?: boolean;
}

const ControlsContainer: FC<ControlsContainerProps> = ({ container, additionalControls, additionalActive }) => {

    const controlRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [controls, setControls] = useState<Control[]>([
        { title: 'Randomize', image: 'random.png' }, 
        { title: 'Reset', image: 'reset.png' }
    ]);

    useEffect(() => {
        if (additionalControls) {
            if (additionalActive) {
                setControls(prev => prev.concat(additionalControls));
            } else {
                setControls(prev => prev.slice(0, 2));
            }
        }
    }, [additionalActive]);
    
    const { registerTooltip, unregisterTooltip } = useTooltip();

    useEffect(() => {
        controlRefs.current.forEach((element, index) => {
            if (element) {
                registerTooltip(element, controls[index].title);
            }    
        });
    }, [controls, controlRefs]);

    return (
        <div className="ControlsContainer">
            {controls.map((control, index) => 
                <div className="Control" ref={el => { controlRefs.current[index] = el; }} 
                    style={{ backgroundImage: `url('/assets/${control.image}')`}} key={index}/>
            )}
        </div>
    )
}

export default ControlsContainer;