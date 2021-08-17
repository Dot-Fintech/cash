import React from 'react';
import styled, { useTheme } from 'styled-components';

import Column from '../../../components/Column';
import EmptyState from '../../../components/EmptyState';
import { LoadingList } from '../../../components/Loading';
import Spacer from '../../../components/Spacer';
import Typography from '../../../components/Typography';
import UserListItem from '../../../components/UserListItem';
import { UserListItemFragment } from '../../../generated/graphql';
import { RAIL_SPACING } from '../utils';
import { useInteractions } from './useInteractions';

const Container = styled(Column)`
  padding-top: 16px;
  overflow-y: scroll;
`;

const ErrorContainer = styled(Column)`
  height: 100%;
`;

const People: React.FC = () => {
  const theme = useTheme();

  const { data, loading, error } = useInteractions();

  const goToUser = (user: UserListItemFragment) => {
    history.push(`${BASE_ROUTES.USER}/${user.username}`);
  };

  const interactions = data?.getInteractions.interactions;

  return (
    <Container fullWidth>
      {data ? (
        interactions && interactions.length > 0 ? (
          interactions.map(({ user }, index) => (
            <Column key={user._id} fullWidth>
              {index > 0 && <Spacer height={16} />}
              <UserListItem user={user} onClick={() => goToUser(user)} />
            </Column>
          ))
        ) : (
          <EmptyState
            title="Not too much going on over here"
            description="Start moving money around to see a list of users you've interacted with here."
          />
        )
      ) : loading ? (
        <LoadingList width={window.innerWidth - RAIL_SPACING} numRows={6} />
      ) : error ? (
        <ErrorContainer justifyContent="center" alignItems="center" fullWidth>
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
        </ErrorContainer>
      ) : null}
    </Container>
  );
};

export default People;
