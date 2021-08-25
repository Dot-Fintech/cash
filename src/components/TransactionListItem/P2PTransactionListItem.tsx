import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components';

import UserListItem from '../../components/UserListItem';
import {
  FullP2PTransactionSourceFragment,
  P2P_Transaction_Action,
  P2P_Transaction_Type,
} from '../../generated/graphql';
import { formatter } from '../../utils/money';
import Column from '../Column';
import Row from '../Row';
import Spacer from '../Spacer';
import Typography from '../Typography';

const Container = styled(TouchableOpacity)`
  width: 100%;
  padding: 0;
`;

type Props = {
  amount: number;
  source: FullP2PTransactionSourceFragment;
  goToTransaction: () => void;
};

const P2PTransactionListItem: React.FC<Props> = ({
  amount,
  source,
  goToTransaction,
}) => {
  const { colors } = useTheme();

  const { sender, recipient, action, type } = source;

  const subText =
    type === P2P_Transaction_Type.Send
      ? action === P2P_Transaction_Action.Sent
        ? 'Sent'
        : 'Received'
      : 'Requested';
  const otherUser = action === P2P_Transaction_Action.Sent ? recipient : sender;

  return (
    <Container onPress={goToTransaction}>
      <Row justifyContent="space-between" alignItems="center" fullWidth>
        <UserListItem user={otherUser} />
        <Spacer width={8} />
        <Column alignItems="flex-end">
          <Typography
            tag="h5"
            color={
              action === P2P_Transaction_Action.Received &&
              type === P2P_Transaction_Type.Send
                ? colors.success.primary
                : colors.text.primary
            }
          >
            {`${
              action === P2P_Transaction_Action.Received &&
              type === P2P_Transaction_Type.Send
                ? '+'
                : ''
            }${formatter.format(amount)}`}
          </Typography>
          <Typography tag="p">{subText}</Typography>
        </Column>
      </Row>
    </Container>
  );
};

export default P2PTransactionListItem;
