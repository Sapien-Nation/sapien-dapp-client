import { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';

// api
import axios from 'api';

// types
import type { User } from 'types/user';

interface Authentication {
  me: User | null;
  login: () => void;
  logout: () => void;
}

export const AuthenticationContext = createContext<Authentication>(null);

interface Props {
  children: React.ReactNode;
}

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const [me, setMe] = useLocalStorage<User | null>('me', null);

  const logout = () => {
    setMe(null);
  };

  const login = async () => {
    try {
      const { data } = await axios.post('/api/users/login');
      setMe(data);
    } catch (err) {
      //
    }
  };

  return (
    <AuthenticationContext.Provider value={{ me, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error('useMe must be used within a AuthenticationProvider');
  }
  return context;
}

export { AuthenticationProvider, useAuth };
