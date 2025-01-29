import React, { FC } from "react";
import "./styles/HPBar.scss";

interface HPBarProps {

}

const HPBar: FC<HPBarProps> = () => {
    return (
        <div className="HPBar">
            <div className="HPLabel">HP</div>
            <div className="HPBarU"/>
            <div className="HPBarUnder">
              <div className="HPBarIndicator"></div>
            </div>
        </div>
    );
}

export default HPBar;