import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';
import useSWR, { useSWRConfig } from 'swr';

// api
import { authFetcher as fetcher } from 'api';

// types
import type { User } from 'tools/types/user';

export interface Authentication {
  me: User | null;
  clearSession: (redirect?: string) => void;
  isLoggingIn: boolean;
  setSession: (
    tokens: {
      token: string;
      torus: string;
      refresh: string;
    },
    redirect?: string | null
  ) => void;
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

  const clearSession = (redirect = '/') => {
    removeTokens();
    mutate('/api/v3/user/me', null, false);
    push(redirect);
  };

  const setSession = async (
    {
      token,
      torus,
      refresh,
    }: {
      token: string;
      torus: string;
      refresh: string;
    },
    redirect: string | null
  ) => {
    setTokens({ token, torus, refresh });
    await authMutate();

    // TODO we need to make sure it redirect correctly
    if (redirect) {
      push(redirect);
    } else {
      push('/');
    }
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
