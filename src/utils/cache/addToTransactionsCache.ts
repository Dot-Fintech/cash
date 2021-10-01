import { ApolloCache } from '@apollo/client';

import {
  FullTransactionFragment,
  FullTransactionFragmentDoc,
} from '../../generated/graphql';
import { GetTransactionsReference } from '../types/CacheReferences';

export const addToTransactionsCache = <T>(
  cache: ApolloCache<T>,
  existingRef: GetTransactionsReference,
  data?: FullTransactionFragment,
): GetTransactionsReference => {
  if (!data) return existingRef;

  const fragmentProperties = {
    fragment: FullTransactionFragmentDoc,
    fragmentName: 'FullTransaction',
  };

  const newTransactionRef = cache.writeFragment({
    data,
    ...fragmentProperties,
  });

  if (!newTransactionRef) return existingRef;

  const newRef = {
    ...existingRef,
    transactions: [newTransactionRef, ...existingRef.transactions],
  };

  return newRef;
};
