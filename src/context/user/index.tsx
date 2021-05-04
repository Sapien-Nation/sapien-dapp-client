import useSWR from 'swr';
import { createContext, useContext } from 'react';
import { useSnackbar } from 'notistack';

// next
import { useRouter } from 'next/router';

interface User {
  id: null;
}
export interface Authentication {
  me: User | null;
  login: () => Promise<any>;
  logout: () => Promise<any>;
  register: () => Promise<any>;
  isLoggingIn: boolean;
}

export const AuthenticationContext = createContext<Authentication>(null);

interface Props {
  children: React.ReactNode;
}

const AuthenticationProvider = ({ children }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useSWR('/api/users/me');

  const isLoggingIn = data === undefined;

  const logout = async () => {
    try {
      // await axios.post('/api/users/logout');
      // mutate('/api/users/me');
      push('/auth#login');
    } catch (err) {
      enqueueSnackbar(err.message);
    }
  };

  const login = async () => {
    try {
      // await axios.post('/api/users/login');
      // mutate('/api/users/me');
      // mutate('/api/tribes/followed');
      push('/');
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  const register = async () => {
    try {
      // await axios.post('/api/users/register');
      // mutate('/api/users/me');
      // mutate('/api/tribes/followed');
      push('/');
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ me: data?.me, login, logout, isLoggingIn, register }}
    >
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
