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

interface Navigation {
  main?: Tribe | null;
  secondary?: Tribe | Channel | string;
  type: NavigationTypes;
}

export const NavigationContext = createContext<Navigation | null>(null);
const NavigationDispatcher = createContext<(navigation: Navigation) => void | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const NavigationProvider: React.FC<Props> = ({ children }) => {
  const [navigation, setNavigation] = useLocalStorage<Navigation | null>(
    'navigation',
    null
  );

  useEffect(() => {
    if (!navigation?.main) {
      // TODO fetch call to set always 1 tribe
      setNavigation({
        main: mockTribe(),
        secondary: mockTribe().id,
        type: NavigationTypes.Tribe
      });
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
