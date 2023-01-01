import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Filters = () => {
  return (
    <>
      <p className="text-center text-3xl font-bold text-custom-blue">Filters</p>
      <div className=" flex  md:flex-col sm:items-center  overflow-x-scroll ">
        <Autocomplete
          className="mb-2 mt-4 mx-2"
          disablePortal
          id="combo-box-demo"
          options={['example', 'example2', 'example3']}
          sx={{
            width: '75%',
            minWidth: '3em',
            fontFamily:
              'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
          }}
          renderInput={(params) => <TextField {...params} label="Topic" />}
        />
        <Autocomplete
          className="mb-2 mt-4 mx-2"
          disablePortal
          id="combo-box-demo"
          options={['example', 'example2', 'example3']}
          sx={{
            width: '75%',
            minWidth: '3em',
            fontFamily:
              'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
          }}
          renderInput={(params) => (
            <TextField {...params} label="Text Modality" />
          )}
        />
        <Autocomplete
          className="mb-2 mt-4 mx-2"
          disablePortal
          id="combo-box-demo"
          options={['example', 'example2', 'example3']}
          sx={{
            width: '75%',
            minWidth: '3em',
            fontFamily:
              'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
          }}
          renderInput={(params) => <TextField {...params} label="Region" />}
        />
        <TextField
          className="mb-2 mt-4 mx-2"
          sx={{
            minWidth: '3em',
            width: '75%',
          }}
          id="standard-number"
          label="Max Count"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <Button className="mt-4 max-w-5" variant="outlined">
          Apply
        </Button>
      </div>
    </>
  );
};

export default Filters;
