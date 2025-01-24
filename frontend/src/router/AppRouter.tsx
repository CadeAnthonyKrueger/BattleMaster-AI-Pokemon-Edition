import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from '../pages/IntroPage';
import BattleSetupPage from "../pages/BattleSetupPage";
import VersusPage from "../pages/VersusPage";

const AppRouter = () => {

    
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<IntroPage disabled={false}/>}/>
                <Route path="/setup" element={<BattleSetupPage/>}/>
                <Route path="/versus" element={<VersusPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;