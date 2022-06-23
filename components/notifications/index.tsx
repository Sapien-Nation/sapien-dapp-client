import { DotsVerticalIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import Lottie from 'react-lottie-player';

// api
import { makeAllAsRead } from 'api/notifications';

// constants
import { NotificationsType } from 'tools/constants/notifications';

// components
import { BadgeGrant, BadgeGrantPropose, NewRoomMessage } from './items';

// hooks
import { useGlobalNotifications } from 'hooks/notifications';
import { useToast } from 'context/toast';

// assets
import notificationJSONData from './lottie/notification.json';
import { useSWRConfig } from 'swr';

const Notifications = () => {
  const toast = useToast();

  const { mutate } = useSWRConfig();
  const { notifications } = useGlobalNotifications();

  //------------------------------------------------------------------------
  const handleMarkAllAsRead = async () => {
    try {
      await makeAllAsRead();

      mutate(
        '/core-api/notification',
        (data) => ({
          ...data,
          unread: 0,
        }),
        false
      );
    } catch (err) {
      toast({
        message: err,
      });
    }
  };

  //------------------------------------------------------------------------
  const renderNotification = (notification) => {
    switch (notification.type) {
      case NotificationsType.BadgeGrant:
      case NotificationsType.BadgeGrantOwner:
        return <BadgeGrant notification={notification} />;
      case NotificationsType.BadgeGrantPropose:
        return <BadgeGrantPropose notification={notification} />;
      case NotificationsType.RoomNewMessage:
        return <NewRoomMessage notification={notification} />;
    }
  };

  return (
    <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto">
      <div className="flex gap-1 items-center justify-between p-3">
        <span>Notifications</span>
        <div className="flex justify-end">
          <Menu as="div">
            <Menu.Button>
              <DotsVerticalIcon className="w-5 text-gray-400" />
            </Menu.Button>
            <Transition>
              <Menu.Items className="absolute right-0 w-56 z-10 origin-top-right bg-sapien-neutral-900 rounded-md p-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleMarkAllAsRead}
                      className={`${
                        active ? 'bg-gray-800' : ''
                      } flex w-full items-center rounded-sm px-2 py-2 text-sm text-white`}
                    >
                      Mark all as read
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="px-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center pb-8 space-y-3">
            <Lottie
              animationData={notificationJSONData}
              play
              loop
              className="w-28 rotate-12"
            />
            <h2 className="text-lg text-gray-300">You are all caught up!</h2>
          </div>
        ) : null}
        {notifications.map((notification) => (
          <div key={notification.id}>{renderNotification(notification)}</div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
