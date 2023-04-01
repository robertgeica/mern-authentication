import { createContext, useContext } from 'react';
import { token } from '../utils/singletons';

type UserContextType = {
  user: null;
  setUser: (user: null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);
