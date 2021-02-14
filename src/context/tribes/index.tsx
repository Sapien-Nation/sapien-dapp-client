import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

// types
import type { Channel } from 'types/channel';
import type { Tribe } from 'types/tribe';

// mocks
import { mockTribe } from 'mocks/tribe';

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

  useEffect(() => {
    if (navigation.main === null) {
      // TODO fetch call to set always 1 tribe
      setNavigation({ ...navigation, main: mockTribe() });
    }
  }, []);

  const handleSetNavigation = (newNavigation) =>
    setNavigation({ ...navigation, ...newNavigation });

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
