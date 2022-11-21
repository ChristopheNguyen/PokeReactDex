import React, { createContext, FC, useState } from 'react';
import { INIT_POKEMON } from '../common/constants';
import { PokemonProps } from '../common/props';

// SelectedPokemon Context
export interface SelectedPokemonContextProps {
  pokemon: PokemonProps;
  selectPokemon: (pokemon: PokemonProps) => void;
}

export const SelectedPokemonContext =
  createContext<SelectedPokemonContextProps>({
    pokemon: INIT_POKEMON,
    selectPokemon: () => {},
  });

// SelectedPokemon Provider
interface SelectedPokemonProviderProps {
  children: React.ReactNode;
}
const SelectedPokemonProvider: FC<SelectedPokemonProviderProps> = ({
  children,
}) => {
  const [pokemon, setPokemon] = useState<PokemonProps>(INIT_POKEMON);

  const value = React.useMemo(
    () => ({
      pokemon,
      selectPokemon: (pokemon: PokemonProps) => {
        setPokemon(pokemon);
      },
    }),
    [pokemon]
  );

  return (
    <SelectedPokemonContext.Provider value={value}>
      {children}
    </SelectedPokemonContext.Provider>
  );
};

export default SelectedPokemonProvider;
