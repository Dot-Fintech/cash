import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components';

import Chip, { CHIP_HEIGHT } from '../../../components/Chip';
import Column from '../../../components/Column';
import EmptyState from '../../../components/EmptyState';
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

const FilterOptionsContainer = styled(ScrollView)`
  height: ${CHIP_HEIGHT + 16}px;
  padding: 8px 0;
`;

const TransactionContainer = styled(Column)`
  padding: 0 ${RAIL_SPACING}px;
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
  const theme = useTheme();

  const [filterOption, setFilterOption] = useState(filterOptions[0]);

  const { data, loading, error } = useTransactions(filterOption);

  const transactions = data?.getTransactions.transactions;

  return (
    <Column fullWidth>
      {data ? (
        <FilterOptionsContainer
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Spacer width={8} />
          {filterOptions.map((option, index) => (
            <Row key={option.id}>
              {index > 0 && <Spacer width={16} />}
              <Chip
                isSelected={filterOption.id === option.id}
                onPress={() => setFilterOption(option)}
              >
                {option.label}
              </Chip>
            </Row>
          ))}
          <Spacer width={8} />
        </FilterOptionsContainer>
      ) : loading ? (
        <LoadingChips />
      ) : null}
      <Spacer height={16} />
      {data ? (
        transactions && transactions.length > 0 ? (
          transactions?.map((transaction, index) => (
            <TransactionContainer
              key={transaction._id}
              justifyContent="center"
              fullWidth
            >
              {index > 0 && <Spacer height={16} />}
              {(index === 0 ||
                new Date(transactions[index - 1].createdAt).toDateString() !==
                  new Date(transaction.createdAt).toDateString()) && (
                <>
                  <Typography tag="h6">
                    {new Date(transaction.createdAt).toDateString()}
                  </Typography>
                  <Spacer height={16} />
                </>
              )}
              <TransactionListItem transaction={transaction} />
            </TransactionContainer>
          ))
        ) : (
          <EmptyState
            title="No transactions just yet"
            description="Start moving money around to see a list of transactions here."
          />
        )
      ) : loading ? (
        <LoadingList
          width={Dimensions.get('window').width - RAIL_SPACING}
          numRows={8}
        />
      ) : error ? (
        <ErrorContainer alignItems="center" fullWidth>
          <Typography tag="h4" textAlign="center">
            Looks like something went wrong
          </Typography>
          <Spacer height={16} />
          <Typography tag="h5" textAlign="center">
            There was an issue fetching your transactions
          </Typography>
          <Spacer height={16} />
          <Typography
            tag="h5"
            textAlign="center"
            color={theme.colors.error.primary}
          >
            {error.message}
          </Typography>
        </ErrorContainer>
      ) : null}
    </Column>
  );
};

export default Transactions;
