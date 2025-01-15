import React, { SetStateAction, useEffect, useRef, useState } from "react";
import "../styles/NavIndicator.scss";
import { NavSectionInfo } from "../NavIndicator";
import { Callback } from "webpack-cli";

interface NavSectionProps {
    pageNumber: number;
    currentPage: number;
    setCurrentPage:  React.Dispatch<SetStateAction<number>>;
    info: NavSectionInfo;
}

const NavSection: React.FC<NavSectionProps> = ({ pageNumber, currentPage, setCurrentPage, info }) => {

    const pathPrefix: string = "/assets/";

    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        setIsActive(pageNumber === currentPage);
        console.log(currentPage + ' <- theirs | mine -> ' + pageNumber);
    }, [currentPage, pageNumber]);

    const handleClick = () => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="NavSection">
            <div className={`Icon${isActive ? " active" : ""}`} onClick={handleClick} style={{
                backgroundImage: `url('${pathPrefix + info.icon}')`
            }}/>
            <div className={`IconTitle${isActive ? " active" : ""}`}>{info.title}</div>
            <div className={`TrainerIcon${isActive ? " active" : ""}`} style={{
                backgroundImage: `url('${pathPrefix + info.trainer}')`,
                
            }}/>
        </div>
    )

};

export default NavSection;