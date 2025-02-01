import React, { FC, RefObject, useState } from "react";
import PokemonCard from "./PokemonCard";
import { PokemonInstance } from "./PokemonTeam";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import PokemonSlot from "./PokemonSlot";

interface PokemonTeamGridAreaProps {
    ref: RefObject<HTMLDivElement | null>;
}

const PokemonTeamGridArea: FC<PokemonTeamGridAreaProps> = ({ ref }) => {

    const [pokemonTeam, setPokemonTeam] = useState<PokemonInstance[]>([
        //{ id: 'salamence', pokemon: { name: 'Salamence', pokedexNumber: '0373', typeIndexes: [16, 2], image: 'SALAMENCE.png' }, level: 35, gender: 'male' },
        //{ id: 'kirlia', pokemon: { name: 'Kirlia', pokedexNumber: '0281', typeIndexes: [14, 18], image: 'KIRLIA.png' }, level: 16, gender: 'female' },
        //{ id: 'houndoom', pokemon: { name: 'Houndoom', pokedexNumber: '0229', typeIndexes: [10, 17], image: 'HOUNDOOM.png' }, level: 41, gender: 'male' },
        //{ id: 'lycanroc', pokemon: { name: 'Lycanroc', pokedexNumber: '0745', typeIndexes: [5], image: 'LYCANROC.png' }, level: 32, gender: 'male' },
        //{ id: 'vespiquen', pokemon: { name: 'Vespiquen', pokedexNumber: '0416', typeIndexes: [6, 2], image: 'VESPIQUEN.png' }, level: 38, gender: 'female' },
        { id: 'archen', pokemon: { name: 'Archen', pokedexNumber: '0566', typeIndexes: [5, 2], image: 'ARCHEN.png' }, level: 12, gender: 'male' },
        //{ id: 'totodile', pokemon: { name: 'Totodile', pokedexNumber: '0158', typeIndexes: [11], image: 'TOTODILE.png' }, level: 11, gender: 'male' },
        //{ id: 'froakie', pokemon: { name: 'Froakie', pokedexNumber: '0656', typeIndexes: [11], image: 'FROAKIE.png' }, level: 9, gender: 'male' },
        //{ id: 'darmanitan', pokemon: { name: 'Darmanitan', pokedexNumber: '0555', typeIndexes: [10], image: 'DARMANITAN.png' }, level: 28, gender: 'male' },
        //{ id: 'metagross', pokemon: { name: 'Metagross', pokedexNumber: '0376', typeIndexes: [8, 14], image: 'METAGROSS.png' }, level: 56, gender: 'male' },
        //{ id: 'wailord', pokemon: { name: 'Wailord', pokedexNumber: '0321', typeIndexes: [11], image: 'WAILORD.png' }, level: 40, gender: 'male' },
        //{ id: 'hydreigon', pokemon: { name: 'Hydreigon', pokedexNumber: '0635', typeIndexes: [17, 16], image: 'HYDREIGON.png' }, level: 64, gender: 'male' },
        //{ id: 'luxray', pokemon: { name: 'Luxray', pokedexNumber: '0405', typeIndexes: [13], image: 'LUXRAY.png' }, level: 39, gender: 'male' },
        //{ id: 'vanilluxe', pokemon: { name: 'Vanilluxe', pokedexNumber: '0584', typeIndexes: [15], image: 'VANILLUXE.png' }, level: 36, gender: 'female' },
        { id: 'dhelmise', pokemon: { name: 'Dhelmise', pokedexNumber: '0781', typeIndexes: [7, 12], image: 'DHELMISE.png' }, level: 29, gender: 'male' },
        //{ id: 'flygon', pokemon: { name: 'Flygon', pokedexNumber: '0330', typeIndexes: [4, 16], image: 'FLYGON.png' }, level: 50, gender: 'female' },
        //{ id: 'porygon2', pokemon: { name: 'Porygon2', pokedexNumber: '0233', typeIndexes: [0], image: 'PORYGON2.png' }, level: 23, gender: 'female' },
        //{ id: 'xerneas', pokemon: { name: 'Xerneas', pokedexNumber: '0716', typeIndexes: [18], image: 'XERNEAS_1.png' }, level: 79, gender: 'female' },
        //{ id: 'gengar', pokemon: { name: 'Gengar', pokedexNumber: '0094', typeIndexes: [7, 3], image: 'GENGAR.png' }, level: 52, gender: 'male' },
        //{ id: 'palossand', pokemon: { name: 'Palossand', pokedexNumber: '0770', typeIndexes: [7, 4], image: 'PALOSSAND.png' }, level: 48, gender: 'male' },
        //{ id: 'dusknoir', pokemon: { name: 'Dusknoir', pokedexNumber: '0477', typeIndexes: [7], image: 'DUSKNOIR.png' }, level: 47, gender: 'male' },
        //{ id: 'chandelure', pokemon: { name: 'Chandelure', pokedexNumber: '0609', typeIndexes: [7, 10], image: 'CHANDELURE.png' }, level: 50, gender: 'female' },
        { id: 'drifblim', pokemon: { name: 'Drifblim', pokedexNumber: '0426', typeIndexes: [7, 2], image: 'DRIFBLIM.png' }, level: 49, gender: 'male' },
        //{ id: 'garchomp', pokemon: { name: 'Garchomp', pokedexNumber: '0445', typeIndexes: [16, 4], image: 'GARCHOMP.png' }, level: 60, gender: 'male' },
        //{ id: 'hitmontop', pokemon: { name: 'Hitmontop', pokedexNumber: '0237', typeIndexes: [1], image: 'HITMONTOP.png' }, level: 29, gender: 'male' },
        //{ id: 'tyranitar', pokemon: { name: 'Tyranitar', pokedexNumber: '0248', typeIndexes: [5, 17], image: 'TYRANITAR.png' }, level: 59, gender: 'male' },
        //{ id: 'greninja', pokemon: { name: 'Greninja', pokedexNumber: '0658', typeIndexes: [11, 17], image: 'GRENINJA_2.png' }, level: 40, gender: 'male' },
        //{ id: 'sylveon', pokemon: { name: 'Sylveon', pokedexNumber: '0700', typeIndexes: [18], image: 'SYLVEON.png' }, level: 29, gender: 'female' },
        //{ id: 'leafeon', pokemon: { name: 'Leafeon', pokedexNumber: '0470', typeIndexes: [12], image: 'LEAFEON.png' }, level: 29, gender: 'female' },
        //{ id: 'umbreon', pokemon: { name: 'Umbreon', pokedexNumber: '0197', typeIndexes: [17], image: 'UMBREON.png' }, level: 29, gender: 'male' },
        { id: 'glaceon', pokemon: { name: 'Glaceon', pokedexNumber: '0471', typeIndexes: [15], image: 'GLACEON.png' }, level: 29, gender: 'female' },
        //{ id: 'espeon', pokemon: { name: 'Espeon', pokedexNumber: '0196', typeIndexes: [14], image: 'ESPEON.png' }, level: 29, gender: 'female' },
        //{ id: 'vaporeon', pokemon: { name: 'Vaporeon', pokedexNumber: '0470', typeIndexes: [11], image: 'VAPOREON.png' }, level: 29, gender: 'female' },
        //{ id: 'honedge', pokemon: { name: 'Honedge', pokedexNumber: '0679', typeIndexes: [8, 7], image: 'HONEDGE.png' }, level: 17, gender: 'male' },
        //{ id: 'chesnaught', pokemon: { name: 'Chesnaught', pokedexNumber: '0652', typeIndexes: [12, 1], image: 'CHESNAUGHT.png' }, level: 38, gender: 'male' },
        { id: 'rotom', pokemon: { name: 'Rotom', pokedexNumber: '0479', typeIndexes: [13], image: 'ROTOM.png' }, level: 20, gender: 'male' },
        //{ id: 'ariados', pokemon: { name: 'Ariados', pokedexNumber: '0168', typeIndexes: [6, 3], image: 'ARIADOS.png' }, level: 30, gender: 'male' },
        //{ id: 'garbodor', pokemon: { name: 'Garbodor', pokedexNumber: '0569', typeIndexes: [3], image: 'GARBODOR.png' }, level: 40, gender: 'male' },
        //{ id: 'dragonair', pokemon: { name: 'Dragonair', pokedexNumber: '0158', typeIndexes: [16], image: 'DRAGONAIR.png' }, level: 40, gender: 'female' },
        //{ id: 'druddigon', pokemon: { name: 'Druddigon', pokedexNumber: '0621', typeIndexes: [16], image: 'DRUDDIGON.png' }, level: 45, gender: 'male' },
        //{ id: 'haxorus', pokemon: { name: 'Haxorus', pokedexNumber: '0384', typeIndexes: [16], image: 'HAXORUS.png' }, level: 62, gender: 'female' },
        //{ id: 'rayquaza', pokemon: { name: 'Rayquaza', pokedexNumber: '0612', typeIndexes: [16, 2], image: 'RAYQUAZA.png' }, level: 75, gender: 'male' },
        //{ id: 'bulbasaur', pokemon: { name: 'Bulbasaur', pokedexNumber: '0001', typeIndexes: [12, 3], image: 'BULBASAUR.png' }, level: 12, gender: 'male' },
        //{ id: 'cyndaquil', pokemon: { name: 'Cyndaquil', pokedexNumber: '0155', typeIndexes: [10], image: 'CYNDAQUIL.png' }, level: 11, gender: 'male' },
        //{ id: 'mudkip', pokemon: { name: 'Mudkip', pokedexNumber: '0258', typeIndexes: [11], image: 'MUDKIP.png' }, level: 13, gender: 'male' },
        //{ id: 'chimchar', pokemon: { name: 'Chimchar', pokedexNumber: '0390', typeIndexes: [10], image: 'CHIMCHAR.png' }, level: 12, gender: 'male' },
        //{ id: 'oshawott', pokemon: { name: 'Oshawott', pokedexNumber: '0501', typeIndexes: [11], image: 'OSHAWOTT.png' }, level: 12, gender: 'male' },
        //{ id: 'rowlet', pokemon: { name: 'Rowlet', pokedexNumber: '0722', typeIndexes: [12, 2], image: 'ROWLET.png' }, level: 12, gender: 'male' },

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
                <div className="PokemonTeamGrid" ref={ref}>
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
