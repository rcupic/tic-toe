import { TextField } from '@mui/material';
import React from 'react';

export const Player = function ({ changePlayer }: { changePlayer: React.Dispatch<React.SetStateAction<string>> }) {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = event => {
    changePlayer(event.target.value);
  };

  return (
    <TextField
      sx={{ flex: 2, marginRight: '3rem', marginLeft: '3rem' }}
      id="standard-basic"
      variant="standard"
      placeholder="Player"
      onChange={handleChange}
    />
  );
};
