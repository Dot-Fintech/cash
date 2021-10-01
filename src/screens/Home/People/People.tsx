import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

  const { data, loading, error } = useInteractions();

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
            renderItem={({ item }) => (
              <>
                <Spacer width={16} />
                <Column alignItems="center">
                  <TouchableOpacity onPress={() => goToUser(item.otherUser)}>
                    <ProfilePhoto
                      size={
                        LIST_HEIGHT - theme.typography['p'].lineHeight - 3 * 4
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
