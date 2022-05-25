import { DotsVerticalIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';

// api
import { makeAllAsRead } from 'api/notifications';

// constants
import { NotificationsType } from 'tools/constants/notifications';

// components
import { Mention, BadgeRequest, BadgeReceived } from './items';

// hooks
import { useGlobalNotifications } from 'hooks/notifications';
import { useToast } from 'context/toast';

const Notifications = () => {
  const toast = useToast();

  const { notifications } = useGlobalNotifications();

  //------------------------------------------------------------------------
  const handleMarkAllAsRead = async () => {
    try {
      await makeAllAsRead();
    } catch (err) {
      toast({
        message: err,
      });
    }
  };

  //------------------------------------------------------------------------
  const renderNotification = (notification) => {
    switch (notification.type) {
      case NotificationsType.Mention:
        return <Mention notification={notification} />;
      case NotificationsType.BadgeRequest:
        return <BadgeRequest notification={notification} />;
      case NotificationsType.BadgeReceived:
        return <BadgeReceived notification={notification} />;
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
                      disabled={true}
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
        {notifications.map((notification) => (
          <div key={notification.id}>{renderNotification(notification)}</div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
