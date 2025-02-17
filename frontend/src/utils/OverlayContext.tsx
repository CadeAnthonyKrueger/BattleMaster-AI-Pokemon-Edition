import React, { createContext, useState, useContext, ReactNode, FC } from "react";

export interface Overlay {
    className: string,
    component: FC<any>,
    props: any,
    flag?: boolean
}

export interface OverlayContext {
    overlays: Overlay[],
    addOverlay: (overlay: Overlay) => void,
    removeOverlay: (className: string) => void
}

const OverlayContext = createContext<OverlayContext>({
    overlays: [],
    addOverlay: function (): void {
        throw new Error("Function not implemented.");
    },
    removeOverlay: function (): void {
        throw new Error("Function not implemented.");
    }
});

export const OverlayProvider = ({ children } : { children: ReactNode }) => {
    const [overlays, setOverlays] = useState<Overlay[]>([]);

    const addOverlay = (overlay: Overlay) => {
        removeOverlay(overlay.className);
        setOverlays((prev) => [...prev, overlay]);
    };

    const removeOverlay = (className: string) => {
        setOverlays((prev) => prev.filter((o) => o.className !== className));
    };

    return (
        <OverlayContext.Provider value={{ overlays, addOverlay, removeOverlay }}>
            {children}
        </OverlayContext.Provider>
    );
};

export const useOverlay = () => useContext(OverlayContext);
