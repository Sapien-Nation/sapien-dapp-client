import { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';

// types
import { Tribe } from 'types/tribe';

export const TribeNavigationStateContext = createContext<Tribe | null>(null);
const TribeNavigationSetStateContext = createContext<(tribe: Tribe) => void | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const TribeNavigationProvider: React.FC<Props> = ({ children }) => {
  const [tribeNavigation, setTribeNavigation] = useLocalStorage(
    'tribeNavigation',
    null
  );

  return (
    <TribeNavigationStateContext.Provider value={tribeNavigation}>
      <TribeNavigationSetStateContext.Provider value={setTribeNavigation}>
        {children}
      </TribeNavigationSetStateContext.Provider>
    </TribeNavigationStateContext.Provider>
  );
};

function useTribeNavigationState() {
  const context = useContext(TribeNavigationStateContext);

  if (context === undefined) {
    throw new Error(
      'useTribeNavigationState must be used within a TribeNavigationProvider'
    );
  }
  return context;
}

function useTribeNavigationSetState() {
  const context = useContext(TribeNavigationSetStateContext);

  if (context === undefined) {
    throw new Error(
      'useTribeNavigationSetState must be used within a TribeNavigationProvider'
    );
  }
  return context;
}

function useTribeNavigation() {
  return [useTribeNavigationState(), useTribeNavigationSetState()] as const;
}

export { TribeNavigationProvider, useTribeNavigation };
