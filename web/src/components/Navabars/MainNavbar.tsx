import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const MainNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {'<logo>'}
          </Typography>
          <Button sx={{ fontFamily: 'inherit' }} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
