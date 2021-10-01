import type { ApolloError, Reference } from '@apollo/client';

import type { NotificationListItemFragment } from '../../../generated/graphql';
import {
  Notification_Reason,
  Notification_Response,
  useAcceptConnectionRequestMutation,
  useAcceptRequestMutation,
  useDeclineConnectionRequestMutation,
  useDeclineRequestMutation,
  useRespondToNotificationMutation,
} from '../../../generated/graphql';
import { addToTransactionsCache } from '../../../utils/cache/addToTransactionsCache';
import { updateUserAccountCache } from '../../../utils/cache/updateUserAccountCache';
import type {
  GetNotificationsReference,
  GetTransactionsReference,
} from '../../../utils/types/CacheReferences';

type Response = [
  () => void,
  () => void,
  { loading: boolean; error?: ApolloError },
];

/**
 * @returns [
 *  accept: () => void,
 *  decline: () => void,
 *  {loading: boolean}
 * ]
 */
export const useNotificationActions = (
  notification: NotificationListItemFragment,
): Response => {
  const { reason, actionable, connection, transaction, _id } = notification;

  const [respondToNotification, respondToNotificationResult] =
    useRespondToNotificationMutation();

  const [acceptConnectionRequest, acceptConnectionRequestResult] =
    useAcceptConnectionRequestMutation();

  const [declineConnectionRequest, declineConnectionRequestResult] =
    useDeclineConnectionRequestMutation();

  const [acceptRequest, acceptRequestResult] = useAcceptRequestMutation();

  const [declineRequest, declineRequestResult] = useDeclineRequestMutation();

  const accept = () => {
    if (actionable) {
      respondToNotification({
        variables: {
          data: {
            notificationId: notification._id,
            response: Notification_Response.Accepted,
          },
        },
      });
      if (reason === Notification_Reason.ConnectionRequest) {
        acceptConnectionRequest({
          variables: { data: { connectionId: connection?._id ?? '' } },
        });
      } else if (reason === Notification_Reason.P2PTransactionRequest) {
        acceptRequest({
          variables: { data: { transactionId: transaction?._id ?? '' } },
          update(cache, { data }) {
            cache.modify({
              fields: {
                getTransactions(existingRef: GetTransactionsReference) {
                  return addToTransactionsCache(
                    cache,
                    existingRef,
                    data?.acceptRequest.transaction,
                  );
                },
                user(existingRef: Reference) {
                  return updateUserAccountCache(
                    cache,
                    existingRef,
                    data?.acceptRequest.account,
                  );
                },
              },
            });
          },
        });
      }
    }
  };

  const decline = () => {
    if (actionable) {
      respondToNotification({
        variables: {
          data: {
            notificationId: notification._id,
            response: Notification_Response.Declined,
          },
        },
      });
      if (reason === Notification_Reason.ConnectionRequest) {
        declineConnectionRequest({
          variables: { data: { connectionId: connection?._id ?? '' } },
          update(cache, { data }) {
            cache.modify({
              fields: {
                getNotifications(
                  existingRef: GetNotificationsReference,
                  { readField },
                ) {
                  if (!data) return existingRef;
                  return {
                    ...existingRef,
                    notifications: existingRef.notifications.filter(
                      (notificationRef) =>
                        _id !== readField('_id', notificationRef),
                    ),
                  };
                },
              },
            });
          },
        });
      } else if (reason === Notification_Reason.P2PTransactionRequest) {
        declineRequest({
          variables: { data: { transactionId: transaction?._id ?? '' } },
        });
      }
    }
  };

  return [
    accept,
    decline,
    {
      loading:
        respondToNotificationResult.loading ||
        acceptConnectionRequestResult.loading ||
        declineConnectionRequestResult.loading ||
        acceptRequestResult.loading ||
        declineRequestResult.loading,
      error:
        respondToNotificationResult.error ||
        acceptConnectionRequestResult.error ||
        declineConnectionRequestResult.error ||
        acceptRequestResult.error ||
        declineRequestResult.error,
    },
  ];
};
