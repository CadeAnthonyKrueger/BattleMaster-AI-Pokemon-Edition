import React, { FC, useEffect, useState } from "react";
import "./styles/ControlsContainer.scss";

interface Control {
    title: string;
    image: string;
    function?: () => void;
}

interface ControlsContainerProps {
    additionalControls?: Control[];
    additionalActive?: boolean;
}

const ControlsContainer: FC<ControlsContainerProps> = ({ additionalControls, additionalActive }) => {

    const [controls, setControls] = useState<Control[]>([ { title: 'Randomize', image: 'random.png' }, { title: 'Reset', image: 'reset.png' } ]);

    useEffect(() => {
        if (additionalControls) {
            if (additionalActive) {
                setControls(prev => prev.concat(additionalControls));
            } else {
                setControls(prev => prev.slice(0, 2));
            }
        }
    }, [additionalActive]);

    return (
        <div className="ControlsContainer">
            {controls.map((control, index) => 
                <div className="Control" style={{ backgroundImage: `url('/assets/${control.image}')`}} key={index}/>
            )}
        </div>
    )
}

export default ControlsContainer;