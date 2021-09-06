import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'styled-components';

import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import UserListItem from '../../components/UserListItem';
import {
  FullP2PTransactionSourceFragment,
  P2P_Transaction_Action,
  P2P_Transaction_Type,
} from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/paramLists/HomeStack';
import { formatter } from '../../utils/money';

type Props = {
  amount: number;
  source: FullP2PTransactionSourceFragment;
  token: string;
};

const P2PTransactionInfo: React.FC<Props> = ({ amount, source, token }) => {
  const navigation =
    useNavigation<
      StackNavigationProp<HomeStackParamList, SCREENS.TRANSACTION_SUMMARY>
    >();

  const { colors } = useTheme();

  const { sender, recipient, action, note, type } = source;
  const otherUser = action === P2P_Transaction_Action.Sent ? recipient : sender;

  const goToUser = () =>
    navigation.push(SCREENS.USER_SUMMARY, { id: otherUser._id });

  return (
    <>
      <Typography tag="h5" color={colors.text.secondary}>
        {action === P2P_Transaction_Action.Sent ? 'Sent to' : 'Received from'}
      </Typography>
      <Spacer height={16} />
      <UserListItem user={otherUser} onPress={goToUser} />
      <Spacer height={16} />
      <Row justifyContent="space-between" fullWidth>
        <Typography tag="h5" color={colors.text.secondary}>
          Amount
        </Typography>
        <Typography tag="h5">{formatter.format(amount)}</Typography>
      </Row>
      <Spacer height={16} />
      <Row justifyContent="space-between" fullWidth>
        <Typography tag="h5" color={colors.text.secondary}>
          Type
        </Typography>
        <Typography tag="h5">
          {type === P2P_Transaction_Type.Send ? 'Send' : 'Request'}
        </Typography>
      </Row>
      <Spacer height={16} />
      <Row justifyContent="space-between" fullWidth>
        <Typography tag="h5" color={colors.text.secondary}>
          Token
        </Typography>
        <Typography tag="h5">{token}</Typography>
      </Row>
      {note ? (
        <>
          <Spacer height={16} />
          <Row justifyContent="space-between" fullWidth>
            <Typography tag="h5" color={colors.text.secondary}>
              Note
            </Typography>
            <Spacer width={16} />
            <Typography tag="h5">{note}</Typography>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default P2PTransactionInfo;
