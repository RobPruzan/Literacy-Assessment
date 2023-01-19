import React from 'react';
import { TextField } from '@mui/material';

type Props = {};

const TextTab = (props: Props) => {
  return (
    <div className="w-full h-full flex overflow-y-visible flex-col mt-5 justify-center items-center">
      {/* <TextField
        multiline
        rows={4}
        sx={{
          overflowY: 'visible ',
        }}
        label="Text"
        variant="outlined"
        className="w-3/4"
      /> */}
    </div>
  );
};

export default TextTab;
