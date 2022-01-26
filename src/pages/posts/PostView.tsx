import { IconButton } from '@mui/material';
import { useMemo, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { getToken, getViewer, removeToken, setToken } from '../../helpers/auth.helper';
import { LoginDialog } from '../../components/LoginDialog';
import { PostViewContext } from '../../contexts/PostViewContext';
import { PostTable } from './PostTable';

export const PostView = function (): JSX.Element {
  const [viewer, changeViewer] = useState(getViewer());
  const [loginDialogOpen, changeLoginDialogOpen] = useState(false);

  const handleLogin = (): void => {
    changeLoginDialogOpen(true);
  };

  const handleLogout = (): void => {
    removeToken();

    changeViewer(getViewer());
  };

  const value = useMemo(
    () => ({
      viewer,
      open: loginDialogOpen,
      onSubmit: (): void => {
        setToken();

        changeViewer(getViewer());
        changeLoginDialogOpen(false);
      },
      handleLogin,
    }),
    [loginDialogOpen, viewer]
  );

  return (
    <div className="posts-view">
      <PostViewContext.Provider value={value}>
        <PostTable />
        <div>
          {getToken() ? (
            <IconButton sx={{ display: 'flex' }} onClick={() => handleLogout()}>
              <LogoutIcon />
            </IconButton>
          ) : (
            <IconButton sx={{ display: 'flex' }} onClick={() => handleLogin()}>
              <LoginIcon />
            </IconButton>
          )}
        </div>
        <LoginDialog />
      </PostViewContext.Provider>
    </div>
  );
};
