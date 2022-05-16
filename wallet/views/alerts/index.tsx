import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useLocalStorage } from 'react-use';

interface Props {
  handleBack: VoidFunction;
}

// New notifications start at top
// TODO sort by date, by usin Array.sort() or just manually when adding more and more notifications
const alerts = [
  {
    createdAt: '2022-05-16T18:01:17.160Z', // output from new Date().toISOString();
    id: 1,
    name: 'Sign Passport',
    descriptionShort: 'Its time to sign your passport!',
    descriptionLarge: () => (
      <p>
        Its time to sign your passport! inside a component, go crazy descriptive
        here
      </p>
    ),
  },
];

enum View {
  Home,
  Alert,
}

const Alerts = ({ handleBack }: Props) => {
  const [view, setView] = useState(View.Home);
  const [selectedAlertID, setSelectedAlertID] = useState<number | null>(null);

  const [readAlerts, setReadAlerts] = useLocalStorage<Array<Number>>(
    'readAlerts',
    []
  );

  const renderView = () => {
    switch (view) {
      case View.Alert: {
        const alert = alerts.find(({ id }) => id === selectedAlertID);

        return (
          <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
                <button
                  onClick={() => {
                    setView(View.Home);
                    setSelectedAlertID(null);
                  }}
                >
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {alert.name}
              </h5>
            </div>
            <div className="py-6 px-1">
              <div>{alert.descriptionLarge()}</div>
            </div>
          </div>
        );
      }
      case View.Home: {
        const handleReadAlert = (alertID: number) => {
          setReadAlerts([...readAlerts, alertID]);
        };

        return (
          <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
                <button onClick={handleBack}>
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                Alerts
              </h5>
            </div>
            <div className="py-6 px-1">
              <ol className="flex w-72 mx-auto">
                {alerts.map((alert) => (
                  <li
                    key={alert.name}
                    onClick={() => {
                      setSelectedAlertID(alert.id);
                      setView(View.Alert);

                      handleReadAlert(alert.id);
                    }}
                    className={
                      // TODO CSS for when a notification is already read
                      readAlerts.includes(alert.id)
                        ? 'cursor-pointer hover:bg-sapien-80 w-full h-12'
                        : 'cursor-pointer hover:bg-sapien-80 w-full h-12'
                    }
                  >
                    <p>{alert.descriptionShort}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto py-6 px-4 flex">
      <div className="w-64">{renderView()}</div>
    </div>
  );
};

export default Alerts;
