import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import Column from '../../components/Column';
import Error from '../../components/Error';
import FinalBlock from '../../components/FinalBlock';
import { LoadingList } from '../../components/Loading';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import NotificationIcon from '../../icons/NotificationIcon';
import { RAIL_SPACING } from '../../styles/spacing';
import NotificationListItem from './NotificationListItem';
import { useNotifications } from './useNotifications';

const TOP_SPACING = 16;
const HEADER_TAG = 'h2';

const { width, height } = Dimensions.get('window');

const Container = styled(Column)`
  padding: ${TOP_SPACING}px ${RAIL_SPACING}px 0;
  height: ${height - TOP_SPACING}px;
`;

const ListItemContainer = styled(View)`
  width: ${width - 2 * RAIL_SPACING}px;
`;

const FullHeightContainer = styled(Column)`
  height: ${({ theme }) =>
    height - TOP_SPACING - theme.typography[HEADER_TAG].lineHeight}px;
`;

const Notifications: React.FC = () => {
  const { bottom } = useSafeAreaInsets();

  const { data, loading, error, networkStatus, onNext, onRefresh } =
    useNotifications();

  const notifications = data?.getNotifications.notifications;

  return (
    <Screen>
      <Container>
        {notifications ? (
          notifications.length > 0 ? (
            <FlatList
              data={data.getNotifications.notifications}
              keyExtractor={(notification) => notification._id}
              refreshing={networkStatus === 4}
              onRefresh={onRefresh}
              onEndReached={onNext}
              onEndReachedThreshold={0.7}
              renderItem={({ item, index }) => (
                <ListItemContainer>
                  {index > 0 && <Spacer height={16} />}
                  <NotificationListItem notification={item} />
                </ListItemContainer>
              )}
              ListFooterComponent={() => (
                <>
                  {loading && (
                    <Column alignItems="center" fullWidth>
                      <ActivityIndicator />
                    </Column>
                  )}
                  <FinalBlock bottomInset={bottom} />
                </>
              )}
            />
          ) : (
            <FullHeightContainer
              justifyContent="center"
              alignItems="center"
              fullWidth
            >
              <Typography tag="h3" textAlign="center">
                Nothing just yet
              </Typography>
              <Spacer height={16} />
              <NotificationIcon
                height={200}
                maxWidth={width - 2 * RAIL_SPACING}
              />
              <Spacer height={16} />
              <Typography tag="p" textAlign="center">
                We'll let you know when something interesting happens.
              </Typography>
            </FullHeightContainer>
          )
        ) : loading ? (
          <LoadingList width={width - 2 * RAIL_SPACING} numRows={10} />
        ) : error ? (
          <FullHeightContainer
            justifyContent="center"
            alignItems="center"
            fullWidth
          >
            <Error
              error={error}
              message="We can't get your notifications right now."
            />
          </FullHeightContainer>
        ) : null}
      </Container>
    </Screen>
  );
};

export default Notifications;
