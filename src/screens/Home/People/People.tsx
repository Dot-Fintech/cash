import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

import Column from '../../../components/Column';
import EmptyState from '../../../components/EmptyState';
import Error from '../../../components/Error';
import { LoadingList } from '../../../components/Loading';
import Spacer from '../../../components/Spacer';
import UserListItem from '../../../components/UserListItem';
import { UserListItemFragment } from '../../../generated/graphql';
import { RAIL_SPACING } from '../../../styles/spacing';
import { useInteractions } from './useInteractions';

const Container = styled(Column)`
  padding-top: 16px;
`;

const ErrorContainer = styled(Column)`
  height: 100%;
`;

type Props = {
  goToUser: (user: UserListItemFragment) => void;
};

const People: React.FC<Props> = ({ goToUser }) => {
  const { data, loading, error } = useInteractions();

  const interactions = data?.getInteractions.interactions;

  return (
    <Container fullWidth>
      {data ? (
        interactions && interactions.length > 0 ? (
          interactions.map(({ otherUser }, index) => (
            <Column key={otherUser._id} fullWidth>
              {index > 0 && <Spacer height={16} />}
              <UserListItem
                user={otherUser}
                onPress={() => goToUser(otherUser)}
              />
            </Column>
          ))
        ) : (
          <EmptyState
            title="Not too much going on over here"
            description="Start moving money around to see a list of users you've interacted with here."
          />
        )
      ) : loading ? (
        <LoadingList
          width={Dimensions.get('window').width - RAIL_SPACING}
          numRows={6}
        />
      ) : error ? (
        <ErrorContainer justifyContent="center" alignItems="center" fullWidth>
          <Error error={error} message="We can't get those users right now." />
        </ErrorContainer>
      ) : null}
    </Container>
  );
};

export default People;
