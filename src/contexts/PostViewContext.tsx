/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IViewer } from '../helpers/auth.helper';

export const PostViewContext = React.createContext(
  {} as {
    viewer: IViewer | null;
    open: boolean;
    preLoginAction?: {
      callback: (parameter: any) => void;
      parameter: any;
    } | null;
    onSubmit: () => void;
    handleLogin: (callback?: (parameter?: any) => void, parameter?: any) => void;
  }
);
