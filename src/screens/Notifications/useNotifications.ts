import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';

import type { NotificationsQuery } from '../../generated/graphql';
import { useNotificationsLazyQuery } from '../../generated/graphql';

const PAGE_SIZE = 15;

type ReturnType = {
  data?: NotificationsQuery;
  loading: boolean;
  error?: ApolloError;
  onNext: () => void;
  onRefresh: () => void;
};

export const useNotifications = (): ReturnType => {
  const [getNotifications, { data, loading, error, fetchMore, refetch }] =
    useNotificationsLazyQuery();

  const variables = {
    pageData: {
      pageNumber: 0,
      pageSize: PAGE_SIZE,
    },
  };

  useEffect(() => {
    getNotifications({
      variables,
    });
  }, []);

  const onNext = () => {
    fetchMore?.({
      variables: {
        ...variables,
        pageData: {
          pageNumber: (data?.getNotifications.pageData.pageNumber ?? 0) + 1,
          pageSize: PAGE_SIZE,
        },
      },
    });
  };

  const onRefresh = () => {
    refetch?.(variables);
  };

  return {
    data,
    loading,
    error,
    onNext,
    onRefresh,
  };
};
