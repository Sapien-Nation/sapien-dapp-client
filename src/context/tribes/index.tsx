import { useSnackbar } from 'notistack';
import { cache, mutate } from 'swr';
import { useLocalStorage } from 'react-use';
import { createContext, useContext, useEffect } from 'react';

// api
import axios from 'api';

// types
import type { Channel } from 'types/channel';
import type { Tribe } from 'types/tribe';

export enum NavigationTypes {
  BadgeStore,
  Channel,
  Discovery,
  Tribe
}

export interface Navigation {
  main?: Tribe | null;
  secondary?: Tribe | Channel | string;
  type: NavigationTypes;
}

const defaultValues = {
  main: null,
  secondary: '',
  type: NavigationTypes.Tribe
};

export const NavigationContext = createContext<Navigation | null>(defaultValues);
const NavigationDispatcher = createContext<(navigation: Navigation) => void | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const NavigationProvider: React.FC<Props> = ({ children }) => {
  const [navigation, setNavigation] = useLocalStorage<Navigation>(
    'navigation',
    defaultValues
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchDefaultTribe = async () => {
      const cachedTribes = cache.get('/api/tribes/followed')?.tribes;

      if (cachedTribes?.length) {
        setNavigation({ ...navigation, main: cachedTribes[0] });
      } else {
        const { tribes } = await mutate('/api/tribes/followed');
        setNavigation({ ...navigation, main: tribes[0] });
      }
    };

    if (navigation.main === null) {
      fetchDefaultTribe();
    }
  }, []);

  const handleSetNavigation = async (newNavigation) => {
    try {
      setNavigation({ ...navigation, ...newNavigation });

      if (newNavigation.main) {
        await axios.post('/api/tribes/visit');
        mutate(
          '/api/tribes/followed',
          ({ tribes }: { tribes: Array<Tribe> }) => ({
            tribes: tribes.map((tribe) =>
              tribe.id === newNavigation.main.id
                ? { ...tribe, notificationNumber: 0 }
                : tribe
            )
          }),
          false
        );
      }
    } catch (err) {
      enqueueSnackbar(err.message);
    }
  };

  return (
    <NavigationContext.Provider value={navigation}>
      <NavigationDispatcher.Provider value={handleSetNavigation}>
        {children}
      </NavigationDispatcher.Provider>
    </NavigationContext.Provider>
  );
};

function useNavigationState() {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error('useNavigationState must be used within a NavigationProvider');
  }
  return context;
}

function useNavigationDispatcher() {
  const context = useContext(NavigationDispatcher);

  if (context === undefined) {
    throw new Error(
      'useNavigationDispatcher must be used within a NavigationProvider'
    );
  }
  return context;
}

function useNavigation() {
  return [useNavigationState(), useNavigationDispatcher()] as const;
}

export { NavigationProvider, useNavigation };
