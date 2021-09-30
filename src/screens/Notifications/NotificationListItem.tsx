import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import Chip from '../../components/Chip';
import Column from '../../components/Column';
import ProfilePhoto from '../../components/ProfilePhoto';
import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import type { NotificationListItemFragment } from '../../generated/graphql';
import { Notification_Response } from '../../generated/graphql';
import { useNotificationActions } from './Actions/useNotificationActions';
import { getNotificationMessage } from './utils';

type Props = {
  notification: NotificationListItemFragment;
};

const Notification: React.FC<Props> = ({ notification }) => {
  const theme = useTheme();

  const [accept, decline, { loading, error }] =
    useNotificationActions(notification);

  const { connection, transaction, createdAt, actionable, response } =
    notification;

  const user = transaction ? transaction.p2p?.sender : connection?.sender;

  return (
    <>
      <Row fullWidth>
        {user && (
          <>
            <ProfilePhoto size={40} uri={user.profilePhotoUrl} />
            <Spacer width={16} />
          </>
        )}
        <Column fullWidth>
          <Typography tag="p" textAlign="left">
            {getNotificationMessage(notification)}
          </Typography>
          <Spacer height={4} />
          <Row justifyContent="space-between" fullWidth>
            <Typography tag="p" color={theme.colors.text.secondary}>
              {new Date(createdAt).toDateString()}
            </Typography>
            {response ? (
              <Typography
                tag="p"
                color={
                  response === Notification_Response.Accepted
                    ? theme.colors.success.primary
                    : theme.colors.error.primary
                }
              >
                {response === Notification_Response.Accepted
                  ? 'Accepted'
                  : 'Declined'}
              </Typography>
            ) : loading ? (
              <ActivityIndicator
                color={theme.colors.main.secondary.toString()}
              />
            ) : null}
          </Row>
        </Column>
      </Row>
      {actionable && !response && !loading && !error && (
        <>
          <Spacer height={4} />
          <Row justifyContent="space-around" fullWidth>
            <Chip onPress={decline}>Decline</Chip>
            <Chip onPress={accept}>Accept</Chip>
          </Row>
        </>
      )}
    </>
  );
};

export default Notification;
