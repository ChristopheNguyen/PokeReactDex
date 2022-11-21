import React, { createContext, FC } from 'react';
import { useFetchPokedex } from '../api/hooks/useFetchPokedex';
import { INIT_POKEDEX } from '../common/constants';
import { PokedexProps } from '../common/props';

export const PokedexContext =
  createContext<PokedexProps>(INIT_POKEDEX);

// Pokedex Provider
interface PokedexProviderProps {
  offset: number;
  limit: number;
  children: React.ReactNode;
}
export const PokedexProvider: FC<PokedexProviderProps> = ({
  offset,
  limit,
  children,
}) => {
  const fetchedPokedex = useFetchPokedex(offset, limit);

  return (
    <PokedexContext.Provider value={fetchedPokedex}>
      {children}
    </PokedexContext.Provider>
  );
};
