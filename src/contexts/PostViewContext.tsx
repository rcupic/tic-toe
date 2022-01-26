import React from 'react';
import { IViewer } from '../helpers/auth.helper';

export const PostViewContext = React.createContext(
  {} as {
    viewer: IViewer | null;
    open: boolean;
    onSubmit: () => void;
    handleLogin: () => void;
  }
);
