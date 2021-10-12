import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components';

import Column from '../../components/Column';
import Numberpad from '../../components/Numberpad';
import Pill from '../../components/Pill';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import TransactionSuccess from '../../components/TransactionSuccess';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import {
  Bank_Transaction_Type,
  FullTransactionFragment,
} from '../../generated/graphql';
import { TAB_BAR_HEIGHT } from '../../navigation/MainTabs/TabBar';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { BankingStackParamList } from '../../navigation/utils/paramLists/BankingStack';
import { RAIL_SPACING } from '../../styles/spacing';
import { formatter } from '../../utils/money';
import { validateBankTransaction } from '../Money/utils';
import { FormValues } from './types';
import { buildSuccessDescription, useDeposit, useWithdraw } from './utils/bank';

const Container = styled(Column)`
  position: relative;
  padding: 0 ${RAIL_SPACING}px;
  height: 100%;
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
`;

type AbsoluteContainerProps = { bottomInset: number };
const AbsoluteContainer = styled(Column)<AbsoluteContainerProps>`
  position: absolute;
  bottom: ${({ bottomInset }) => bottomInset + TAB_BAR_HEIGHT + 16}px; ;
`;

const ActionPill = styled(Pill)`
  min-width: 100px;
`;

const TransactionWithCard: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<BankingStackParamList, SCREENS.TRANSACTION_WITH_CARD>
    >();

  const route =
    useRoute<RouteProp<BankingStackParamList, SCREENS.TRANSACTION_WITH_CARD>>();

  const theme = useTheme();

  const { bottom } = useSafeAreaInsets();

  const { user } = useContext(UserContext);

  const { card, type } = route.params;

  const [deposit, depositResult] = useDeposit();
  const [withdraw, withdrawResult] = useWithdraw();

  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState<FullTransactionFragment>();

  const goBack = () => navigation.pop();

  const handleSubmit = async ({ note }: FormValues) => {
    if (validateBankTransaction({ amount, type, user }) && card) {
      const args = {
        amount,
        note,
        cardId: card._id,
      };
      const { data, errors } =
        type === Bank_Transaction_Type.Withdraw
          ? await withdraw(args)
          : await deposit(args);
      if (data) {
        setResult(data);
      } else if (errors) {
        Alert.alert('Something went wrong.', errors[0].message);
      }
    }
  };

  const handleComplete = () => navigation.navigate(SCREENS.BANKING);

  const actionWord =
    type === Bank_Transaction_Type.Withdraw ? 'Withdraw' : 'Deposit';

  return !result ? (
    <Screen>
      <Container alignItems="center">
        <Column fullWidth>
          <TouchableOpacity onPress={goBack}>
            <Ionicons name="arrow-back" size={32} />
          </TouchableOpacity>
        </Column>
        <Spacer height={8} />
        <Row></Row>
        <Spacer height={24} />
        <Row justifyContent="center" fullWidth>
          <Typography tag={amount < 1000 ? 'h1' : 'h2'}>
            {formatter.format(amount)}
          </Typography>
        </Row>
        <AbsoluteContainer bottomInset={bottom}>
          <Numberpad amount={amount} setAmount={setAmount} />
          <Spacer height={8} />
          <Row justifyContent="center" fullWidth>
            {withdrawResult.loading || depositResult.loading ? (
              <ActivityIndicator
                color={theme.colors.main.secondary.toString()}
              />
            ) : (
              <ActionPill
                onPress={
                  handleSubmit as unknown as (
                    e: NativeSyntheticEvent<NativeTouchEvent>,
                  ) => void
                }
              >
                {actionWord}
              </ActionPill>
            )}
          </Row>
        </AbsoluteContainer>
      </Container>
    </Screen>
  ) : (
    <TransactionSuccess
      description={buildSuccessDescription({
        cardLast4Digits: card.last4Digits,
        amount,
        transactionType: type,
      })}
      type={type}
      onComplete={handleComplete}
    />
  );
};

export default TransactionWithCard;
