import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, RefObject } from 'react';
import '../pages/styles/BattleSetupPage.scss';

interface TooltipContextType {
    registerTooltip: (ref: React.RefObject<HTMLDivElement> | HTMLDivElement, title: string, orient?: string, active?: boolean) => void;
    unregisterTooltip: (ref: React.RefObject<HTMLDivElement> | HTMLDivElement) => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const useTooltip = () => {
    const context = useContext(TooltipContext);
    if (!context) {
        throw new Error('useTooltip must be used within a TooltipProvider');
    }
    return context;
};

interface TooltipProviderProps {
    children: ReactNode;
}

interface TooltipOrientation {
    [key: string]: {
        position: (rect: DOMRect) => { x: number; y: number };
        transform: string;
        arrowPosition: { [key: string]: string };
        arrowTransform: string;
    };
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
    const [tooltip, setTooltip] = useState<{ title: string; orient: string, position: { x: number; y: number } } | null>(null);
    const elementsRef = useRef<Map<React.RefObject<HTMLDivElement> | HTMLDivElement, string>>(new Map());

    const orientations: TooltipOrientation = {
        'top': { 
            position: (rect: any) => { return { x: rect.left + rect.width / 2, y: rect.top } },
            transform: `translateY(-130%) translateX(-50%)`,
            arrowPosition: { bottom: '0', left: '50%' },
            arrowTransform: 'translateX(-50%) translateY(50%) rotate(-135deg)'
        },
        'left': { 
            position: (rect: any) => { return { x: rect.left, y: rect.top + rect.height / 2 } },
            transform: `translateY(-50%) translateX(-110%)`,
            arrowPosition: { left: '100%', top: '50%' },
            arrowTransform: 'translateX(-50%) translateY(-50%) rotate(-135deg)'
        },
        'right': { 
            position: (rect: any) => { return { x: rect.left + rect.width, y: rect.top + rect.height / 2 } },
            transform: `translateY(-50%) translateX(10%)`,
            arrowPosition: { left: '0', top: '50%' },
            arrowTransform: 'translateX(-50%) translateY(-50%) rotate(-135deg)'
        },
        'bottom': { 
            position: (rect: any) => { return { x: rect.left + rect.width / 2, y: rect.top + rect.height } },
            transform: `translateY(30%) translateX(-50%)`,
            arrowPosition: { left: '50%', top: '0' },
            arrowTransform: 'translateX(-50%) translateY(-50%) rotate(-135deg)'
        }
    };

    useEffect(() => {
        return () => { elementsRef.current.clear(); };
    }, []);

    let handlers: (() => void)[] = [];

    const registerTooltip = (ref: RefObject<HTMLDivElement> | HTMLDivElement, title: string, orient: string = 'top', active: boolean = false) => {
        elementsRef.current.set(ref, title);

        const element = (ref instanceof HTMLDivElement) ? ref : ref.current;
        if (element) {
            const handleMouseEnter = () => {
                const rect = element.getBoundingClientRect();
                setTooltip({
                    title,
                    orient,
                    position: orientations[orient].position(rect),
                });
            };

            const handleMouseLeave = () => {
                setTooltip(null);
            };

            if (active) handleMouseEnter();
            handlers.push(handleMouseEnter);
            handlers.push(handleMouseLeave);

            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    };

    const unregisterTooltip = (ref: React.RefObject<HTMLDivElement> | HTMLDivElement) => {
        //console.log(ref);
    
        // Get the actual DOM element
        const element = ref instanceof HTMLElement ? ref : ref.current;
        
        if (element) {
            element.removeEventListener('mouseenter', handlers[0]);
            element.removeEventListener('mouseleave', handlers[1]);
            setTooltip(null);
        }
    
        elementsRef.current.delete(ref);
        //console.log(elementsRef.current)
    };
    

    return (
        <TooltipContext.Provider value={{ registerTooltip, unregisterTooltip }}>
            {children}
            {tooltip && (
                <div className="Tooltip" style={{ 
                    top: `${tooltip.position.y}px`, left: `${tooltip.position.x}px`, transform: orientations[tooltip.orient].transform,
                    zIndex: 1000000000000
                }}>
                    {tooltip.title}
                    <div className="TooltipArrow" style={{ ...{ 
                        transform: orientations[tooltip.orient].arrowTransform 
                    }, ...orientations[tooltip.orient].arrowPosition }}/>
                </div>
            )}
        </TooltipContext.Provider>
    );
};