import React from "react";
import "./styles/NavButton.scss";

interface NavButtonProps {
    isNext: boolean;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const NavButton: React.FC<NavButtonProps> = ({ isNext, setCurrentPage }) => {

    const navigate = () => {
        setCurrentPage(prev => {
            const newPage: number = prev + (isNext ? 1 : -1);
            return ((newPage < 1 || newPage > 4) ? prev : newPage);
        });
    };

    return (
        <button className="NavButton" onClick={navigate}>
            <div className="Arrow" style={{transform: `rotate(${isNext ? "0" : "180"}deg)`}}/>
        </button>
    )

};

export default NavButton;