import { useLocalStorage } from 'react-use';

// constants
import { alerts } from './constants';

export const useUnreadAlerts = () => {
  const [readAlerts, setReadAlerts] = useLocalStorage<Array<Number>>(
    'readAlerts',
    []
  );

  return {
    count: alerts.length - readAlerts.length,
    readAlerts,
    setReadAlerts,
  };
};
