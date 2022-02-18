
export interface pokemonData{
    [key: number] : IPokemon
}

export interface IPokemon{
    id: number;
    num: string;
    name: string;
    img: string;
    type: string[];
    height: string;
    weight: string;
    candy: string;
    candy_count: number;
    egg: string;
    spwan_chance: number;
    avg_spawns: number;
    spawn_time:string;
    multipliers: number[];
    weaknesses: string[];
    next_evolution: IEvolution[];
}

export interface IEvolution{
    num: string;
    name: string;
}
