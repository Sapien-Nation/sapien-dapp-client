import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useLocalStorage } from 'react-use';

// components
import { Query } from 'components/common';

interface Props {
  handleBack: VoidFunction;
}

// New notifications start at top
// TODO sort by date, by usin Array.sort() or just manually when adding more and more notifications
const alerts = [
  {
    createdAt: '2022-02-20T19:58:50.745Z',
    id: 1,
    name: 'Mint Time!',
    descriptionShort: 'Find your tribe and ignite the new renaissance!',
    descriptionLarge: () => (
      <div className="relative w-full h-44">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
            alt="People working on laptops"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
        </div>
        <div className="relative flex justify-center items-center mb-5 flex-col h-full w-full gap-4 p-2">
          <span>
            The time has finally come, its time to mint your passport!
          </span>
          <Query api="/core-api/passport/mint-checker">
            {({
              code,
              figureName,
            }: {
              code: number | null;
              figureName: string;
            }) => {
              if (code === 100) {
                return (
                  <div className="mt-4 grid gap-4">
                    <span>
                      Please follow the instructions on your wallet to mint your
                      Sapien Passport
                    </span>
                  </div>
                );
              }

              if (code === null) {
                <div className="mt-4 grid gap-4">
                  <span>Find your tribe and ignite the new renaissance!</span>
                  <span>
                    Champion the values of {figureName} in your sapien tribe
                  </span>
                </div>;
              }

              return null;
            }}
          </Query>
        </div>
      </div>
    ),
  },
  {
    createdAt: '2022-05-16T18:01:17.160Z',
    id: 2,
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
