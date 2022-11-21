import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { useFetchPokemon } from '../api/hooks/useFetchPokemon';
import {
  SelectedPokemonContext,
  SelectedPokemonContextProps,
} from '../context-provider/SelectedPokemonContextProvider';
interface PokemonCardProps {
  id: number;
  url: string;
}

export const PokemonCard: FC<PokemonCardProps> = ({ id, url }) => {
  const { selectPokemon }: SelectedPokemonContextProps =
    React.useContext(SelectedPokemonContext);

  const fetchedPokemon = useFetchPokemon(id, url);

  if (fetchedPokemon.id === 0) {
    return null;
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
        }}
        onClick={() => {
          selectPokemon({
            id,
            name: fetchedPokemon.name,
            image: fetchedPokemon.image,
          });
        }}
      >
        <CardMedia
          component="img"
          image={fetchedPokemon.image}
          alt="pokemon"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            N°: {fetchedPokemon.id}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {fetchedPokemon.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
