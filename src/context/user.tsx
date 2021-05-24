import useSWR, { mutate } from 'swr';
import { createContext, useContext } from 'react';

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
  changePassword: (values: {
    password: string;
    token: string;
  }) => Promise<unknown>;
  forgot: (email: string) => Promise<unknown>;
  login: (values: PostBody) => Promise<unknown>;
  logout: (values: { email: string }) => Promise<unknown>;
  isLoggingIn: boolean;
  register: (values: PostBody) => Promise<unknown>;
  verifyUser: (token: string) => Promise<unknown>;
}

export const AuthenticationContext = createContext<Authentication>(null);

interface Props {
  children: React.ReactNode;
}

const fetcher = async () => {
  try {
    const { data } = await authInstance.get('/api/v3/user/me', {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    Promise.reject(err);
  }
};

const AuthenticationProvider = ({ children }: Props) => {
  const { push } = useRouter();
  const { data } = useSWR<User>('/api/v3/user/me', { fetcher });

  const isLoggingIn = data === undefined;

  const logout = async (body: { email: string }) => {
    try {
      await authInstance.post('/api/v3/auth/logout', body);
      mutate('/api/v3/user/me', null, false);
      push('/login');
    } catch ({ response }) {
      return Promise.reject(response.data.message);
    }
  };

  const login = async (body: PostBody) => {
    try {
      await authInstance.post('/api/v3/auth/login', body);
      mutate('/api/v3/user/me');
      push('/');
    } catch ({ response }) {
      return Promise.reject(response.data.message);
    }
  };

  const register = async (body: PostBody) => {
    try {
      await authInstance.post('/api/v3/auth/signup', body);
      mutate('/api/v3/user/me');
      push('/');
    } catch ({ response }) {
      return Promise.reject(response.data.message);
    }
  };

  const forgot = async (email: string) => {
    try {
      await authInstance.post('/api/v3/user/forgot-password', {
        email,
      });
    } catch ({ response }) {
      return Promise.reject(response.data.message);
    }
  };

  const changePassword = async ({
    password,
    token,
  }: {
    password: string;
    token: string;
  }) => {
    try {
      await authInstance.post('/api/v3/user/reset-password', {
        password,
        token,
      });
    } catch ({ response }) {
      return Promise.reject(response.data.message);
    }
  };

  const verifyUser = async (token: string) => {
    try {
      await authInstance.post('/api/v3/user/verify-user-email', { token });
    } catch ({ response }) {
      return Promise.reject(response.data.message);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        changePassword,
        forgot,
        me: data,
        isLoggingIn,
        login,
        logout,
        register,
        verifyUser,
      }}
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
