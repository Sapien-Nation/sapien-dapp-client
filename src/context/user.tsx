import useSWR, { mutate } from 'swr';
import { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';

// next
import { useRouter } from 'next/router';

// types
import { User } from 'tools/types/user';

// api
import { authInstance } from 'api';
export interface Authentication {
  me: User | null;
  clearSession: () => void;
  isLoggingIn: boolean;
  setSession: (tokens: { token: string; torus: string }) => void;
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
  const [, setTokens, removeTokens] = useLocalStorage<null | {
    token: string;
    torus: string;
  }>('tokens', null);

  const isLoggingIn = data === undefined;

  const clearSession = () => {
    removeTokens();
    mutate('/api/v3/user/me', null, false);
    mutate('/api/profile/tribes', []);
    push('/login');
  };

  const setSession = ({ token, torus }: { token: string; torus: string }) => {
    setTokens({ token, torus });
    mutate('/api/v3/user/me');
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
