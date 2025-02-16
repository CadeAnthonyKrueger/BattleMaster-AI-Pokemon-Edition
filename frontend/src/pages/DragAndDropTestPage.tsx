import React, { useState } from "react";
import "./styles/DragAndDropTestPage.scss";
import SelectMenu from "../views/SelectMenu";
import { useSelectMenuStore } from "../stores/SelectMenuStore";
import { TooltipProvider } from "../contexts/TooltipContext";

const DragAndDropTestPage = () => {

  const menuButtons = ['Pokemon', 'Trainer', 'Item'];

  const { selectMenuActive, openMenu, currentMenuActive } = useSelectMenuStore();

  return (
    <TooltipProvider>
      <div className="DragAndDropTestPage">
        <div className={`Underlying ${selectMenuActive ? 'overlayActive' : ''}`}>
          <div className="MenuButtons">
            {menuButtons.map((button) => 
              <div className='MenuButton' key={button} onClick={
                (e) => openMenu(button.toLowerCase(), e.currentTarget)
              }>
                {button} Menu
              </div>
            )}
          </div>
        </div>
        <div className={`Overlying ${selectMenuActive ? 'overlayActive' : ''}`}>
          {selectMenuActive && <SelectMenu currentMenu={currentMenuActive}/>}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DragAndDropTestPage;

