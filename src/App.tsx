import { Box, Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import Pokedex from './components/Pokedex';

const App: FC = () => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            PokeReactDex
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box>
          <Container>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome to the PokeReactDex
            </Typography>
          </Container>
        </Box>
        <Pokedex />
      </main>
    </>
  );
};

export default App;
