import { ApolloError, Reference } from '@apollo/client';
import { GraphQLError } from 'graphql';

import {
  Card_Provider,
  CreateCardMutation,
  FullCardFragmentDoc,
  useCreateCardMutation,
} from '../../generated/graphql';

type CreateCardArg = {
  cardholderName: string;
  primaryAccountNumber: string;
  expiryDate: string;
  serviceCode: string;
  provider: Card_Provider;
};

type ReturnType = [
  (arg: CreateCardArg) => Promise<{
    data?: CreateCardMutation | null;
    errors?: readonly GraphQLError[];
  }>,
  { loading: boolean; error?: ApolloError },
];

export const useCardActions = (): ReturnType => {
  const [createCardMutation, { loading, error }] = useCreateCardMutation();

  const createCard = async ({
    cardholderName,
    primaryAccountNumber,
    expiryDate,
    serviceCode,
    provider,
  }: CreateCardArg) => {
    return await createCardMutation({
      variables: {
        data: {
          cardholderName,
          primaryAccountNumber,
          expiryDate,
          serviceCode,
          provider,
        },
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            getCards(existingRefs: Reference[] = []) {
              if (!data) return existingRefs;
              const newCardRef = cache.writeFragment({
                data: data.createCard,
                fragment: FullCardFragmentDoc,
                fragmentName: 'FullCard',
              });
              return [...existingRefs, newCardRef];
            },
          },
        });
      },
    });
  };

  return [createCard, { loading, error }];
};
