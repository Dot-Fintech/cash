import {
  FullTransactionFragment,
  Transaction_Source_Type,
} from 'generated/graphql';
import React from 'react';

import BankTransactionListItem from './BankTransactionListItem';
import P2PTransactionListItem from './P2PTransactionListItem';

type Props = {
  transaction: FullTransactionFragment;
};

const TransactionListItem: React.FC<Props> = ({ transaction }) => {
  const { amount, bank, p2p, source, token } = transaction;
  return source === Transaction_Source_Type.P2P && p2p ? (
    <P2PTransactionListItem amount={amount} source={p2p} token={token} />
  ) : source === Transaction_Source_Type.Bank && bank ? (
    <BankTransactionListItem amount={amount} source={bank} token={token} />
  ) : null;
};

export default TransactionListItem;
