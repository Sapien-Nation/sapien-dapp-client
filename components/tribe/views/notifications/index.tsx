// components
import { Head, WorkInProgressView } from 'components/common';
import {
  BadgePost,
  BadgePriceUpdatedForAdmin,
  BadgePurchased,
  BadgePurchasedForAdmin,
  BadgeUser,
  ChannelInvite,
  DepositSPN,
  JoinRequestResolved,
  LeaveTribe,
  Mentioned,
  NewReply,
  ReportPost,
  SapienBadgeReceived,
  SendSPNPost,
  SendSPNUser,
  WithdrawSPN,
} from 'components/notifications/notification';

// constants
import { NotificationType } from 'tools/types/notifications';

// hooks
import { useTribeNotifications } from 'hooks/notifications';

// types
import type { Notification } from 'tools/types/notifications';

interface Props {
  tribeID: string;
}

const NotificationView = ({ tribeID }: Props) => {
  const { notifications } = useTribeNotifications(tribeID);

  const renderNotification = (notification: Notification) => {
    switch (notification.type) {
      case NotificationType.BadgeUser:
        return <BadgeUser />;
      case NotificationType.BadgePost:
        return <BadgePost />;
      case NotificationType.BadgePriceUpdatedForAdmin:
        return <BadgePriceUpdatedForAdmin />;
      case NotificationType.BadgePurchased:
        return <BadgePurchased />;
      case NotificationType.BadgePurchasedForAdmin:
        return <BadgePurchasedForAdmin />;
      case NotificationType.ChannelInvite:
        return <ChannelInvite />;
      case NotificationType.DepositSPN:
        return <DepositSPN />;
      case NotificationType.LeaveTribe:
        return <LeaveTribe />;
      case NotificationType.JoinRequestResolved:
        return <JoinRequestResolved />;
      case NotificationType.Mentioned:
        return <Mentioned />;
      case NotificationType.NewReply:
        return <NewReply />;
      case NotificationType.ReportPost:
        return <ReportPost />;
      case NotificationType.SapienBadgeReceived:
        return <SapienBadgeReceived />;
      case NotificationType.SendSPNPost:
        return <SendSPNPost />;
      case NotificationType.SendSPNUser:
        return <SendSPNUser />;
      case NotificationType.WithdrawSPN:
        return <WithdrawSPN />;
    }
  };

  return (
    <>
      <Head title="Whats New?" />
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{renderNotification(notification)}</li>
        ))}
      </ul>
      <WorkInProgressView />
    </>
  );
};

export default NotificationView;
