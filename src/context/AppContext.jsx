import { createContext } from 'react';

export const AppContext = createContext({
  user: null,
  userData: null,
  avatar: null,
  setAppState: () => {},
});
