import React, { RefObject, useEffect } from "react";
import "./styles/OverlayPane.scss";
import { useOverlay, OverlayContext, Overlay } from "../utilities/OverlayContext";

const OverlayPane = ({ contentRef }: { contentRef: RefObject<HTMLDivElement | null> }) => {

    const { overlays } = (useOverlay() as OverlayContext);

    useEffect(() => {
        const container = contentRef.current;
        const active = overlays.filter((o) => o.flag == true).length;
        console.log(overlays)
        console.log(overlays.length + ' ' + active);
        if (active > 0 && container) {
            container.style.filter = 'blur(4px)';
        }
        if (active <= 0 && container) {
            container.style.filter = 'blur(0px)'
        }
    }, [contentRef, overlays]);

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