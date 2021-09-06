import React from 'react';
import styled, { useTheme } from 'styled-components';

import Column from '../../../components/Column';
import Spacer from '../../../components/Spacer';
import Typography from '../../../components/Typography';
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
  const theme = useTheme();

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
          <Typography tag="h4" textAlign="center">
            Something went wrong
          </Typography>
          <Spacer width={16} />
          <Typography tag="h5" textAlign="center">
            There was an issue fetching users
          </Typography>
          <Spacer width={16} />
          <Typography
            tag="p"
            color={theme.colors.error.primary}
            textAlign="center"
          >
            {error.message}
          </Typography>
        </Column>
      ) : null}
    </Container>
  );
};

export default ChatTransactions;
