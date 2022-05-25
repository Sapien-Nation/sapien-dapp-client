// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  notification: Notification;
}

const BadgeRequestApproval = ({ notification }: Props) => {
  return <h1>TODO BadgeRequestApproval {notification.id}</h1>;
};

export default BadgeRequestApproval;
