import React, { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import Chip, { CHIP_HEIGHT } from '../../../components/Chip';
import Column from '../../../components/Column';
import EmptyState from '../../../components/EmptyState';
import Error from '../../../components/Error';
import FinalBlock from '../../../components/FinalBlock';
import { LoadingChips, LoadingList } from '../../../components/Loading';
import Row from '../../../components/Row';
import Spacer from '../../../components/Spacer';
import TransactionListItem from '../../../components/TransactionListItem';
import Typography from '../../../components/Typography';
import { Transaction_Action } from '../../../generated/graphql';
import { RAIL_SPACING } from '../../../styles/spacing';
import {
  FilterOption,
  useTransactions,
} from '../../../utils/hooks/useTransactions';

const { width } = Dimensions.get('window');

const ChipListItemWrapper = styled(Row)`
  height: ${CHIP_HEIGHT + 8}px;
`;

const TransactionContainer = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
`;

const TransactionListItemWrapper = styled(Column)`
  width: ${width - 2 * RAIL_SPACING}px;
`;

const ErrorContainer = styled(Column)`
  height: 100%;
`;

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All' },
  { id: Transaction_Action.Sent, label: 'Sent' },
  { id: Transaction_Action.Received, label: 'Received' },
  { id: Transaction_Action.Deposited, label: 'Deposits' },
  { id: Transaction_Action.Withdrawn, label: 'Withdrawals' },
];

const Transactions: React.FC = () => {
  const { bottom } = useSafeAreaInsets();

  const [filterOption, setFilterOption] = useState(filterOptions[0]);

  const { data, loading, error } = useTransactions(filterOption);

  const transactions = data?.getTransactions.transactions;

  return (
    <Column fullWidth>
      {data ? (
        <FlatList
          data={filterOptions}
          keyExtractor={(option) => option.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <>
              <Spacer width={16} />
              <ChipListItemWrapper>
                <Chip
                  isSelected={filterOption.id === item.id}
                  onPress={() => setFilterOption(item)}
                >
                  {item.label}
                </Chip>
              </ChipListItemWrapper>
              {index === filterOptions.length - 1 && <Spacer width={16} />}
            </>
          )}
        />
      ) : loading ? (
        <Row>
          <Spacer width={16} />
          <LoadingChips amount={filterOptions.length} />
        </Row>
      ) : null}
      <Spacer height={16} />
      <TransactionContainer>
        {transactions ? (
          transactions.length > 0 ? (
            <FlatList
              data={transactions}
              keyExtractor={(transaction) => transaction._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <>
                  <TransactionListItemWrapper justifyContent="center">
                    {index > 0 && <Spacer height={16} />}
                    {(index === 0 ||
                      new Date(
                        transactions[index - 1].createdAt,
                      ).toDateString() !==
                        new Date(item.createdAt).toDateString()) && (
                      <>
                        <Typography tag="h6">
                          {new Date(item.createdAt).toDateString()}
                        </Typography>
                        <Spacer height={16} />
                      </>
                    )}
                    <TransactionListItem transaction={item} />
                  </TransactionListItemWrapper>
                  {index === transactions.length - 1 && (
                    <FinalBlock bottomInset={bottom} />
                  )}
                </>
              )}
            />
          ) : (
            <>
              <Spacer height={16} />
              <EmptyState
                title="No transactions just yet"
                description="Start moving money around to see a list of transactions here."
              />
            </>
          )
        ) : loading ? (
          <LoadingList width={width - 2 * RAIL_SPACING} numRows={8} />
        ) : error ? (
          <ErrorContainer alignItems="center" fullWidth>
            <Error
              error={error}
              message="We can't get those transactions right now."
            />
          </ErrorContainer>
        ) : null}
      </TransactionContainer>
    </Column>
  );
};

export default Transactions;
