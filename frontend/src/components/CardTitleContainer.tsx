import React, { CSSProperties, FC } from "react";
import './styles/SharedStyles.scss';

interface CardTitleContainerProps {
    text: string;
    style?: CSSProperties;
    color?: string;
    wrap?: boolean;
    fontSize?: number;
    width?: number;
}

const CardTitleContainer: FC<CardTitleContainerProps> = ({ text, style, color, wrap, fontSize, width }) => {
    return (
        <div className="CardTitleContainer" style={style}>
            <div className="CardTitle" style={{ 
                fontSize: `${fontSize}px`, textWrap: `${wrap ? '' : 'no'}wrap`, width: `${width}%`
            }}>
                {text}
                <div className="CardTitleShadow" style={{ fontSize: `${fontSize}px`, color: `${color}`, textWrap: `${wrap ? '' : 'no'}wrap` }}>
                    {text}
                </div>
            </div>
        </div>
    );
}

export default CardTitleContainer;