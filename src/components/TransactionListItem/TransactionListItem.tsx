import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import {
  FullTransactionFragment,
  Transaction_Source_Type,
} from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/paramLists/HomeStack';
import BankTransactionListItem from './BankTransactionListItem';
import P2PTransactionListItem from './P2PTransactionListItem';

type Props = {
  transaction: FullTransactionFragment;
};

const TransactionListItem: React.FC<Props> = ({ transaction }) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const { _id, amount, bank, p2p, source } = transaction;

  const goToTransaction = () =>
    navigation.push(SCREENS.TRANSACTION_SUMMARY, { id: _id });

  return source === Transaction_Source_Type.P2P && p2p ? (
    <P2PTransactionListItem
      amount={amount}
      source={p2p}
      goToTransaction={goToTransaction}
    />
  ) : source === Transaction_Source_Type.Bank && bank ? (
    <BankTransactionListItem
      amount={amount}
      source={bank}
      goToTransaction={goToTransaction}
    />
  ) : null;
};

export default TransactionListItem;
