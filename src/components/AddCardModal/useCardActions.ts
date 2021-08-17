import { ApolloError, Reference } from '@apollo/client';
import {
  Card_Provider,
  CreateCardMutation,
  FullCardFragmentDoc,
  useCreateCardMutation,
} from 'generated/graphql';
import { GraphQLError } from 'graphql';
import { encrypt, getPublicKey } from 'utils/rsa';

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
    const publicKey = await getPublicKey();
    return await createCardMutation({
      variables: {
        data: {
          cardholderName: encrypt(cardholderName, publicKey),
          primaryAccountNumber: encrypt(primaryAccountNumber, publicKey),
          expiryDate: encrypt(expiryDate, publicKey),
          serviceCode: encrypt(serviceCode, publicKey),
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
