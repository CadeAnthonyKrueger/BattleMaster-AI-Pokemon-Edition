import { parseData } from "./utilities/DataParser";

interface PokemonRaw {
    id: number;
    name: string;
    types: string[];
    base_stats: number[];
    gender_ratio: string;
    happiness: number;
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
    image: string;
}

const statement = (key: string, value: string, row: Partial<any>) => {
  switch (key) {
      case 'Name': row.name = value; break;
      case 'Types': row.types = value.split(','); break;
      case 'BaseStats': row.base_stats = value.split(',').map((stat) => parseInt(stat)); break;
      case 'GenderRatio': row.gender_ratio = value; break;
      case 'Happiness': row.happiness = parseInt(value); break;
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
  }
}

const pokemonDataRaw: PokemonRaw[] = parseData('pokemon.txt', statement);

console.log(pokemonDataRaw);
