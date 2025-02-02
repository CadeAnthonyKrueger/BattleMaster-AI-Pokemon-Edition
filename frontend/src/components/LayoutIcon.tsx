import React, { FC } from "react";
import "./styles/LayoutIcon.scss";

interface LayoutIconProps {
    layout: string;
    isSelected: boolean;
    onClick: () => void;
}

const LayoutIcon: FC<LayoutIconProps> = ({ layout, isSelected, onClick }) => {

    return (
        <div className={`LayoutIcon ${layout === 'Small Icons' ? 'small' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={onClick}>
            {[0, 1, 2, 3].map((i) => <div className="LayoutIconSlot" key={i}/>)}
        </div>
    );
}

export default LayoutIcon;