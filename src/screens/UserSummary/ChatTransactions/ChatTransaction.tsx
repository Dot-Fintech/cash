import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Column from '../../../components/Column';
import Row from '../../../components/Row';
import Spacer from '../../../components/Spacer';
import Typography from '../../../components/Typography';
import {
  ChatTransactionSourceFragment,
  P2P_Transaction_Action,
  P2P_Transaction_Type,
  Scalars,
} from '../../../generated/graphql';
import { SCREENS } from '../../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../../navigation/utils/paramLists/HomeStack';
import { Color } from '../../../theme';
import { formatter } from '../../../utils/money';

const Container = styled(Column)`
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) =>
    new Color({ ...theme.colors.main.primary, opacity: 0.3 }).toString()};
`;

type Props = {
  amount: number;
  createdAt: Scalars['DateTime'];
  source: ChatTransactionSourceFragment;
  token: string;
};

const ChatTransaction: React.FC<Props> = ({
  amount,
  createdAt,
  source,
  token,
}) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const { colors } = useTheme();

  const { action, type } = source;

  const goToTransaction = () =>
    navigation.push(SCREENS.TRANSACTION_SUMMARY, { token });

  return (
    <Row
      justifyContent={
        action === P2P_Transaction_Action.Sent ? 'flex-end' : 'flex-start'
      }
      fullWidth
    >
      <TouchableOpacity onPress={goToTransaction}>
        <Container>
          <Row justifyContent="space-between" alignItems="center">
            <Typography tag="h5">{formatter.format(amount)}</Typography>
            <Spacer width={24} />
            <Typography tag="p" color={colors.main.secondary}>
              {type === P2P_Transaction_Type.Send ? 'Sent' : 'Requested'}
            </Typography>
          </Row>
          <Spacer height={8} />
          <Typography tag="p">{new Date(createdAt).toDateString()}</Typography>
        </Container>
      </TouchableOpacity>
    </Row>
  );
};

export default ChatTransaction;
