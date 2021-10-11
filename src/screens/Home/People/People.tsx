import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import styled, { useTheme } from 'styled-components';

import Column from '../../../components/Column';
import Error from '../../../components/Error';
import { LoadingBox } from '../../../components/Loading';
import ProfilePhoto from '../../../components/ProfilePhoto';
import Spacer from '../../../components/Spacer';
import Typography from '../../../components/Typography';
import { UserListItemFragment } from '../../../generated/graphql';
import { RAIL_SPACING } from '../../../styles/spacing';
import { useInteractions } from './useInteractions';

const { width } = Dimensions.get('window');

const LIST_HEIGHT = 80;
const USER_NAME_TAG = 'p';
const USER_PHOTO_NAME_SPACING = 4;

const ListContainer = styled(View)`
  height: ${LIST_HEIGHT}px;
`;

const ErrorContainer = styled(Column)`
  height: 100%;
`;

type Props = {
  goToUser: (user: UserListItemFragment) => void;
};

const People: React.FC<Props> = ({ goToUser }) => {
  const theme = useTheme();

  const { data, loading, error, networkStatus, onNext, onRefresh } =
    useInteractions();

  const interactions = data?.getInteractions.interactions;

  return (
    <>
      {interactions ? (
        <ListContainer>
          <FlatList
            data={interactions}
            keyExtractor={(interaction) => interaction._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            refreshing={networkStatus === 4}
            onRefresh={onRefresh}
            onEndReached={onNext}
            onEndReachedThreshold={0.7}
            renderItem={({ item }) => (
              <>
                <Spacer width={16} />
                <Column alignItems="center">
                  <TouchableOpacity onPress={() => goToUser(item.otherUser)}>
                    <ProfilePhoto
                      size={
                        LIST_HEIGHT -
                        theme.typography[USER_NAME_TAG].lineHeight -
                        USER_PHOTO_NAME_SPACING
                      }
                      uri={item.otherUser.profilePhotoUrl}
                    />
                  </TouchableOpacity>
                  <Spacer height={4} />
                  <Typography tag="p">
                    {item.otherUser.firstName} {item.otherUser.lastName[0]}.
                  </Typography>
                </Column>
              </>
            )}
            ListFooterComponent={() =>
              loading ? (
                <Column justifyContent="center">
                  <ActivityIndicator />
                </Column>
              ) : null
            }
          />
        </ListContainer>
      ) : loading ? (
        <LoadingBox width={width - 2 * RAIL_SPACING} height={LIST_HEIGHT} />
      ) : error ? (
        <ErrorContainer justifyContent="center" alignItems="center" fullWidth>
          <Error error={error} message="We can't get those users right now." />
        </ErrorContainer>
      ) : null}
    </>
  );
};

export default People;
