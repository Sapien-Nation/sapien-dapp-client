import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

// types
import type { Tribe } from 'types/tribe';

interface Navigation {
  tribe: Tribe | null;
}

export const NavigationContext = createContext<Navigation | null>(null);
const NavigationDispatcher = createContext<(navigation: Navigation) => void | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const NavigationProvider: React.FC<Props> = ({ children }) => {
  const [navigation, setNavigation] = useLocalStorage('navigation', null);

  useEffect(() => {
    if (navigation === null || navigation?.tribe === null) {
      // TODO fetch call to set always 1 tribe
    }
  }, []);

  return (
    <NavigationContext.Provider value={navigation}>
      <NavigationDispatcher.Provider value={setNavigation}>
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
