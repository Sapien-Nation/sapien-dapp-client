import { ArrowLeftIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';

// hooks
import { useUnreadNotifications } from 'wallet/hooks';

// constants
import { notifications } from '../../constants';

interface Props {
  handleBack: VoidFunction;
}

enum View {
  Home,
  Notification,
}

const Notifications = ({ handleBack }: Props) => {
  const [view, setView] = useState(View.Home);
  const [selectedNotificationID, setSelectedNotificationID] = useState<
    number | null
  >(null);

  const { readedNotifications, setReadedNotifications } =
    useUnreadNotifications();

  const handleReadAll = () =>
    setReadedNotifications(notifications.map(({ id }) => id));

  const renderView = () => {
    switch (view) {
      case View.Notification: {
        const notification = notifications.find(
          ({ id }) => id === selectedNotificationID
        );

        return (
          <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
                <button
                  onClick={() => {
                    setView(View.Home);
                    setSelectedNotificationID(null);
                  }}
                >
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {notification.name}
              </h5>
            </div>
            <div className="py-6 px-1 flex flex-col gap-5">
              <div>{notification.descriptionLarge()}</div>
            </div>
          </div>
        );
      }
      case View.Home: {
        const handleReadNotification = (notificationID: number) => {
          if (readedNotifications.includes(notificationID) === false) {
            setReadedNotifications([...readedNotifications, notificationID]);
          }
        };

        return (
          <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto">
            <div className="flex justify-between items-center">
              <h5 className="text-xl text-white font-bold tracking-wide flex items-center gap-2">
                <button onClick={handleBack}>
                  <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                Notifications
              </h5>
            </div>
            <div>
              <div className="flow-root mt-6">
                <ul role="list" className="-my-6 grid gap-2 mb-2">
                  {notifications.map(({ id, name, descriptionShort }) => {
                    const isSeen = readedNotifications.includes(id) === true;
                    return (
                      <li
                        className={
                          isSeen
                            ? 'py-5 px-2 rounded-md hover:bg-sapien-80 text-white cursor-pointer'
                            : 'py-5 px-2 rounded-md hover:bg-sapien-80 text-white animate-pulse cursor-pointer'
                        }
                        key={name}
                        onClick={() => {
                          setSelectedNotificationID(id);
                          setView(View.Notification);

                          handleReadNotification(id);
                        }}
                      >
                        <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                          <h3 className="text-sm font-semibold flex items-center gap-2">
                            {name}{' '}
                            {isSeen && (
                              <CheckCircleIcon className="aria-hidden w-4 h-4" />
                            )}
                          </h3>
                          <p className="mt-1 text-sm line-clamp-2">
                            {descriptionShort}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button
                onClick={handleReadAll}
                className="w-full py-2 px-4 flex justify-center items-center gap-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Read All
              </button>
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

export default Notifications;
