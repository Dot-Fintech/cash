import { Column, Row, Spacer, Typography } from '@dot-fintech/web-ui';
import UserListItem from 'components/UserListItem';
import {
  FullP2PTransactionSourceFragment,
  P2P_Transaction_Action,
  P2P_Transaction_Type,
} from 'generated/graphql';
import { BASE_ROUTES } from 'pages/utils/routes';
import React from 'react';
import { useHistory } from 'react-router';
import styled, { useTheme } from 'styled-components';
import { formatter } from 'utils/money';

const Container = styled.button`
  width: 100%;
  border: none;
  background: none;
  padding: 0;
`;

type Props = {
  amount: number;
  source: FullP2PTransactionSourceFragment;
  token: string;
};

const P2PTransactionListItem: React.FC<Props> = ({ amount, source, token }) => {
  const history = useHistory();

  const { colors } = useTheme();

  const { sender, recipient, action, type } = source;

  const handleClick = () => {
    history.push(`${BASE_ROUTES.P2P_TRANSACTION_SUMMARY}/${token}`);
  };

  const subText =
    type === P2P_Transaction_Type.Send
      ? action === P2P_Transaction_Action.Sent
        ? 'Sent'
        : 'Received'
      : 'Requested';
  const otherUser = action === P2P_Transaction_Action.Sent ? recipient : sender;

  return (
    <Container onClick={handleClick}>
      <Row alignItems="center" fullWidth>
        <UserListItem user={otherUser} />
        <Spacer width={8} />
        <Column alignItems="flex-end">
          <Typography
            as="h5"
            textColor={
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
          <Typography as="p">{subText}</Typography>
        </Column>
      </Row>
    </Container>
  );
};

export default P2PTransactionListItem;
