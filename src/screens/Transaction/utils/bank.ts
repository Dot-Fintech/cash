import type { Reference } from '@apollo/client';
import { GraphQLError } from 'graphql';

import {
  Bank_Transaction_Type,
  FullTransactionFragment,
  useDepositMutation,
  useWithdrawMutation,
} from '../../../generated/graphql';
import { addToTransactionsCache } from '../../../utils/cache/addToTransactionsCache';
import { updateUserAccountCache } from '../../../utils/cache/updateUserAccountCache';
import { formatter } from '../../../utils/money';
import type { GetTransactionsReference } from '../../../utils/types/CacheReferences';

export const RAIL_SPACING = 16;

type HookArg = {
  amount: number;
  cardId: string;
};

type HookResult = [
  (arg: HookArg) => Promise<{
    data?: FullTransactionFragment;
    errors?: readonly GraphQLError[];
  }>,
  { loading: boolean },
];

export const useDeposit = (): HookResult => {
  const [depositEmoney, { loading }] = useDepositMutation();

  const deposit = async ({ amount, cardId }: HookArg) => {
    const { data, errors } = await depositEmoney({
      variables: { data: { amount, cardId } },
      update(cache, { data }) {
        cache.modify({
          fields: {
            getTransactions(existingRef: GetTransactionsReference) {
              return addToTransactionsCache(
                cache,
                existingRef,
                data?.depositEmoney.transaction,
              );
            },
            user(existingRef: Reference) {
              return updateUserAccountCache(
                cache,
                existingRef,
                data?.depositEmoney.account,
              );
            },
          },
        });
      },
    });
    return { data: data?.depositEmoney.transaction, errors };
  };

  return [deposit, { loading }];
};

export const useWithdraw = (): HookResult => {
  const [withdrawEmoney, { loading }] = useWithdrawMutation();

  const withdraw = async ({ amount, cardId }: HookArg) => {
    const { data, errors } = await withdrawEmoney({
      variables: { data: { amount, cardId } },
      update(cache, { data }) {
        cache.modify({
          fields: {
            getTransactions(existingRef: GetTransactionsReference) {
              return addToTransactionsCache(
                cache,
                existingRef,
                data?.withdrawEmoney.transaction,
              );
            },
            user(existingRef: Reference) {
              return updateUserAccountCache(
                cache,
                existingRef,
                data?.withdrawEmoney.account,
              );
            },
          },
        });
      },
    });
    return { data: data?.withdrawEmoney.transaction, errors };
  };

  return [withdraw, { loading }];
};

type BuildSuccessDescriptionArg = {
  cardLast4Digits: string;
  amount: number;
  transactionType: Bank_Transaction_Type;
};

export const buildSuccessDescription = ({
  cardLast4Digits,
  amount,
  transactionType,
}: BuildSuccessDescriptionArg): string => {
  const verb =
    transactionType === Bank_Transaction_Type.Deposit
      ? 'deposited'
      : 'withdrew';
  const preposition =
    transactionType === Bank_Transaction_Type.Deposit ? 'to' : 'from';
  const inversePreposition = preposition === 'from' ? 'to' : 'from';

  return `You successfully ${verb} ${formatter.format(
    amount,
  )} ${preposition} your ewallet ${inversePreposition} the card ${cardLast4Digits}.`;
};
