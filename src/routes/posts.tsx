import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { getCategories, getPosts } from '../data';

export const Posts = function (): JSX.Element {
  const [posts, changePosts] = useState(getPosts());
  const categories = getCategories();
  let likeCounter = 1;

  const handleLike = (i: string): void => {
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
    <div className="posts-view">
      <nav className="posts-category-nav">
        {categories.map(category => (
          <Button
            sx={{ height: '3rem', width: '3rem', maxWidth: '3rem', display: 'flex', flex: '1' }}
            type="button"
            variant="contained"
            className="square"
            key={category.id}
          >
            {category.name}
          </Button>
        ))}
      </nav>
      <div className="posts-table-view">
        {posts.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <i>{post.author.name}</i>
            {post.like ? (
              <IconButton
                sx={{ height: '3rem', width: '3rem', maxWidth: '3rem', display: 'flex', flex: '1' }}
                onClick={() => handleUnlike(post.id)}
              >
                <FavoriteIcon sx={{ color: red[500] }} />
              </IconButton>
            ) : (
              <IconButton
                sx={{ height: '3rem', width: '3rem', maxWidth: '3rem', display: 'flex', flex: '1' }}
                onClick={() => handleLike(post.id)}
              >
                <FavoriteIcon />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
