import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Logo/brand che sta a sinistra */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Awesome Pizza
        </Typography>

        {/* Box per centrare i bottoni */}
        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              '&:hover': {
                backgroundColor: '#f50057',  // Colore hover
                color: 'white',               // Colore del testo al hover
              },
              margin: '0 15px',               // Distanza tra i bottoni
            }}
          >
            Pizza
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/orders"
            sx={{
              '&:hover': {
                backgroundColor: '#f50057',
                color: 'white',
              },
              margin: '0 15px',
            }}
          >
            Orders
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
