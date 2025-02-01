import path from "path";
import fs from "fs";
import { TrainerSchema } from "../../../models/TrainerModel";

export const trainerData: TrainerSchema[] = [];

let fileNames = fs.readdirSync(path.join(__dirname, '../../../../Pokemon Essentials v21.1 2023-07-30/Graphics/Trainers'));
fileNames = fileNames.filter((trainer) => trainer.slice(trainer.length - 8) !== 'back.png');

//console.log(fileNames);

let trainerClasses = fileNames.map((image) => {
    const halfCleaned = image.replace('png', '').replace('_F.', '').replace('_M.', '').replace('.', '');
    return halfCleaned.replace('1', '').replace('2', '').replace('POKEMONTRAINER_', '').replace('_', ' ');
});

// console.log(trainerClasses);
// Send output from above into chatGPT with the following prompt:

// For the following list, give me a separate list with girl names, boy names, or both, depending on which 
// trainers are male and female, or if there are two trainers. I want the names capitalized. Use random girl 
// or boy names depending on how you differentiated them. I need the list as a typescript list and the indexes 
// must match. Don't include the trainer classes. For professor, do professor oak. For both team rocket people
// do 'Grunt'. If the trainer already has a name next to their trainer class, give me an empty string ''.

let trainerNames = [
    'Emily', 'Sarah', 'Jake', 'Alex', 'Hiro', 'Tim', 'Max', 'Liam', 'Ethan', 'Mira', 'Emma & Jack', 'Ryan', 
    'Sophia', 'Zoe', 'Mia & Noah', 'Dean', '', '', '', '', 'Logan', 'Sam', 'Victor', 'Henry', 'George', 
    'Paul', 'Olivia', 'Lily', '', '', '', '', '', '', '', '', 'Elise', 'Hannah', 'Owen', 'Daisy', 'Finn', 
    'Violet', '', '', '', '', 'Oak', 'Isaac', 'Claire', 'Blue', 'Gary', 'Miles', 'Giovanni', 'Arthur', 'Troy', 
    'Albert', 'Mia & Alex', 'Eric', 'Daniel', 'Chloe', 'Tyler', 'Katie', 'Felix', 'Grunt', 'Grunt', 'Ella', 
    'Liam', 'Sophie', 'Jack', 'Anna & Bella', 'Grace & Ryan', 'Joey'
];

let trainers = trainerClasses.map((trainer, index) => {
    return `${trainer} ${trainerNames[index]}`;
});

// console.log(trainers);
// Send output from above into chatGPT with the following prompt:

//for this list, give me an exact 1 to 1 list of all of these trainers color that goes with them. Make them hex 
// value strings.

const trainerColors: string[] = [
    '#FFB6C1', '#FF69B4', '#808080', '#ADD8E6', '#A52A2A', '#228B22', '#8B4513', '#FFA500', '#FFD700', '#9400D3', 
    '#FF4500', '#4682B4', '#87CEEB', '#F08080', '#FFC0CB', '#696969', '#8A2BE2', '#A0522D', '#1E90FF', '#FFB6C1', 
    '#FFD700', '#87CEFA', '#DAA520', '#D3D3D3', '#8B0000', '#7FFFD4', '#FFC0CB', '#FF69B4', '#FF8C00', '#8B4513',
    '#32CD32', '#808080', '#A9A9A9', '#00BFFF', '#BA55D3', '#FFD700', '#FF6347', '#FFDAB9', '#7B68EE', '#FFDEAD', 
    '#00CED1', '#9370DB', '#00FA9A', '#98FB98', '#FF69B4', '#DC143C', '#696969', '#4169E1', '#FF00FF', '#4169E1', 
    '#4169E1', '#FF4500', '#2F4F4F', '#CD853F', '#4682B4', '#B0C4DE', '#FF7F50', '#FFD700', '#1E90FF', '#87CEFA', 
    '#00BFFF', '#ADD8E6', '#D2691E', '#2E8B57', '#2E8B57', '#F0E68C', '#FFA07A', '#FF69B4', '#FF6347', '#FFC0CB', 
    '#DAA520', '#FFA500'
];

