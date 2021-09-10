import React from 'react';
import { Dimensions } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Column from '../../components/Column';
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

const FullHeightContainer = styled(Column)`
  height: ${({ theme }) =>
    height - TOP_SPACING - theme.typography[HEADER_TAG].lineHeight}px;
`;

const Notifications: React.FC = () => {
  const theme = useTheme();

  const { data, loading, error } = useNotifications();

  const notifications = data?.getNotifications.notifications;

  return (
    <Screen>
      <Container>
        {data ? (
          notifications && notifications.length > 0 ? (
            data?.getNotifications.notifications.map((notification, index) => (
              <Column key={notification._id} fullWidth>
                {index > 0 && <Spacer height={16} />}
                <NotificationListItem notification={notification} />
              </Column>
            ))
          ) : (
            <FullHeightContainer
              justifyContent="center"
              alignItems="center"
              fullWidth
            >
              <Typography tag="h3">Nothing just yet</Typography>
              <Spacer height={16} />
              <NotificationIcon
                height={200}
                maxWidth={width - 2 * RAIL_SPACING}
              />
              <Spacer height={16} />
              <Typography tag="p" textAlign="center">
                We'll let you know when something interesting happens
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
            <Typography tag="h4" textAlign="center">
              Something went wrong
            </Typography>
            <Spacer height={16} />
            <Typography tag="h5" textAlign="center">
              We weren't able to fetch your notifications
            </Typography>
            <Spacer height={16} />
            <Typography
              tag="p"
              textAlign="center"
              color={theme.colors.error.primary}
            >
              {error.message}
            </Typography>
          </FullHeightContainer>
        ) : null}
      </Container>
    </Screen>
  );
};

export default Notifications;
