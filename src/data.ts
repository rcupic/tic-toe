const categories: ICategory[] = [
  {
    id: '1',
    name: 'Short story',
  },
  {
    id: '2',
    name: 'Haiku',
  },
];

const posts: IPost[] = [
  {
    id: '1',
    title: 'My story',
    text: 'This is my short story about React',
    author: {
      name: 'Roko',
      title: 'Amater',
    },
  },
];

export function getCategories(): ICategory[] {
  return categories;
}

export function getPosts(): IPost[] {
  return posts;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IPost {
  id: string;
  title: string;
  text: string;
  author: {
    name: string;
    title: string;
  };
}
