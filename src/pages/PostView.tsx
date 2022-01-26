import { IconButton } from '@mui/material';
import { useMemo, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { getPosts } from '../data';
import { getToken, getViewer, removeToken, setToken } from '../helpers/auth.helper';
import { LoginDialog } from '../components/LoginDialog';
import { LoginDialogContext } from '../contexts/LoginDialogContext';

export const PostView = function (): JSX.Element {
  const [posts, changePosts] = useState(getPosts());
  const [viewer, changeViewer] = useState(getViewer());
  const [loginDialogOpen, changeLoginDialogOpen] = useState(false);
  let likeCounter = 1;

  const handleLike = (i: string): void => {
    if (!viewer) {
      console.log('Not logged in');

      return;
    }

    const existingPostIndex = posts.findIndex(el => el.id === i);

    if (existingPostIndex === -1 || posts[existingPostIndex].like) {
      console.log('Something went wrong');
    } else {
      const newPosts = [...posts];
      newPosts[existingPostIndex].like = {
        id: likeCounter.toString(),
      };
      likeCounter += 1;

      changePosts(newPosts);
    }
  };

  const handleUnlike = (i: string): void => {
    if (!viewer) {
      console.log('Not logged in');

      return;
    }

    const existingPostIndex = posts.findIndex(el => el.id === i);

    if (existingPostIndex === -1 || !posts[existingPostIndex].like) {
      console.log('Something went wrong');
    } else {
      const newPosts = [...posts];
      newPosts[existingPostIndex].like = null;

      changePosts(newPosts);
    }
  };

  const handleLogin = (): void => {
    changeLoginDialogOpen(true);
  };

  const handleLogout = (): void => {
    removeToken();

    changeViewer(getViewer());
  };

  const value = useMemo(
    () => ({
      open: loginDialogOpen,
      onSubmit: () => {
        setToken();

        changeViewer(getViewer());
        changeLoginDialogOpen(false);
      },
    }),
    [loginDialogOpen]
  );

  return (
    <div className="posts-view">
      <div className="posts-table-view">
        {posts.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <i>{post.author.name}</i>
            {post.like ? (
              <IconButton sx={{ display: 'flex' }} onClick={() => handleUnlike(post.id)}>
                <FavoriteIcon sx={{ color: red[500] }} />
              </IconButton>
            ) : (
              <IconButton sx={{ display: 'flex' }} onClick={() => handleLike(post.id)}>
                <FavoriteIcon />
              </IconButton>
            )}
          </div>
        ))}
      </div>
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
      <LoginDialogContext.Provider value={value}>
        <LoginDialog />
      </LoginDialogContext.Provider>
    </div>
  );
};
