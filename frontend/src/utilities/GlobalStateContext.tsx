import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for storing multiple states
type StateRegistry = {
    [key: string]: any; // Stores state values dynamically
};

type StateSetterRegistry = {
    [key: string]: React.Dispatch<React.SetStateAction<any>>; // Stores state setters dynamically
};

// Define context type
interface StateContextType {
    state: StateRegistry;
    setState: StateSetterRegistry;
    registerState: <T>(key: string, initialValue: T) => [T, React.Dispatch<React.SetStateAction<T>>];
}

// Create the context
const GlobalStateContext = createContext<StateContextType | undefined>(undefined);

// Provider component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<StateRegistry>({});
    const [setters, setSetters] = useState<StateSetterRegistry>({});

    // Function to register a new piece of state
    const registerState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
        if (!setters[key]) {
            // Ensure the state key is initialized
            setState((prev) => ({ ...prev, [key]: prev[key] ?? initialValue }));
    
            // Define the state setter function
            const setStateFunction: React.Dispatch<React.SetStateAction<T>> = (value) => {
                setState((prev) => ({
                    ...prev,
                    [key]: typeof value === "function" ? (value as (prevValue: T) => T)(prev[key] ?? initialValue) : value,
                }));
            };
    
            // Store the setter function
            setSetters((prev) => ({ ...prev, [key]: setStateFunction }));
        }
    
        // Ensure both the state and setter exist before returning
        return [state[key] ?? initialValue, setters[key] ?? (() => {})];
    };

    return (
        <GlobalStateContext.Provider value={{ state, setState: setters, registerState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = <T,>(key: string, initialValue?: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useStateValue must be used within a StateProvider");
    }

    const { state, setState: setters, registerState } = context;

    if (!(key in state) && initialValue !== undefined) {
        registerState(key, initialValue);
    }

    return [state[key] ?? initialValue, setters[key] ?? (() => {})];
};
