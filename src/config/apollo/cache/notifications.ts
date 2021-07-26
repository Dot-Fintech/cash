import { FieldMergeFunction } from '@apollo/client';

import { GetNotificationsResult } from '../../../generated/graphql';

const defaultNotificationsResult: GetNotificationsResult = {
  notifications: [],
  pageData: {
    count: 0,
    pageNumber: 0,
  },
};

export const mergeNotifications: FieldMergeFunction<
  GetNotificationsResult,
  GetNotificationsResult
> = (existing = defaultNotificationsResult, incoming) => ({
  ...existing,
  notifications: [...existing.notifications, ...incoming.notifications],
});
