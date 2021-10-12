import type { Reference } from '@apollo/client';
import { GraphQLError } from 'graphql';

import {
  FullTransactionFragment,
  P2P_Transaction_Type,
  useRequestMutation,
  useSendMutation,
} from '../../../generated/graphql';
import { addToInteractionsCache } from '../../../utils/cache/addToInteractionsCache';
import { addToTransactionsCache } from '../../../utils/cache/addToTransactionsCache';
import { updateUserAccountCache } from '../../../utils/cache/updateUserAccountCache';
import { formatter } from '../../../utils/money';
import type {
  GetInteractionsReference,
  GetTransactionsReference,
} from '../../../utils/types/CacheReferences';

type HookArg = {
  amount: number;
  note?: string;
  recipientId: string;
};

type HookResult = [
  (args: HookArg) => Promise<{
    data?: FullTransactionFragment;
    errors?: readonly GraphQLError[];
  }>,
  { loading: boolean; errors?: readonly GraphQLError[] },
];

export const useSendEmoney = (): HookResult => {
  const [sendEmoney, { loading }] = useSendMutation();

  const send = async ({ amount, note, recipientId }: HookArg) => {
    const { data, errors } = await sendEmoney({
      variables: { data: { amount, note, recipientId } },
      update(cache, { data }) {
        cache.modify({
          fields: {
            getTransactions(existingRef: GetTransactionsReference) {
              return addToTransactionsCache(
                cache,
                existingRef,
                data?.sendEmoney.transaction,
              );
            },
            getInteractions(
              existingRef: GetInteractionsReference,
              { readField },
            ) {
              return addToInteractionsCache({
                cache,
                existingRef,
                readField,
                data: data?.sendEmoney.interaction,
              });
            },
            user(existingRef: Reference) {
              return updateUserAccountCache(
                cache,
                existingRef,
                data?.sendEmoney.account,
              );
            },
          },
        });
      },
    });
    return { data: data?.sendEmoney.transaction, errors };
  };

  return [send, { loading }];
};

export const useRequestEmoney = (): HookResult => {
  const [requestEmoney, { loading }] = useRequestMutation();

  const request = async ({ amount, note, recipientId }: HookArg) => {
    const { data, errors } = await requestEmoney({
      variables: { data: { amount, note, recipientId } },
      update(cache, { data }) {
        cache.modify({
          fields: {
            getTransactions(existingRef: GetTransactionsReference) {
              return addToTransactionsCache(
                cache,
                existingRef,
                data?.requestEmoney.transaction,
              );
            },
            getInteractions(
              existingRef: GetInteractionsReference,
              { readField },
            ) {
              return addToInteractionsCache({
                cache,
                existingRef,
                readField,
                data: data?.requestEmoney.interaction,
              });
            },
          },
        });
      },
    });
    return { data: data?.requestEmoney.transaction, errors };
  };

  return [request, { loading }];
};

type BuildSuccessDescriptionArg = {
  recipientName: string;
  amount: number;
  type: P2P_Transaction_Type;
};

export const buildSuccessDescription = ({
  recipientName,
  amount,
  type,
}: BuildSuccessDescriptionArg): string => {
  const verb = type === P2P_Transaction_Type.Request ? 'requested' : 'sent';
  const preposition = type === P2P_Transaction_Type.Request ? 'from' : 'to';
  return `You successfully ${verb} ${formatter.format(
    amount,
  )} ${preposition} ${recipientName}`;
};
