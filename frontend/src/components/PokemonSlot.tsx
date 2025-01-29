import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import PokemonCard from "./PokemonCard";

interface PokemonSlotProps {
    id: string,
    pkmn: any;
    removePokemon: (id: string) => void;
}

const PokemonSlot: React.FC<PokemonSlotProps> = ({ id, pkmn, removePokemon }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    
    return (
        <div className="PokemonSlot" ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} 
            {...attributes} {...listeners}
        >
            <PokemonCard pokemonInstance={pkmn} removePokemon={removePokemon}/>
        </div>
    );

};

export default PokemonSlot;