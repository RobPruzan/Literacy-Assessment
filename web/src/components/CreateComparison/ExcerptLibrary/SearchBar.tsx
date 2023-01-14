import * as React from 'react';

import DirectionsIcon from '@mui/icons-material/Directions';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
  return (
    <div className="border-custom-blood-red border-2  m-6 mt-0 opacity-50 ">
      <Paper
        className=" "
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'auto',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search For Excerpts"
          inputProps={{ 'aria-label': 'search excerpts' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </div>
  );
};
