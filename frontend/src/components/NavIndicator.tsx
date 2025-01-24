import React, { RefObject, SetStateAction } from "react";
import "./styles/NavIndicator.scss";
import NavSection from "./NavSection";

interface NavIndicatorProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<SetStateAction<number>>;
    navViewRef: RefObject<HTMLDivElement | null>;
};

export interface NavSectionInfo {
    icon: string;
    trainer: string;
    title: string;
};

const NavIndicator: React.FC<NavIndicatorProps> = ({ currentPage, setCurrentPage, navViewRef }) => {

    //const navIcons: string[] = ["trainer.png", "rival.jpg", "island.png", "overview.png"];

    const navSectionInfo: NavSectionInfo[] = [
        {icon: "gear_wrench.png", trainer: "PROFESSOR.png", title: "Options"},
        {icon: "grouped_pokeballs.png", trainer: "POKEMONTRAINER_Red.png", title: "My Trainer"},
        {icon: "opponent_AI.png", trainer: "RIVAL1.png", title: "AI Trainer"},
        {icon: "quality_overview.png", trainer: "GENTLEMAN.png", title: "Overview"}
    ];

    return (
        <div className="NavIndicator">
            {navSectionInfo.map((info: NavSectionInfo, n: number) => {
                return (
                    <NavSection pageNumber={n+1} currentPage={currentPage} setCurrentPage={setCurrentPage} info={info} key={n}/>
                )
            })}
        </div>
    )

};

export default NavIndicator;