import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from 'react-use';
import useSWR, { mutate } from 'swr';

// types
import { User } from 'tools/types/user';

// api
import { authInstance } from 'api';
export interface Authentication {
  me: User | null;
  clearSession: () => void;
  isLoggingIn: boolean;
  newUser: boolean;
  setNewUser: (status: boolean) => void;
  setSession: (tokens: {
    token: string;
    torus: string;
    refresh: string;
  }) => void;
}

export const AuthenticationContext = createContext<Authentication>(null);

interface Props {
  children: React.ReactNode;
}

const fetcher = async () => {
  try {
    const { data } = await authInstance.get('/api/v3/user/me');
    return data;
  } catch (err) {
    Promise.reject(err);
  }
};

const AuthenticationProvider = ({ children }: Props) => {
  const { push } = useRouter();
  const { data } = useSWR<User>('/api/v3/user/me', { fetcher });
  const [newUser, setNewUser] = useState<boolean>(false);
  const [, setTokens, removeTokens] = useLocalStorage<null | {
    token: string;
    torus: string;
    refresh: string;
  }>('tokens', null);

  const isLoggingIn = data === undefined;

  const clearSession = () => {
    removeTokens();
    mutate('/api/v3/user/me', null, false);
    mutate('/api/v3/profile/tribes', []);
    push('/login');
  };

  const setSession = ({
    token,
    torus,
    refresh,
  }: {
    token: string;
    torus: string;
    refresh: string;
  }) => {
    setTokens({ token, torus, refresh });
    mutate('/api/v3/user/me');
    push('/client/sapien');
  };

  return (
    <AuthenticationContext.Provider
      value={{
        clearSession,
        me: data,
        isLoggingIn,
        setSession,
        newUser,
        setNewUser,
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
