import React, { FC, RefCallback } from "react";
import "./styles/LayoutIcon.scss";

interface LayoutIconProps {
    layout: string;
    ref?: RefCallback<HTMLDivElement | null>;
    isSelected: boolean;
    onClick: () => void;
}

const LayoutIcon: FC<LayoutIconProps> = ({ layout, ref = null, isSelected, onClick }) => {

    return (
        <div className={`LayoutIcon ${layout === 'Small Icons' ? 'small' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={onClick} ref={ref}>
            {[0, 1, 2, 3].map((i) => <div className="LayoutIconSlot" key={i}/>)}
        </div>
    );
}

export default LayoutIcon;