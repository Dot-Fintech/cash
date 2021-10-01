import React from 'react';
import styled from 'styled-components';

import Column from '../../../components/Column';
import Error from '../../../components/Error';
import Spacer from '../../../components/Spacer';
import type { UserListItemFragment } from '../../../generated/graphql';
import ChatTransaction from './ChatTransaction';
import LoadingMessages from './LoadingMessages';
import { useChatTransactions } from './useChatTransactions';

const Container = styled(Column)`
  height: 100%;
`;

const ScrollContainer = styled(Column)`
  flex-direction: column-reverse;
`;

type Props = {
  user: UserListItemFragment;
};

const ChatTransactions: React.FC<Props> = ({ user }) => {
  const { data, loading, error } = useChatTransactions(user._id);

  const transactions = data?.getP2PTransactions.transactions;

  return (
    <Container fullWidth>
      {data ? (
        transactions && transactions.length > 0 ? (
          <ScrollContainer fullWidth>
            {transactions.map(
              (transaction, index) =>
                transaction.p2p && (
                  <Column key={transaction._id} fullWidth>
                    {index > 0 && <Spacer height={16} />}
                    <ChatTransaction
                      {...transaction}
                      source={transaction.p2p}
                    />
                  </Column>
                ),
            )}
          </ScrollContainer>
        ) : null
      ) : loading ? (
        <LoadingMessages />
      ) : error ? (
        <Column alignItems="center" fullWidth>
          <Error
            error={error}
            message="We can't get those transactions right now."
          />
        </Column>
      ) : null}
    </Container>
  );
};

export default ChatTransactions;
