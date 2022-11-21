import { Container, Grid } from '@mui/material';
import React, { FC } from 'react';
import { PokedexContext } from '../context-provider/PokedexContextProvider';
import { PokedexProps } from '../common/props';

import { PokemonCard } from './PokemonCard';

export const PokemonList: FC = () => {
  const pokedex: PokedexProps = React.useContext(PokedexContext);
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {pokedex?.pokemons.map((result, key) => (
          <PokemonCard
            id={result.id}
            url={result.url != null ? result.url : ''}
            key={result.name}
          />
        ))}
      </Grid>
    </Container>
  );
};
