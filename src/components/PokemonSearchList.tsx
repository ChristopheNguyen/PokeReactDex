import React, { FC } from 'react';
import AutoComplete from './common/AutoComplete';
import { PokedexContext } from '../context-provider/PokedexContextProvider';
import { PokedexProps, PokemonProps } from '../common/props';
import fetchPokemon from '../api/fetchPokemon';
import {
  SelectedPokemonContextProps,
  SelectedPokemonContext,
} from '../context-provider/SelectedPokemonContextProvider';

export const PokemonAutoComplete: FC = () => {
  const pokedex: PokedexProps = React.useContext(PokedexContext);

  const { selectPokemon }: SelectedPokemonContextProps =
    React.useContext(SelectedPokemonContext);

  const suggestions: string[] = pokedex.pokemons.map(
    (result) => result.name
  );

  return (
    <AutoComplete
      label={'Choose your pokemon'}
      suggestions={suggestions}
      onSelect={(suggestion) => {
        const pokemon = pokedex.pokemons.find(
          (pokemon: PokemonProps) => pokemon.name === suggestion
        );
        if (pokemon !== undefined) {
          const fetchedPokemon = async (): Promise<void> => {
            const data = await fetchPokemon(pokemon.id, pokemon.url);
            if (data != null) {
              selectPokemon({
                id: data.order,
                name: data.species.name,
                image: data.sprites.front_default,
              });
            }
          };
          fetchedPokemon();
        }
      }}
    />
  );
};
