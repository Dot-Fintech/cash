import { FieldMergeFunction } from '@apollo/client';

import { GetTransactionsResult } from '../../../generated/graphql';

const defaultTransactionsResult: GetTransactionsResult = {
  transactions: [],
  pageData: {
    count: 0,
    pageNumber: 0,
  },
};

export const mergeTransactions: FieldMergeFunction<
  GetTransactionsResult,
  GetTransactionsResult
> = (existing = defaultTransactionsResult, incoming) => ({
  ...existing,
  transactions: [...existing.transactions, ...incoming.transactions],
});