// console.log(trainers);
// Send output from above into chatGPT with the following prompt:

// Now I need an exact 1 to 1 typescript list of descriptions for each trainer. Include specific pokemon 
// they like to use, what types they are known for, and maybe a little more. Model your descriptions after 
// this one for the trainer May in terms of wording, style, and length:

// "May is a skilled Pokémon Trainer from Hoenn with a balanced and strategic approach to battles. She favors 
// well-rounded teams and often uses Pokémon like Blaziken, Beautifly, and Glaceon. May's battling style combines 
// precision with adaptability, making her a formidable opponent and a talented coordinator in Pokémon Contests."

const trainerDescriptions: string[] = [
    "Aroma Lady Emily is a trainer who exudes calmness and grace. She specializes in Grass-type Pokémon like Roselia, Bellossom, and Cherrim. Her battling style emphasizes patience and status-inflicting moves, creating a serene yet challenging experience for her opponents.",
    "Beauty Sarah is a glamorous trainer known for her stylish battle tactics. She often uses Pokémon like Milotic, Ninetales, and Lopunny, showcasing both beauty and power. Sarah’s strategy focuses on dazzling her opponents while dealing precise and elegant damage.",
    "Biker Jake is a rough and tough trainer with a love for Poison- and Dark-type Pokémon such as Weezing, Muk, and Houndoom. He thrives on aggressive tactics and uses brute force to overwhelm his opponents, often surprising them with his bold strategies.",
    "Bird Keeper Alex is a dedicated avian enthusiast who trains Flying-type Pokémon like Pidgeot, Fearow, and Noctowl. His battles rely on speed and aerial maneuvers, making him a master of evasion and quick strikes.",
    "Black Belt Hiro is a martial arts master who focuses on Fighting-type Pokémon such as Machamp, Hitmonlee, and Medicham. His strategies center on close combat and raw physical strength, embodying the discipline and spirit of a true fighter.",
    "Bug Catcher Tim is an eager and energetic trainer who loves Bug-type Pokémon like Beedrill, Butterfree, and Scyther. His battle style is creative and unpredictable, often relying on clever tactics to outwit his opponents.",
    "Burglar Max is a sly and cunning trainer who favors Pokémon like Koffing, Sableye, and Shiftry. His strategy involves creating confusion and exploiting his opponents' weaknesses to gain the upper hand in battles.",
    "Camper Liam is an adventurous trainer who enjoys training Pokémon like Growlithe, Sandslash, and Raichu. His battle style is straightforward yet resourceful, reflecting his love for exploring the outdoors.",
    "Champion Ethan is an accomplished and versatile trainer with a diverse team featuring Pokémon like Typhlosion, Ampharos, and Crobat. His balanced and adaptive strategy makes him a worthy champion, prepared to face any challenge.",
    "Channeler Mira is a mysterious trainer deeply connected to Ghost-type Pokémon such as Gengar, Mismagius, and Banette. Her battles are eerie and unpredictable, as she uses status conditions and psychological tactics to unsettle her opponents.",
    "Cool Couple Emma & Jack are a dynamic duo who complement each other’s strengths in double battles. They often use Pokémon like Arcanine and Vaporeon, blending power and synergy to dominate their opponents.",
    "Cool Trainer Ryan is a confident and skilled trainer known for his well-rounded teams featuring Pokémon like Charizard, Gardevoir, and Metagross. His strategy combines offensive and defensive techniques, making him a formidable foe.",
    "Cool Trainer Sophia is a refined and intelligent trainer who uses Pokémon like Espeon, Altaria, and Absol. She excels in predicting her opponents’ moves and countering them with precision.",
    "Crush Girl Zoe is a spirited trainer specializing in Fighting-type Pokémon like Poliwrath, Primeape, and Breloom. Her aggressive tactics and unrelenting energy make her a tough opponent to beat.",
    "Crush Kin Mia & Noah are a playful pair who excel in double battles with Pokémon like Clefable and Machamp. Their teamwork and synchronization create a challenging dynamic for their opponents.",
    "Cue Ball Dean is a no-nonsense trainer who prefers Poison- and Fighting-type Pokémon like Muk, Toxicroak, and Hitmonchan. His straightforward battle style relies on sheer power and durability.",
    "Elite Four Agatha is a seasoned trainer who commands Ghost- and Poison-type Pokémon like Gengar, Haunter, and Arbok. Her expertise lies in creating confusion and exploiting status conditions.",
    "Elite Four Bruno is a master of Fighting-type Pokémon, often using Machamp, Hitmontop, and Steelix. His battles showcase physical power and resilience, making him a daunting opponent.",
    "Elite Four Lance is a legendary Dragon-type trainer with a team featuring Dragonite, Salamence, and Gyarados. His strategy revolves around overwhelming his opponents with sheer power and speed.",
    "Elite Four Lorelei is a master of Ice-type Pokémon like Lapras, Dewgong, and Cloyster. She excels in defensive strategies and freezing her opponents in their tracks.",
    "Engineer Logan is a tech-savvy trainer who uses Electric-type Pokémon like Electrode, Magneton, and Jolteon. His battles focus on speed and disruptive tactics.",
    "Fisherman Sam is a calm and patient trainer who specializes in Water-type Pokémon such as Gyarados, Lanturn, and Whiscash. His strategies reflect his steady and adaptable nature.",
    "Gambler Victor is a risk-taker who trains Pokémon like Persian, Alakazam, and Jolteon. His unpredictable strategies often catch opponents off guard.",
    "Gentleman Henry is a distinguished trainer who favors elegant Pokémon like Rapidash, Ninetales, and Pidgeot. His refined battle style reflects his sophistication.",
    "Hiker George is a sturdy trainer with a passion for Rock- and Ground-type Pokémon like Golem, Rhydon, and Onix. His battles rely on defensive strategies and heavy hits.",
    "Juggler Paul is an eccentric trainer known for his tricky battle tactics with Pokémon like Mr. Mime, Kadabra, and Hypno. His strategies keep opponents guessing.",
    "Lady Olivia is a graceful and stylish trainer who uses Pokémon like Togekiss, Roserade, and Milotic. Her battles are a blend of beauty and precision.",
    "Lass Lily is a cheerful trainer who enjoys battling with Pokémon like Pikachu, Clefairy, and Jigglypuff. Her tactics are playful yet effective.",
    "Leader Blaine is a fiery trainer specializing in Fire-type Pokémon such as Magmar, Rapidash, and Arcanine. His battles are intense and relentless, reflecting his passion for flames.",
    "Leader Brock is a rock-solid trainer who focuses on Rock-type Pokémon like Onix, Geodude, and Kabutops. His strategy emphasizes defense and durability.",
    "Leader Erika is a serene and nature-loving trainer who specializes in Grass-type Pokémon like Vileplume, Bellossom, and Tangela. Her strategies focus on status effects and sustainability, reflecting her connection to nature.",
    "Leader Giovanni is a calculating and formidable trainer who commands Ground- and Rock-type Pokémon like Rhyperior, Nidoking, and Dugtrio. His battle style is both powerful and precise, making him a challenging opponent.",
    "Leader Koga is a master of Poison-type Pokémon who utilizes Venomoth, Weezing, and Crobat. His tactics focus on inflicting status conditions and wearing down his opponents.",
    "Leader Misty is a Water-type expert known for her strong and versatile Pokémon, including Starmie, Gyarados, and Vaporeon. Her strategy combines adaptability and powerful water-based attacks.",
    "Leader Sabrina is a Psychic-type specialist who battles with Pokémon like Alakazam, Espeon, and Slowbro. Her tactics rely on overwhelming opponents with mental prowess and strategic foresight.",
    "Leader Surge is a bold and energetic trainer who specializes in Electric-type Pokémon like Raichu, Electabuzz, and Magneton. His high-voltage strategies focus on speed and raw power.",
    "Painter Elise is an imaginative trainer who uses Pokémon like Smeargle, Chimecho, and Delcatty. Her unique and creative battle style mirrors her artistic spirit.",
    "Picnicker Hannah is a cheerful and adventurous trainer who favors Pokémon like Ivysaur, Nidorina, and Meowth. Her battles are lighthearted yet effective, showcasing her playful nature.",
    "PokéManiac Owen is an eccentric collector who battles with rare Pokémon such as Lickitung, Aerodactyl, and Kangaskhan. His unpredictable style stems from his passion for unique Pokémon.",
    "Pokémon Breeder Daisy is a caring and supportive trainer who relies on Pokémon like Clefairy, Blissey, and Azumarill. Her strategy focuses on nurturing her team and ensuring their longevity in battles.",
    "Pokémon Ranger Finn is a resourceful and courageous trainer who uses Pokémon like Manectric, Tropius, and Flygon. His battle strategies are grounded in adaptability and a deep respect for nature.",
    "Pokémon Ranger Violet is an agile and clever trainer who commands Pokémon like Roserade, Staraptor, and Luxray. Her speed-focused tactics emphasize precise strikes and quick maneuvers.",
    "Brendan is a confident and well-rounded Pokémon Trainer from Hoenn. His team includes Pokémon like Sceptile, Swellow, and Aggron, showcasing his ability to adapt to various challenges.",
    "Leaf is a skilled and determined trainer from Kanto with a balanced team of Pokémon like Venusaur, Nidoqueen, and Pidgeot. Her strategic approach emphasizes her team’s strengths in battle.",
    "May is a talented Pokémon Trainer from Hoenn known for her balanced team featuring Pokémon like Blaziken, Beautifly, and Glaceon. Her adaptable and precise strategies make her a formidable opponent and an expert in Pokémon Contests.",
    "Red is a legendary Pokémon Trainer from Kanto renowned for his silent determination and unmatched skill. His iconic team includes Pikachu, Charizard, and Snorlax, blending power, precision, and adaptability.",
    "Professor Oak is a world-famous Pokémon researcher who occasionally battles with Pokémon like Dragonite, Tauros, and Exeggutor. His deep knowledge of Pokémon shapes his thoughtful battle strategies.",
    "Psychic Isaac is a focused and enigmatic trainer who specializes in Psychic-type Pokémon like Alakazam, Xatu, and Hypno. His calculated strategies reflect his mastery of mind-based battles.",
    "Psychic Claire is a graceful and intuitive trainer who commands Pokémon like Gardevoir, Espeon, and Jynx. Her elegant battle style relies on precision and psychic power.",
    "Rival Blue is a competitive and skilled trainer with a well-rounded team featuring Pokémon like Arcanine, Alakazam, and Pidgeot. His aggressive yet tactical approach makes him a fierce opponent.",
    "Rival Gary is a confident and versatile trainer known for his diverse team, including Blastoise, Electivire, and Umbreon. His strategies focus on outsmarting and overpowering his rivals.",
    "Rocker Miles is an electrifying trainer who specializes in Electric-type Pokémon like Jolteon, Ampharos, and Electrode. His fast-paced and high-energy strategies keep his opponents on their toes.",
    "Rocket Boss Giovanni is a ruthless and powerful trainer who commands a team of Ground-type Pokémon like Rhyperior, Nidoqueen, and Dugtrio. His calculated battle style is as intimidating as his leadership of Team Rocket.",
    "Ruin Maniac Arthur is a dedicated explorer with a fondness for Rock- and Ground-type Pokémon like Onix, Kabutops, and Baltoy. His strategies reflect his knowledge of ancient ruins and their Pokémon.",
    "Sailor Troy is a hardy and steadfast trainer who specializes in Water-type Pokémon like Pelipper, Tentacruel, and Wailord. His battles are a reflection of his life at sea, combining resilience and force.",
    "Scientist Albert is a methodical and innovative trainer who uses Pokémon like Magneton, Porygon, and Voltorb. His strategies revolve around precision and technology.",
    "Sis and Bro Mia & Alex are a coordinated sibling duo who excel with a team of Water- and Psychic-type Pokémon like Starmie and Slowbro. Their synchronized attacks make them a tough challenge.",
    "Super Nerd Eric is a highly intelligent trainer who specializes in Poison- and Electric-type Pokémon like Muk, Magnemite, and Koffing. His analytical battle strategies focus on exploiting weaknesses.",
    "Swimmer Daniel is a swift and confident Water-type specialist who uses Pokémon like Starmie, Seaking, and Lapras. His fast and fluid strategies make him a formidable trainer in water battles.",
    "Swimmer Chloe is a graceful and resourceful trainer who excels with Water-type Pokémon like Milotic, Luvdisc, and Azumarill. Her battle style reflects her elegance and adaptability.",
    "Swimmer Tyler is a spirited trainer who favors Water-type Pokémon like Gyarados, Kingdra, and Mantine. His bold and powerful attacks make him a challenging opponent.",
    "Swimmer Katie is a vibrant and determined trainer who specializes in Water-type Pokémon like Corsola, Vaporeon, and Lanturn. Her strategies blend speed with resilience.",
    "Tamer Felix is a commanding and fearless trainer who excels with Dragon- and Dark-type Pokémon like Salamence, Houndoom, and Tyranitar. His aggressive battle style highlights his dominance.",
    "Team Rocket Grunt is a resourceful but less experienced member of Team Rocket. Their team often includes Pokémon like Raticate, Zubat, and Koffing, using basic yet cunning strategies.",
    "Team Rocket Grunt is a resourceful but less experienced member of Team Rocket. Their team often includes Pokémon like Raticate, Zubat, and Koffing, using basic yet cunning strategies.",
    "Tuber Ella is a playful and enthusiastic young trainer who enjoys battling with Water-type Pokémon like Marill, Horsea, and Goldeen. Her cheerful style makes her battles enjoyable.",
    "Tuber Liam is an energetic and eager trainer who prefers Water-type Pokémon like Poliwag, Psyduck, and Shellder. His passion for Pokémon shines in every battle.",
    "Tuber Sophie is a bright and curious trainer who specializes in Water-type Pokémon like Clamperl, Feebas, and Seel. Her strategies are imaginative and spirited.",
    "Tuber Jack is a lively and competitive trainer who uses Water-type Pokémon like Tentacool, Krabby, and Staryu. His enthusiasm drives his fast-paced battle style.",
    "Twins Anna & Bella are a perfectly synchronized duo who battle with complementary Pokémon like Plusle and Minun or Beautifly and Dustox. Their strategies revolve around teamwork and synergy.",
    "Young Couple Grace & Ryan are a romantic pair whose team includes Pokémon like Rapidash and Ninetales or Roserade and Gallade. Their battles highlight their love and mutual support.",
    "Youngster Joey is a spirited and confident trainer known for his love of Rattata. His early-game strategies rely on speed and quick attacks, embodying his youthful determination."
];

trainers.forEach((trainer, index) => {
    trainerData.push({ 
        name: trainer, 
        description: trainerDescriptions[index], 
        player_trainer: trainer.includes('Brendan') ? true : 
                        trainer.includes('May') ? true : 
                        trainer.includes('Leaf') ? true : 
                        trainer.includes('Red') ? true : false, 
        image: fileNames[index], 
        color: trainerColors[index] 
    });
});

console.log(trainerData)