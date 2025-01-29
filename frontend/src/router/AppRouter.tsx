import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from '../pages/IntroPage';
import BattleSetupPage from "../pages/BattleSetupPage";
import VersusPage from "../pages/VersusPage";
import DragAndDropTestPage from "../pages/DragAndDropTestPage";

const AppRouter = () => {

    
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<IntroPage disabled={false}/>}/>
                <Route path="/setup" element={<BattleSetupPage/>}/>
                <Route path="/versus" element={<VersusPage/>}/>
                <Route path="/dnd" element={<DragAndDropTestPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;