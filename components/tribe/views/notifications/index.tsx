// hooks
import { useTribeNotifications } from 'hooks/notifications';

// helpers
import { formatDate } from 'utils/date';

const NotificationsView = () => {
  const { notifications } = useTribeNotifications();
  return (
    <div className="max-w-3xl mx-auto w-full mt-5">
      <h1 className="text-xl font-semibold">Notifications</h1>
      <ul role="list" className="divide-y divide-gray-700 mt-3">
        {notifications.map((notification) => (
          <li key={notification.id} className="py-4">
            <div className="flex space-x-3">
              <div
                className="bg-sapien-neutral-200 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                data-testid="message-avatar"
              >
                {notification.by.username[0].toUpperCase()}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Sabbir</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(new Date())}
                  </p>
                </div>
                <p className="text-sm text-gray-500">New notification</p>
              </div>
            </div>
          </li>
        ))}
        {!notifications?.length && (
          <p className="text-gray-400">No notifications available!</p>
        )}
      </ul>
    </div>
  );
};

export default NotificationsView;
