export interface PokemonProps {
  name: string;
  id: number;
  url?: string;
  image?: string;
  image2?: string;
}

export interface PokedexProps {
  order: number;
  limit: number;
  count: number;
  next: string;
  previous: string;
  pokemons: PokemonProps[];
}
