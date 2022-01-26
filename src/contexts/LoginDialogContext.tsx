import React from 'react';

export const LoginDialogContext = React.createContext(
  {} as {
    open: boolean;
    onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  }
);
