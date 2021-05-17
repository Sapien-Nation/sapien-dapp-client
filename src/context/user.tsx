import useSWR, { mutate } from 'swr';
import { createContext, useContext } from 'react';
import { useSnackbar } from 'notistack';

// next
import { useRouter } from 'next/router';

// types
import { User } from 'tools/types/user';

// api
import { authInstance } from 'api';

interface PostBody {
  email: string;
  password: string;
  redirect: string;
  client: string;
}

export interface Authentication {
  me: User | null;
  login: (values: PostBody) => Promise<unknown>;
  logout: (values: { email: string }) => Promise<unknown>;
  isLoggingIn: boolean;
  register: (values: PostBody) => Promise<unknown>;
}

export const AuthenticationContext = createContext<Authentication>(null);

interface Props {
  children: React.ReactNode;
}

const fetcher = async () => {
  try {
    // const { data } = await authInstance.get('/api/v3/user/me', {
    //   withCredentials: true,
    // });
    // return data;
    return null;
  } catch (err) {
    Promise.reject(err);
  }
};

const AuthenticationProvider = ({ children }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useSWR<User>('/api/v3/user/me', { fetcher });

  const isLoggingIn = data === undefined;

  const logout = async (body: { email: string }) => {
    try {
      await authInstance.post('/api/auth/logout', body);
      mutate('/api/v3/user/me');
      push('/login');
    } catch (err) {
      enqueueSnackbar(err.message);
    }
  };

  const login = async (body: PostBody) => {
    try {
      await authInstance.post('/api/v3/auth/login', body);
      mutate('/api/v3/users/me');
      push('/');
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  const register = async (body: PostBody) => {
    try {
      await authInstance.post('/api/v3/auth/signup', body);
      mutate('/api/v3/user/me');
      push('/');
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ me: data, isLoggingIn, login, logout, register }}
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
