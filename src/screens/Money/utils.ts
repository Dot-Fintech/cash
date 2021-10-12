import { Alert } from 'react-native';

import {
  Bank_Transaction_Type,
  FullUserFragment,
  P2P_Transaction_Type,
} from '../../generated/graphql';

type ValidateP2PTransactionArg = {
  amount: number;
  type: P2P_Transaction_Type;
  user?: FullUserFragment;
};

export const validateP2PTransaction = ({
  amount,
  type,
  user,
}: ValidateP2PTransactionArg): boolean => {
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

type ValidateBankTransactionArg = {
  amount: number;
  type: Bank_Transaction_Type;
  user?: FullUserFragment;
};

export const validateBankTransaction = ({
  amount,
  type,
  user,
}: ValidateBankTransactionArg): boolean => {
  if (amount < 5) {
    Alert.alert(
      'Amount too small',
      `You have to ${
        type === Bank_Transaction_Type.Deposit ? 'deposit' : 'withdraw'
      } at least $5`,
    );
    return false;
  }

  if (
    type === Bank_Transaction_Type.Withdraw &&
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
