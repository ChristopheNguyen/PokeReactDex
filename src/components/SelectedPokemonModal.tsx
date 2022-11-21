import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
  SelectedPokemonContext,
  SelectedPokemonContextProps,
} from '../context-provider/SelectedPokemonContextProvider';

export const PokemonSelected: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { pokemon }: SelectedPokemonContextProps = React.useContext(
    SelectedPokemonContext
  );

  useEffect(() => {
    if (pokemon.id === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [pokemon]);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="img"
              image={pokemon.image}
              alt="pokemon"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {pokemon.name}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
};
