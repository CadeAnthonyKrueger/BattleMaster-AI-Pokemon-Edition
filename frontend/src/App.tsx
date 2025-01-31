import React from "react";
import "./App.scss";
import AppRouter from "./router/AppRouter";
import { TooltipProvider } from "./utilities/TooltipContext";

const App = () => {

    return (
        // <TooltipProvider>
        <div className="App">
            <AppRouter/>
        </div>
        //{/* </TooltipProvider> */}
    )

};

export default App;