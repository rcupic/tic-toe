import Cookies from 'js-cookie';

export const getToken = (): string | undefined => Cookies.get('AUTH_TOKEN');

export const setToken = (): string | undefined => Cookies.set('AUTH_TOKEN', 'a', { secure: true, expires: 7 });

export const removeToken = () => Cookies.remove('AUTH_TOKEN');

export const getViewer = (): IViewer | null => {
  const token = getToken();

  if (token) {
    return { id: '1', fullName: 'Roko Čupić', imageUrl: null };
  }

  return null;
};

export const logIn = (email: string, password: string): IViewer | null => {
  if (email === 'rcupic@profico.hr' && password === 'admin123') {
    setToken();
  }

  return getViewer();
};

export interface IViewer {
  id: string;
  fullName: string;
  imageUrl: string | null;
}
