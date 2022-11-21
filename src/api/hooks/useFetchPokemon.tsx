import { useState, useEffect } from 'react';
import { INIT_POKEMON } from '../../common/constants';
import { PokemonProps } from '../../common/props';
import fetchPokemon from '../fetchPokemon';

export const useFetchPokemon = (
  id: number,
  url: string
): PokemonProps => {
  const [pokemon, setPokemon] = useState<PokemonProps>(INIT_POKEMON);
  useEffect(() => {
    const fetchedPokemon = async (): Promise<void> => {
      const data = await fetchPokemon(id, url);
      if (data != null) {
        setPokemon({
          id: data.order,
          name: data.species.name,
          image: data.sprites.front_default,
        });
      }
    };
    fetchedPokemon();
  }, [id, url]);

  return pokemon;
};
