import { BaseStats } from "../../../models/BaseStatsModel";
import { PokemonEvolution } from "../../../models/PokemonEvolutionModel";
import { Pokemon } from "../../../models/PokemonModel";
import { parseData } from "./utilities/DataParser";

interface PokemonRaw {
    id: number;
    name: string;
    types: string[];
    base_stats: number[];
    gender_ratio: string;
    base_happiness: number;
    abilities: string[];
    hidden_abilities: string[];
    moves: { level: number, name: string }[];
    tutor_moves: string[];
    egg_moves: string[];
    height: number;
    weight: number;
    color: string;
    category: string;
    pokedex_entry: string;
    generation: number;
    evolutions: { name: string, method: string, level?: number, condition?: string };
    flags: string[];
}

const statement = (key: string, value: string, row: Partial<any>) => {
  switch (key) {
      case 'Name': row.name = value; break;
      case 'Types': row.types = value.split(','); break;
      case 'BaseStats': row.base_stats = value.split(',').map((stat) => parseInt(stat)); break;
      case 'GenderRatio': row.gender_ratio = value; break;
      case 'Happiness': row.base_happiness = parseInt(value); break;
      case 'Abilities': row.abilities = value.split(','); break;
      case 'HiddenAbilities': row.hidden_abilities = value.split(','); break;
      case 'Moves': row.moves = value.split(',').reduce<{ level: number, name: string }[]>((acc, val, index, arr) => {
          if (index % 2 === 0) {
              acc.push({ level: +val, name: arr[index + 1] });
          }
          return acc;
      }, []); break;
      case 'TutorMoves': row.tutor_moves = value.split(','); break;
      case 'EggMoves': row.egg_moves = value.split(','); break;
      case 'Height': row.height = parseFloat(value); break;
      case 'Weight': row.weight = parseFloat(value); break;
      case 'Color': row.color = value; break;
      case 'Category': row.category = value; break;
      case 'Pokedex': row.pokedex_entry = value; break;
      case 'Generation': row.generation = parseInt(value); break;
      case 'Evolutions': row.evolutions = value.split(',').reduce<{ name: string, method: string, level?: number, condition?: string }[]>((acc, curr, index, arr) => {
        if (index % 3 === 0) {
          acc.push({
            name: curr,
            method: arr[index + 1],
            ...(arr[index + 1] === 'Level' ? { level: +arr[index + 2] } : { condition: arr[index + 2] })
          });
        }
        return acc;
      }, []); break;
      case 'Flags': row.flags = value.split(','); break;
  }
}

const pokemonDataRaw: PokemonRaw[] = parseData('pokemon.txt', statement);
console.log(pokemonDataRaw.map((v) => v.evolutions))
const pokemonData: Pokemon[] = pokemonDataRaw.map((v) => { 
    return {
        id: v.id,
        name: v.name,
        gender_ratio: v.gender_ratio,
        base_happiness: v.base_happiness,
        height: v.height,
        weight: v.weight,
        color: v.color,
        category: v.category,
        pokedex_entry: v.pokedex_entry,
        generation: v.generation,
        pokemon_class: v.flags ? v.flags.includes('Legendary') ? 'Legendary' : v.flags.includes('Mythical') ? 'Mythical' : v.flags.includes('UltraBeast') ? 'UltraBeast' : 'Regular' : 'Regular',
        has_gendered_form: (v.flags && v.flags.includes('HasGenderedSprites')) ? 1 : 0,
        image: `${v.name.toUpperCase()}.png`
    } 
});
const pokemonMap = new Map(pokemonData.map(pokemon => [pokemon.name, pokemon.id]));
//console.log(pokemonData)
//console.log(pokemonData.map((p) => p.gender_ratio))

const baseStatsData: BaseStats[] = pokemonDataRaw.map((v) => { 
    return { 
        pokemon_id: v.id, 
        total: v.base_stats.reduce((sum, value) => sum + value, 0),
        hp: v.base_stats[0],
        attack: v.base_stats[1], 
        defense: v.base_stats[2], 
        special_attack: v.base_stats[4], 
        special_defense: v.base_stats[5], 
        speed: v.base_stats[3] 
    };
});
//console.log(baseStatsData)

// const pokemonEvolutionData: PokemonEvolution[] = pokemonDataRaw.map((v) => {
//     return {
//       pokemon_id: v.id,
//       pokemon_evolution_id: pokemonMap.get(v.evolutions.name),
//       evolution_method: v.evolutions.method,
//       evolution_level: v.evolutions.level
//     }
// });

