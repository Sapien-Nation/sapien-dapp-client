import { DotsVerticalIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';

// api
import { makeAllAsRead } from 'api/notifications';

// hooks
import { useGlobalNotifications } from 'hooks/notifications';
import { useToast } from 'context/toast';

const Notifications = () => {
  const toast = useToast();
  const { notifications, unread } = useGlobalNotifications();

  const handleMarkAllAsRead = async () => {
    try {
      await makeAllAsRead();
    } catch (err) {
      toast({
        message: err,
      });
    }
  };

  return (
    <div className="bg-sapien-gray-700 overflow-hidden shadow rounded-lg w-auto h-auto">
      <div className="flex gap-1 items-center p-3">
        <span>Notification Center</span>
        <div className="flex justify-end">
          <Menu as="div">
            <Menu.Button>
              <DotsVerticalIcon className="w-5 text-gray-400" />
            </Menu.Button>
            <Transition>
              <Menu.Items className="absolute right-0 w-56 z-10 origin-top-right bg-white rounded-md">
                <div className="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMarkAllAsRead}
                        disabled={unread === 0}
                        className={`${
                          active ? 'bg-primary-200 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md p-2 text-sm disabled:cursor-not-allowed`}
                      >
                        Mark all as read
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="py-6 px-4">Comming Soon...</div>
    </div>
  );
};

export default Notifications;
