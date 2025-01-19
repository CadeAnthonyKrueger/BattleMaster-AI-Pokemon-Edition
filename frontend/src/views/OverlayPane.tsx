import React, { RefObject, useEffect, useRef } from "react";
import "./styles/OverlayPane.scss";
import { useOverlay, OverlayContext, Overlay } from "../utilities/OverlayContext";

const OverlayPane = ({ contentRef }: { contentRef: RefObject<HTMLDivElement | null> }) => {

    const { overlays } = (useOverlay() as OverlayContext);

    const self = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = contentRef.current;
        const ref = self.current;
        const active = overlays.filter((o) => o.flag == true).length;
        if (active > 0 && container && ref) {
            container.style.filter = 'blur(4px)';
            ref.style.pointerEvents = 'all';
        }
        if (active <= 0 && container && ref) {
            container.style.filter = 'blur(0px)';
            ref.style.pointerEvents = 'none';
        }
    }, [contentRef, overlays]);

    return (
        <div className="OverlayPane" ref={self}>
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