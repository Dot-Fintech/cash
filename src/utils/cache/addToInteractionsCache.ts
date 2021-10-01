import { ApolloCache } from '@apollo/client';
import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';

import {
  FullInteractionFragment,
  FullInteractionFragmentDoc,
} from '../../generated/graphql';
import { GetInteractionsReference } from '../types/CacheReferences';

type Arg<T> = {
  cache: ApolloCache<T>;
  existingRef: GetInteractionsReference;
  readField: ReadFieldFunction;
  data?: FullInteractionFragment;
};

export const addToInteractionsCache = <T>({
  cache,
  existingRef,
  readField,
  data,
}: Arg<T>): GetInteractionsReference => {
  if (!data) return existingRef;

  if (
    existingRef.interactions.find(
      (interaction) => data._id === readField('_id', interaction),
    )
  ) {
    return existingRef;
  }

  const fragmentProperties = {
    fragment: FullInteractionFragmentDoc,
    fragmentName: 'FullInteraction',
  };

  const newInteractionRef = cache.writeFragment({
    data,
    ...fragmentProperties,
  });

  if (!newInteractionRef) return existingRef;

  const newRef = {
    ...existingRef,
    interactions: [newInteractionRef, ...existingRef.interactions],
  };

  return newRef;
};
