// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const OwnerBadgeAssignment = ({ notification }: Props) => {
  return <h1>TODO OwnerBadgeAssignment {notification.id}</h1>;
};

export default OwnerBadgeAssignment;
