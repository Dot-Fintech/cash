import type { NotificationListItemFragment } from '../../generated/graphql';
import { Notification_Reason } from '../../generated/graphql';
import { formatter } from '../../utils/money';

export const getNotificationMessage = (
  notification: NotificationListItemFragment,
): string => {
  const { reason, connection, transaction } = notification;

  const transactionSender = `${transaction?.p2p?.sender.firstName} ${transaction?.p2p?.sender.lastName} (@${transaction?.p2p?.sender.username})`;
  const transactionRecipient = `${transaction?.p2p?.recipient.firstName} ${transaction?.p2p?.recipient.lastName} (@${transaction?.p2p?.recipient.username})`;
  const connectionSender = `${connection?.sender.firstName} ${connection?.sender.lastName} (@${connection?.sender.username})`;
  const connectionRecipient = `${connection?.recipient.firstName} ${connection?.recipient.lastName} (@${connection?.recipient.username})`;

  switch (reason) {
    case Notification_Reason.P2PTransactionDeclined:
      return `${transactionRecipient} declined your request of ${formatter.format(
        transaction?.amount ?? 0,
      )}.`;
    case Notification_Reason.P2PTransactionRequest:
      return `${transactionSender} requested ${formatter.format(
        transaction?.amount ?? 0,
      )} from you.`;
    case Notification_Reason.P2PTransactionReceipt:
      return `${transactionSender} sent you ${formatter.format(
        transaction?.amount ?? 0,
      )}!`;
    case Notification_Reason.ConnectionRequest:
      return `${connectionSender} wants to connect.`;
    case Notification_Reason.ConnectionAccepted:
      return `${connectionRecipient} accepted your connection request.`;
    default:
      return '';
  }
};
