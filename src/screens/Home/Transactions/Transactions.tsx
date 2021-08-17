import {
  Column,
  InfiniteScroll,
  Row,
  Spacer,
  Typography,
} from '@dot-fintech/web-ui';
import Chip from 'components/Chip';
import EmptyState from 'components/EmptyState';
import { LoadingChips, LoadingList } from 'components/Loading';
import TransactionListItem from 'components/TransactionListItem';
import { Transaction_Action } from 'generated/graphql';
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { FilterOption, useTransactions } from 'utils/hooks/useTransactions';

import { RAIL_SPACING } from '../utils';

const CONTAINER_ID = 'home_transactions_container_id';

const Container = styled(Column)`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
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

  const { data, loading, error, onNext, onRefresh } =
    useTransactions(filterOption);

  const count = data?.getTransactions.pageData.count;
  const transactions = data?.getTransactions.transactions;

  return (
    <Container id={CONTAINER_ID} fullWidth>
      {data ? (
        <FilterOptionsContainer fullWidth>
          {filterOptions.map((option, index) => (
            <Row key={option.id}>
              {index > 0 && <Spacer width={16} />}
              <Chip
                isSelected={filterOption.id === option.id}
                onClick={() => setFilterOption(option)}
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
          <InfiniteScroll
            dataLength={transactions.length}
            hasMore={transactions.length < (count ?? 0)}
            scrollableTarget={CONTAINER_ID}
            next={onNext}
            refresh={onRefresh}
          >
            {transactions?.map((transaction, index) => (
              <Column key={transaction._id} justifyContent="center" fullWidth>
                {index > 0 && <Spacer height={16} />}
                {(index === 0 ||
                  new Date(transactions[index - 1].createdAt).toDateString() !==
                    new Date(transaction.createdAt).toDateString()) && (
                  <>
                    <Typography as="h6">
                      {new Date(transaction.createdAt).toDateString()}
                    </Typography>
                    <Spacer height={16} />
                  </>
                )}
                <TransactionListItem transaction={transaction} />
              </Column>
            ))}
          </InfiniteScroll>
        ) : (
          <EmptyState
            title="No transactions just yet"
            description="Start moving money around to see a list of transactions here."
          />
        )
      ) : loading ? (
        <LoadingList width={window.innerWidth - RAIL_SPACING} numRows={8} />
      ) : error ? (
        <ErrorContainer alignItems="center" fullWidth>
          <Typography as="h4" textAlign="center">
            Looks like something went wrong
          </Typography>
          <Spacer height={16} />
          <Typography as="h5" textAlign="center">
            There was an issue fetching your transactions
          </Typography>
          <Spacer height={16} />
          <Typography
            as="h5"
            textAlign="center"
            textColor={theme.colors.error.primary}
          >
            {error.message}
          </Typography>
        </ErrorContainer>
      ) : null}
    </Container>
  );
};

export default Transactions;
