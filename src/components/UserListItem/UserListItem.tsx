import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Chip from '../../components/Chip';
import ProfilePhoto from '../../components/ProfilePhoto';
import {
  Connection_Status,
  UserListItemFragment,
} from '../../generated/graphql';
import { useSendConnectionRequestMutation } from '../../generated/graphql';
import Column from '../Column';
import Row from '../Row';
import Spacer from '../Spacer';
import Typography from '../Typography';
import Container from './Container';

const SpinnerWrapper = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 64px;
`;

export type Props = {
  user: UserListItemFragment;
  onPress?: (user: UserListItemFragment) => void;
  showConnectionStatus?: boolean;
};

const UserListItem: React.FC<Props> = ({
  user,
  onPress,
  showConnectionStatus,
}) => {
  const theme = useTheme();

  const [sendConnectionRequest, { data, loading, error }] =
    useSendConnectionRequestMutation();

  const handleUserClick = () => onPress?.(user);

  const handleConnectClick = () => {
    sendConnectionRequest({ variables: { data: { recipientId: user._id } } });
  };

  const { firstName, lastName, username, profilePhotoUrl, connectionStatus } =
    user;

  return (
    <Row alignItems="center" fullWidth>
      <Container
        onPress={onPress ? handleUserClick : undefined}
        disabled={!onPress}
      >
        <ProfilePhoto size={40} uri={profilePhotoUrl} />
        <Spacer width={8} />
        <Column>
          <Typography tag="h6">
            {firstName} {lastName}
          </Typography>
          <Typography tag="p" color={theme.colors.main.secondary}>
            @{username}
          </Typography>
        </Column>
      </Container>
      {showConnectionStatus && (
        <>
          <Spacer width={8} />
          {data ? (
            <Typography tag="p" textAlign="center">
              Request Sent
            </Typography>
          ) : loading ? (
            <SpinnerWrapper>
              <ActivityIndicator
                color={theme.colors.main.secondary.toString()}
              />
            </SpinnerWrapper>
          ) : error ? (
            <Typography
              tag="p"
              textAlign="center"
              color={theme.colors.error.primary}
            >
              Something's wrong
            </Typography>
          ) : connectionStatus === Connection_Status.Disconnected ? (
            <Chip isSelected onPress={handleConnectClick}>
              Connect
            </Chip>
          ) : connectionStatus === Connection_Status.Pending ? (
            <Typography tag="p" textAlign="center">
              Connection Pending
            </Typography>
          ) : connectionStatus === Connection_Status.Connected ? (
            <Typography tag="p" color={theme.colors.main.secondary}>
              Connected
            </Typography>
          ) : null}
        </>
      )}
    </Row>
  );
};

export default UserListItem;
