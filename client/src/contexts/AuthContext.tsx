import { createContext, useContext } from 'react';
import { token } from '../utils/singletons';

type AuthContextType = {
  authToken: string | null;
  setAuthToken: (tokenn: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authToken: token || null,
  setAuthToken: () => {},
});

export const useAuth = () => useContext(AuthContext);
