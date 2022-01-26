import { TextField } from '@mui/material';
import React from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

export const Player = function () {
  const { players, handleChange } = React.useContext(PlayerContext);

  return (
    <div className="player-row">
      {players.map((player: { placeholder: string; name: string; uniqueName: string; error: string }) =>
        player.error ? (
          <TextField
            error
            sx={{ flex: 2, marginRight: '3rem', marginLeft: '3rem' }}
            id="standard-error-helper-text"
            variant="standard"
            placeholder={player.placeholder}
            name={player.name}
            onChange={handleChange}
            helperText={player.error}
            key={player.name}
          />
        ) : (
          <TextField
            sx={{ flex: 2, marginRight: '3rem', marginLeft: '3rem' }}
            id="standard-basic"
            variant="standard"
            placeholder={player.placeholder}
            name={player.name}
            onChange={handleChange}
            key={player.name}
          />
        )
      )}
    </div>
  );
};
