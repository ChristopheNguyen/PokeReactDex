import { useEffect, useState } from 'react';
import { INIT_POKEDEX } from '../../common/constants';
import { PokedexProps } from '../../common/props';
import fetchPokedex from '../fetchPokedex';

export const useFetchPokedex = (
  offset: number,
  limit: number
): PokedexProps => {
  const [pokedex, setPokedex] = useState<PokedexProps>(INIT_POKEDEX);
  useEffect(() => {
    const fetchedPokedex = async (): Promise<void> => {
      const data = await fetchPokedex(offset, limit);
      if (data != null) {
        const pokemons = data.results.map((result, key) => {
          return {
            ...result,
            id: offset + key + 1,
          };
        });
        setPokedex({
          ...pokedex,
          count: data.count,
          next: data.next,
          previous: data.previous,
          pokemons,
        });
      }
    };
    fetchedPokedex();
  }, [offset]);
  return pokedex;
};
