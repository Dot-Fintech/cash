import { Alert } from 'react-native';

import {
  FullUserFragment,
  P2P_Transaction_Type,
} from '../../generated/graphql';

type ValidateTransactionArg = {
  amount: number;
  type: P2P_Transaction_Type;
  user?: FullUserFragment;
};

/**
 * Determines whether the transaction will succeed or fail
 * preemptively. Alerts the error message to the user.
 */
export const validateTransaction = ({
  amount,
  type,
  user,
}: ValidateTransactionArg): boolean => {
  if (amount < 5) {
    Alert.alert(
      'Amount too small',
      `You have to ${
        type === P2P_Transaction_Type.Send ? 'send' : 'request'
      } at least $5`,
    );
    return false;
  }

  if (
    type === P2P_Transaction_Type.Send &&
    (user?.primaryAccount.balance ?? 0) - amount < 0
  ) {
    Alert.alert(
      'Insufficient funds',
      'It seems like you do not have enough money for this transaction',
    );
    return false;
  }

  return true;
};
