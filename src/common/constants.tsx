import { PokedexProps, PokemonProps } from './props';

export const INIT_POKEDEX: PokedexProps = {
  count: 0,
  next: '',
  previous: '',
  pokemons: [],
  order: 20,
  limit: 20,
};

export const INIT_POKEMON: PokemonProps = {
  id: 0,
  name: '',
};
