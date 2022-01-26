import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { getPosts } from '../../data';
import { PostViewContext } from '../../contexts/PostViewContext';

export const PostTable = function (): JSX.Element {
  const [posts, changePosts] = useState(getPosts());
  const { viewer, handleLogin } = React.useContext(PostViewContext);

  let likeCounter = 1;

  const handleLike = (i: string): void => {
    if (!viewer) {
      handleLogin();

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
    const existingPostIndex = posts.findIndex(el => el.id === i);

    if (existingPostIndex === -1 || !posts[existingPostIndex].like) {
      console.log('Something went wrong');
    } else {
      const newPosts = [...posts];
      newPosts[existingPostIndex].like = null;

      changePosts(newPosts);
    }
  };

  return (
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
  );
};
