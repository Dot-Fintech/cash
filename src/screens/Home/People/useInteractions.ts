import { ApolloError, NetworkStatus } from '@apollo/client';
import { useEffect } from 'react';

import type { InteractionsQuery } from '../../../generated/graphql';
import { useInteractionsLazyQuery } from '../../../generated/graphql';

const PAGE_SIZE = 15;

type ReturnType = {
  data?: InteractionsQuery;
  loading: boolean;
  error?: ApolloError;
  networkStatus: NetworkStatus;
  onNext: () => void;
  onRefresh: () => void;
};

export const useInteractions = (): ReturnType => {
  const [
    getInteractions,
    { data, loading, error, networkStatus, fetchMore, refetch },
  ] = useInteractionsLazyQuery();

  const variables = {
    pageData: {
      pageNumber: 0,
      pageSize: PAGE_SIZE,
    },
  };

  useEffect(() => {
    getInteractions({
      variables,
    });
  }, []);

  const onNext = () => {
    fetchMore?.({
      variables: {
        ...variables,
        pageData: {
          pageNumber: (data?.getInteractions.pageData.pageNumber ?? 0) + 1,
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
