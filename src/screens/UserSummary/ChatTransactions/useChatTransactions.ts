import { ApolloError, NetworkStatus } from '@apollo/client';
import { useEffect } from 'react';

import type { ChatTransactionsQuery } from '../../../generated/graphql';
import { useChatTransactionsLazyQuery } from '../../../generated/graphql';

const PAGE_SIZE = 15;

type ReturnType = {
  data?: ChatTransactionsQuery;
  loading: boolean;
  error?: ApolloError;
  networkStatus: NetworkStatus;
  onNext: () => void;
  onRefresh: () => void;
};

export const useChatTransactions = (userId: string): ReturnType => {
  const [
    getTransactions,
    { data, loading, error, networkStatus, fetchMore, refetch },
  ] = useChatTransactionsLazyQuery();

  const variables = {
    data: { userId },
    pageData: {
      pageNumber: 0,
      pageSize: PAGE_SIZE,
    },
  };

  useEffect(() => {
    getTransactions({
      variables,
    });
  }, []);

  const onNext = () => {
    fetchMore?.({
      variables: {
        ...variables,
        pageData: {
          pageNumber: (data?.getP2PTransactions.pageData.pageNumber ?? 0) + 1,
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
    networkStatus,
    onNext,
    onRefresh,
  };
};
