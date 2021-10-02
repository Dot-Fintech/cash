import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import Column from '../../../components/Column';
import Error from '../../../components/Error';
import FinalBlock from '../../../components/FinalBlock';
import Spacer from '../../../components/Spacer';
import type { UserListItemFragment } from '../../../generated/graphql';
import ChatTransaction from './ChatTransaction';
import LoadingMessages from './LoadingMessages';
import { useChatTransactions } from './useChatTransactions';

const Container = styled(Column)`
  height: 100%;
`;

type Props = {
  user: UserListItemFragment;
};

const ChatTransactions: React.FC<Props> = ({ user }) => {
  const { bottom } = useSafeAreaInsets();

  const { data, loading, error, networkStatus, onNext, onRefresh } =
    useChatTransactions(user._id);

  const transactions = data?.getP2PTransactions.transactions;

  return (
    <Container fullWidth>
      {transactions && transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(transaction) => transaction._id}
          inverted
          showsVerticalScrollIndicator={false}
          refreshing={networkStatus === 4}
          onRefresh={onRefresh}
          onEndReached={onNext}
          onEndReachedThreshold={0.7}
          renderItem={({ item, index }) =>
            item.p2p ? (
              <Column fullWidth>
                <ChatTransaction {...item} source={item.p2p} />
                {index > 0 && <Spacer height={16} />}
              </Column>
            ) : null
          }
          ListHeaderComponent={() => (
            <>
              {loading && (
                <Column alignItems="center" fullWidth>
                  <ActivityIndicator />
                </Column>
              )}
              <FinalBlock bottomInset={bottom} />
            </>
          )}
          ListFooterComponent={() => <Spacer height={16} />}
        />
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
