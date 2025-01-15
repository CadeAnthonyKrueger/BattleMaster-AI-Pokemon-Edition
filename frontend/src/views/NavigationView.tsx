import React, { useRef, useState } from "react";
import "./styles/NavigationView.scss";
import NavButton from "../components/NavButton";
import NavIndicator from "../components/NavIndicator";

const NavigationView = () => {

    const navViewRef = useRef<HTMLDivElement | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        <div className="NavigationView" ref={navViewRef}>
            <NavButton isNext={false} setCurrentPage={setCurrentPage}/>
            <NavIndicator currentPage={currentPage} setCurrentPage={setCurrentPage} navViewRef={navViewRef}/>
            <NavButton isNext={true} setCurrentPage={setCurrentPage}/>
        </div>
    )

};

export default NavigationView;