import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Filters = () => {
  return (
    <div className="overflow-scroll">
      <div className=" flex  md:flex-col sm:items-center  overflow-x-scroll  overflow-y-scroll">
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
          className="mb-2 mt-4 mx-2 overflow-visible"
          sx={{
            width: '75%',
            minWidth: '3em',
            fontFamily:
              'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
          }}
          id="standard-number"
          type="number"
          label="Max Count"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <Button className="mt-4 max-w-5" variant="outlined">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default Filters;
