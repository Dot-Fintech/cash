import { ApolloCache, Reference } from '@apollo/client';
import {
  FullAccountFragment,
  FullUserFragment,
  FullUserFragmentDoc,
} from 'generated/graphql';

export const updateUserAccountCache = <T>(
  cache: ApolloCache<T>,
  existingRef: Reference,
  data?: FullAccountFragment,
): Reference => {
  if (!data) return existingRef;

  const fragmentProperties = {
    fragment: FullUserFragmentDoc,
    fragmentName: 'FullUser',
  };

  const userFragment = cache.readFragment<FullUserFragment>({
    id: existingRef.__ref,
    ...fragmentProperties,
  });

  if (!userFragment) return existingRef;

  const newRef = cache.writeFragment({
    id: existingRef.__ref,
    data: {
      ...userFragment,
      primaryAccount: data,
    },
    ...fragmentProperties,
  });

  if (!newRef) return existingRef;

  return newRef;
};
