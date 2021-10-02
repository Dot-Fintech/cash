import { ApolloError, NetworkStatus } from '@apollo/client';
import { useEffect } from 'react';

import type {
  Transaction_Action,
  TransactionsQuery,
} from '../../generated/graphql';
import { useTransactionsLazyQuery } from '../../generated/graphql';

const PAGE_SIZE = 15;

export type FilterOption = {
  id: Transaction_Action | 'all';
  label: string;
};

type ReturnType = {
  data?: TransactionsQuery;
  loading: boolean;
  error?: ApolloError;
  networkStatus: NetworkStatus;
  onNext: () => void;
  onRefresh: () => void;
};

export const useTransactions = (filterOption: FilterOption): ReturnType => {
  const [
    getTransactions,
    { data, loading, error, networkStatus, fetchMore, refetch },
  ] = useTransactionsLazyQuery();

  const variables = {
    data: {
      action: filterOption.id === 'all' ? undefined : filterOption.id,
    },
    pageData: {
      pageNumber: 0,
      pageSize: PAGE_SIZE,
    },
  };

  useEffect(() => {
    getTransactions({
      variables,
    });
  }, [filterOption]);

  const onNext = () => {
    fetchMore?.({
      variables: {
        ...variables,
        pageData: {
          pageNumber: (data?.getTransactions.pageData.pageNumber ?? 0) + 1,
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
