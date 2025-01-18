import React from "react";
import "./styles/OverlayPane.scss";
import { useOverlay, OverlayContext, Overlay } from "../utilities/OverlayContext";

const OverlayPane = () => {

    const { overlays } = (useOverlay() as OverlayContext);

    return (
        <div className="OverlayPane">
            {overlays.map((overlay: Overlay, index: number) => {
                const Component = overlay.component;
                return (
                    <Component {...overlay.props} key={index}/>
                );
            }
        )}
    </div>
    )

};

export default OverlayPane;