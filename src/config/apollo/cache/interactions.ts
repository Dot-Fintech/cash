import { FieldMergeFunction } from '@apollo/client';

import { GetInteractionsResult } from '../../../generated/graphql';

const defaultInteractionsResult: GetInteractionsResult = {
  interactions: [],
  pageData: {
    count: 0,
    pageNumber: 0,
  },
};

export const mergeInteractions: FieldMergeFunction<
  GetInteractionsResult,
  GetInteractionsResult
> = (existing = defaultInteractionsResult, incoming) => ({
  ...existing,
  interactions: [...existing.interactions, ...incoming.interactions],
});
