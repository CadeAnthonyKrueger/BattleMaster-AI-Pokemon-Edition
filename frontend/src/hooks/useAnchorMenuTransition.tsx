import { useState, useEffect, CSSProperties } from "react";

interface MenuAnimationProps {
    baseRef: HTMLElement | null;
    finalClassName: string;
    menuClosing: boolean;
    closeMenu: () => void;
}

export const useAnchorMenuTransition = ({ baseRef, finalClassName, menuClosing, closeMenu }: MenuAnimationProps) => {

    // Animation states
    const [className, setClassName] = useState<string>("");
    const [styles, setStyles] = useState<{ menu: CSSProperties; content: CSSProperties }>({
        menu: { transition: "all 0.8s ease", position: "absolute" },
        content: {},
    });

    // Handle opening animation
    useEffect(() => {
        if (!baseRef) return;
        const { height, width, left, top } = baseRef.getBoundingClientRect();
        const backgroundColor = baseRef.style.backgroundColor;

        setStyles((prev) => ({
            ...prev,
            menu: { pointerEvents: 'none', height, width, left, top, backgroundColor },
        }));

        setTimeout(() => {
            setClassName(finalClassName);
            setStyles((prev) => ({ ...prev, menu: { pointerEvents: 'none' } }));
        }, 20);

        setTimeout(() => {
            setStyles((prev) => ({ ...prev, content: { opacity: 1 } }));
        }, 700);

        setTimeout(() => {
            setStyles((prev) => ({ ...prev, menu: { pointerEvents: 'all' } }));
        }, 1000);
    }, [baseRef]);

    // Handle closing animation
    useEffect(() => {
        if (!baseRef || !menuClosing) return;
        const { height, width, left, top } = baseRef.getBoundingClientRect();
        const backgroundColor = baseRef.style.backgroundColor;

        setStyles((prev) => ({ ...prev, content: { opacity: 0, pointerEvents: 'none' } }));

        setTimeout(() => {
            setClassName("");
            setStyles((prev) => ({
                ...prev,
                menu: { transition: "all 0.8s ease", position: "absolute", height, width, left, top, backgroundColor },
            }));
        }, 20);

        setTimeout(() => {
            closeMenu();
        }, 700);
    }, [menuClosing]);

    return { className, styles };
}
