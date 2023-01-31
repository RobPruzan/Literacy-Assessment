import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Filters = () => {
  return (
    <div className="overflow-y-visible ">
      <div className=" flex  h-full w-full overflow-y-visible overflow-x-scroll sm:items-center  md:flex-col">
        <Autocomplete
          className="mx-2 mb-2 mt-4 overflow-visible"
          disablePortal
          id="combo-box-demo"
          options={['example', 'example2', 'example3']}
          sx={{
            overflowY: 'visible !important',
            width: '75%',
            minWidth: '3em',
            fontFamily:
              'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
          }}
          renderInput={(params) => <TextField {...params} label="Topic" />}
        />
        <Autocomplete
          className="mx-2 mb-2 mt-4 overflow-visible"
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
          className="mx-2 mb-2 mt-4 overflow-visible"
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
          className="mx-2 mb-2 mt-4 overflow-visible "
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
        <Button className="max-w-5 mt-4" variant="outlined">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default Filters;
