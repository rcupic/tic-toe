import { Button } from '@mui/material';
import { getCategories, getPosts } from '../data';

export const Posts = function () {
  const categories = getCategories();
  const posts = getPosts();

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
          </div>
        ))}
      </div>
    </div>
  );
};
