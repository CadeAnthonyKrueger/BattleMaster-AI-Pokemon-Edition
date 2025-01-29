import React, { FC, useState } from "react";
import PokemonCard from "./PokemonCard";
import { PokemonInstance } from "./PokemonTeam";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import PokemonSlot from "./PokemonSlot";

interface PokemonTeamGridAreaProps {}

const PokemonTeamGridArea: FC<PokemonTeamGridAreaProps> = () => {

    const [pokemonTeam, setPokemonTeam] = useState<PokemonInstance[]>([
        //{ id: 'salamence', pokemon: { name: 'Salamence', pokedexNumber: '0373', typeIndexes: [16, 2], image: 'SALAMENCE.png' }, level: 35, gender: 'male' },
        { id: 'kirlia', pokemon: { name: 'Kirlia', pokedexNumber: '0281', typeIndexes: [14, 18], image: 'KIRLIA.png' }, level: 16, gender: 'female' },
        //{ id: 'houndoom', pokemon: { name: 'Houndoom', pokedexNumber: '0229', typeIndexes: [10, 17], image: 'HOUNDOOM.png' }, level: 41, gender: 'male' },
        //{ id: 'lycanroc', pokemon: { name: 'Lycanroc', pokedexNumber: '0745', typeIndexes: [5], image: 'LYCANROC.png' }, level: 32, gender: 'male' },
        { id: 'vespiquen', pokemon: { name: 'Vespiquen', pokedexNumber: '0416', typeIndexes: [6, 2], image: 'VESPIQUEN.png' }, level: 38, gender: 'female' },
        //{ id: 'archen', pokemon: { name: 'Archen', pokedexNumber: '0566', typeIndexes: [5, 2], image: 'ARCHEN.png' }, level: 12, gender: 'male' }
        { id: 'totodile', pokemon: { name: 'Totodile', pokedexNumber: '0158', typeIndexes: [11], image: 'TOTODILE.png' }, level: 11, gender: 'male' },
        //{ id: 'froakie', pokemon: { name: 'Froakie', pokedexNumber: '0656', typeIndexes: [11], image: 'FROAKIE.png' }, level: 9, gender: 'male' },
        //{ id: 'darmanitan', pokemon: { name: 'Darmanitan', pokedexNumber: '0555', typeIndexes: [10], image: 'DARMANITAN.png' }, level: 28, gender: 'male' },
        //{ id: 'metagross', pokemon: { name: 'Metagross', pokedexNumber: '0376', typeIndexes: [8, 14], image: 'METAGROSS.png' }, level: 56, gender: 'male' },
        //{ id: 'wailord', pokemon: { name: 'Wailord', pokedexNumber: '0321', typeIndexes: [11], image: 'WAILORD.png' }, level: 40, gender: 'male' },
        //{ id: 'hydreigon', pokemon: { name: 'Hydreigon', pokedexNumber: '0635', typeIndexes: [17, 16], image: 'HYDREIGON.png' }, level: 64, gender: 'male' },
        //{ id: 'luxray', pokemon: { name: 'Luxray', pokedexNumber: '0405', typeIndexes: [13], image: 'LUXRAY.png' }, level: 39, gender: 'male' },
        { id: 'vanilluxe', pokemon: { name: 'Vanilluxe', pokedexNumber: '0584', typeIndexes: [15], image: 'VANILLUXE.png' }, level: 36, gender: 'female' },
        //{ id: 'dhelmise', pokemon: { name: 'Dhelmise', pokedexNumber: '0781', typeIndexes: [7, 12], image: 'DHELMISE.png' }, level: 29, gender: 'male' },
        //{ id: 'flygon', pokemon: { name: 'Flygon', pokedexNumber: '0330', typeIndexes: [4, 16], image: 'FLYGON.png' }, level: 50, gender: 'female' },
        //{ id: 'porygon2', pokemon: { name: 'Porygon2', pokedexNumber: '0233', typeIndexes: [0], image: 'PORYGON2.png' }, level: 23, gender: 'female' },
        //{ id: 'xerneas', pokemon: { name: 'Xerneas', pokedexNumber: '0716', typeIndexes: [18], image: 'XERNEAS_1.png' }, level: 79, gender: 'female' },
        //{ id: 'gengar', pokemon: { name: 'Gengar', pokedexNumber: '0094', typeIndexes: [7, 3], image: 'GENGAR.png' }, level: 52, gender: 'male' },
        { id: 'palossand', pokemon: { name: 'Palossand', pokedexNumber: '0770', typeIndexes: [7, 4], image: 'PALOSSAND.png' }, level: 48, gender: 'male' },
        //{ id: 'dusknoir', pokemon: { name: 'Dusknoir', pokedexNumber: '0477', typeIndexes: [7], image: 'DUSKNOIR.png' }, level: 47, gender: 'male' },
        //{ id: 'chandelure', pokemon: { name: 'Chandelure', pokedexNumber: '0609', typeIndexes: [7, 10], image: 'CHANDELURE.png' }, level: 50, gender: 'female' },
        //{ id: 'drifblim', pokemon: { name: 'Drifblim', pokedexNumber: '0426', typeIndexes: [7, 2], image: 'DRIFBLIM.png' }, level: 49, gender: 'male' },
        //{ id: 'garchomp', pokemon: { name: 'Garchomp', pokedexNumber: '0445', typeIndexes: [16, 4], image: 'GARCHOMP.png' }, level: 60, gender: 'male' },
        { id: 'hitmontop', pokemon: { name: 'Hitmontop', pokedexNumber: '0237', typeIndexes: [1], image: 'HITMONTOP.png' }, level: 29, gender: 'male' },

    ]);

    const removePokemon = (id: string) => {
        console.log('removing ' + id);
        setPokemonTeam(prev => prev.filter(pokemon => pokemon.id !== id));
    };

    const handleDragOver = ({ active, over }: any) => {
        const oldIndex = pokemonTeam.findIndex((item) => item.id === active.id);
        const newIndex = pokemonTeam.findIndex((item) => item.id === over.id);

        const pokemonCards = document.querySelectorAll('.PokemonCardEmpty');
        pokemonCards.forEach((card, i) => {
            // if (i < pokemonTeam.length) { (card as HTMLDivElement).style.border = '1px solid rgba(255, 255, 255, 0.1)'; };
            if (i < pokemonTeam.length) { 
                (card as HTMLDivElement).style.boxShadow = 'none'; 
                (card as HTMLDivElement).style.border = '1px solid rgba(255, 255, 255, 0.1)';
            };
        });
        if (newIndex !== oldIndex) {
            const overCard = pokemonCards[newIndex] as HTMLDivElement;
            overCard.style.border = '2px solid rgba(0, 140, 226, 0.5)';
            overCard.style.boxShadow = 'inset 0 0 20px 0 black';
        }
    };

    const handleDragEnd = ({ active, over }: any) => {
        if (!over || active.id === over.id) return;
    
        // Find the indices of the dragged and dropped items
        const oldIndex = pokemonTeam.findIndex((item) => item.id === active.id);
        const newIndex = pokemonTeam.findIndex((item) => item.id === over.id);
    
        // Use arrayMove to reorder the array
        setPokemonTeam((prev) => {
            const card = (document.querySelectorAll('.PokemonCardEmpty')[newIndex] as HTMLDivElement)
            card.style.boxShadow = 'none';
            card.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            //console.log(arrayMove(prev, oldIndex, newIndex))
            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            <div className="PokemonTeamGridArea">
                <div className="PokemonTeamGrid">
                    {[0, 1, 2, 3, 4, 5].map((i) => 
                        <div className='PokemonSlot' key={i}>
                            <div className="PokemonCardEmpty" key={i}>
                                {i >= pokemonTeam.length && <div className="EmptyPlaceholder" key={i}/>}
                            </div>
                        </div>
                    )}
                </div>
                <SortableContext items={pokemonTeam.map((pkmn) => pkmn.id)}>
                    <div className="PokemonTeamGrid" style={{ position: 'absolute', pointerEvents: 'none' }}>
                        {pokemonTeam.map((pkmn) => <PokemonSlot id={pkmn.id} key={pkmn.id} pkmn={pkmn} removePokemon={removePokemon}/>)}
                    </div>
                </SortableContext>
            </div>
        </DndContext>
    );
}

export default PokemonTeamGridArea;
