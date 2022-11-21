import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FC, useState } from 'react';
import SelectedPokemonProvider from '../context-provider/SelectedPokemonContextProvider';
import { PokemonList } from './PokemonList';
import { PokemonSelected } from './SelectedPokemonModal';
import { PokemonAutoComplete } from './PokemonSearchList';
import { PokedexProvider } from '../context-provider/PokedexContextProvider';

const limit = 20;

const Pokedex: FC = () => {
  const [offset, setOffset] = useState<number>(0);

  const previous = (): void => {
    setOffset(offset - limit);
  };

  const next = (): void => {
    setOffset(offset + limit);
  };

  return (
    <PokedexProvider offset={offset} limit={limit}>
      <SelectedPokemonProvider>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Typography gutterBottom variant="h5" component="h2">
            Offset: {offset}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Limit: {limit}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" onClick={previous}>
            Previous
          </Button>
          <PokemonAutoComplete />
          <Button variant="contained" onClick={next}>
            Next
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
        ></Stack>
        <PokemonList />
        <PokemonSelected />
      </SelectedPokemonProvider>
    </PokedexProvider>
  );
};

export default Pokedex;
