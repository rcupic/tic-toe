import React from 'react';

export const playerContext = React.createContext(
  {} as {
    players: {
      placeholder: string;
      name: string;
      uniqueName: string;
      error: string;
    }[];
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  }
);
