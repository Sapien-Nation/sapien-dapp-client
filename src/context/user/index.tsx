import useSWR, { mutate } from 'swr';
import { createContext, useContext } from 'react';
import { useSnackbar } from 'notistack';
import { useLocalStorage } from 'react-use';

// next
import { useRouter } from 'next/router';

// api
import axios from 'api';

// types
import type { User } from 'types/user';

export interface Authentication {
  me: User | null;
  login: () => void;
  logout: () => void;
}

export const AuthenticationContext = createContext<Authentication>(null);

interface Props {
  children: React.ReactNode;
}

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useSWR('/api/users/me');

  const logout = async () => {
    try {
      await axios.post('/api/users/logout');
      mutate('/api/users/me');
      push('/auth#login');
    } catch (err) {
      enqueueSnackbar(err.message);
    }
  };

  const login = async () => {
    try {
      await axios.post('/api/users/login');
      mutate('/api/users/me');
      mutate('/api/tribes/followed');
      push('/');
    } catch (err) {
      enqueueSnackbar(err.message);
    }
  };

  return (
    <AuthenticationContext.Provider value={{ me: data?.me, login, logout }}>
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
