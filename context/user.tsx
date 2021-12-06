import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from 'react-use';
import useSWR, { useSWRConfig } from 'swr';

// types
import { User } from 'tools/types/user';

// api
import { authFetcher as fetcher } from 'api/fetchers';

export interface Authentication {
  me: User | null;
  clearSession: () => void;
  isLoggingIn: boolean;
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

const AuthenticationProvider = ({ children }: Props) => {
  const [, setTokens, removeTokens] = useLocalStorage<null | {
    token: string;
    torus: string;
    refresh: string;
  }>('tokens', null);

  const { push } = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: authMutate } = useSWR<User>('/api/v3/user/me', {
    fetcher,
  });

  const isLoggingIn = data === undefined;

  const clearSession = () => {
    removeTokens();
    mutate('/api/v3/user/me', null, false);
    push('/');
  };

  const setSession = async ({
    token,
    torus,
    refresh,
  }: {
    token: string;
    torus: string;
    refresh: string;
  }) => {
    setTokens({ token, torus, refresh });
    await authMutate();
    push('/');
  };

  return (
    <AuthenticationContext.Provider
      value={{
        clearSession,
        me: data,
        isLoggingIn,
        setSession,
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
