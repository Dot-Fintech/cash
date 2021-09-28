import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import styled, { useTheme } from 'styled-components';

import { BOTTOM_BLOCK_BORDER_RADIUS } from '../../../components/BottomBlock';
import Chip from '../../../components/Chip';
import Row from '../../../components/Row';
import Spacer from '../../../components/Spacer';
import Typography from '../../../components/Typography';
import {
  Connection_Status,
  useDisconnectMutation,
  UserListItemFragment,
  useSendConnectionRequestMutation,
} from '../../../generated/graphql';
import { Color, Colors } from '../../../theme';

export const CONNECTION_BANNER_HEIGHT = 48;
const RAIL_SPACING = 16;

const Container = styled(Row)`
  padding: 8px ${RAIL_SPACING}px;
  height: ${CONNECTION_BANNER_HEIGHT}px;
  border-radius: ${BOTTOM_BLOCK_BORDER_RADIUS}px;
  background-color: ${({ theme }) =>
    new Color({ ...theme.colors.main.primary, opacity: 0.3 }).toString()};
`;

type Action = {
  handleClick: () => Promise<void>;
  label: string;
};

type Props = {
  user: UserListItemFragment;
};

const ConnectionBanner: React.FC<Props> = ({ user }) => {
  const theme = useTheme();

  const [sendConnectionRequest, sendConnectionRequestResult] =
    useSendConnectionRequestMutation();

  const [disconnect, disconnectResult] = useDisconnectMutation();

  const { connectionStatus } = user;

  const message =
    sendConnectionRequestResult.data ||
    connectionStatus === Connection_Status.Pending
      ? `Your connection is pending approval`
      : disconnectResult.data
      ? `You two are no longer connected`
      : connectionStatus === Connection_Status.Connected
      ? 'You two are connected'
      : connectionStatus === Connection_Status.Disconnected
      ? "You two aren't connected yet"
      : undefined;

  const action: Action | undefined = sendConnectionRequestResult.data
    ? undefined
    : connectionStatus === Connection_Status.Connected
    ? {
        handleClick: async () => {
          const { errors } = await disconnect({
            variables: { data: { userId: user._id } },
          });
          if (errors) {
            Alert.alert(
              `Something went wrong. We couldn't disconnect you from that user. ${errors[0].message}`,
            );
          }
        },
        label: 'Disconnect',
      }
    : connectionStatus === Connection_Status.Disconnected
    ? {
        handleClick: async () => {
          const { errors } = await sendConnectionRequest({
            variables: { data: { recipientId: user._id } },
          });
          if (errors) {
            Alert.alert(
              `Something went wrong. We couldn't send a connection request to that user. ${errors[0].message}`,
            );
          }
        },
        label: 'Connect',
      }
    : undefined;

  const loading =
    sendConnectionRequestResult.loading || disconnectResult.loading;

  return (
    <Container
      justifyContent={action ? 'space-between' : 'center'}
      alignItems="center"
      fullWidth
    >
      <Typography
        tag="p"
        color={theme.name === 'light' ? Colors.black : Colors.white}
      >
        {message}
      </Typography>
      {action && (
        <>
          <Spacer width={16} />
          {loading ? (
            <ActivityIndicator color={theme.colors.main.secondary.toString()} />
          ) : (
            <Chip onPress={action.handleClick} isSelected>
              {action.label}
            </Chip>
          )}
        </>
      )}
    </Container>
  );
};

export default ConnectionBanner;
