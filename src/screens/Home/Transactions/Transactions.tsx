import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Chip from '../../../components/Chip';
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

const Container = styled(Column)`
  overflow-y: scroll;
`;

const FilterOptionsContainer = styled(Row)`
  overflow-x: scroll;
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
    <Container fullWidth>
      {data ? (
        <FilterOptionsContainer fullWidth>
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
        </FilterOptionsContainer>
      ) : loading ? (
        <LoadingChips />
      ) : null}
      <Spacer height={16} />
      {data ? (
        transactions && transactions.length > 0 ? (
          transactions?.map((transaction, index) => (
            <Column key={transaction._id} justifyContent="center" fullWidth>
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
            </Column>
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
    </Container>
  );
};

export default Transactions;