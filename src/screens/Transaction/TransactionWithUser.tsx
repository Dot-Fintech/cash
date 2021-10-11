import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
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
import { LoadingBox } from '../../components/Loading';
import Numberpad from '../../components/Numberpad';
import Pill from '../../components/Pill';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import TransactionSuccess from '../../components/TransactionSuccess';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import type { FullTransactionFragment } from '../../generated/graphql';
import {
  P2P_Transaction_Type,
  useGetUserFromUsernameLazyQuery,
} from '../../generated/graphql';
import { TAB_BAR_HEIGHT } from '../../navigation/MainTabs/TabBar';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/paramLists/HomeStack';
import { RAIL_SPACING } from '../../styles/spacing';
import { formatter } from '../../utils/money';
import { validateTransaction } from '../Money/utils';
import FilledUser from './fields/FilledUser';
import { NAME_TAG, USERNAME_TAG } from './fields/FilledUser/FilledUser';
import NoteField from './fields/Note';
import { FormValues } from './types';
import {
  buildSuccessDescription,
  useRequestEmoney,
  useSendEmoney,
} from './utils';

const Container = styled(Column)`
  position: relative;
  padding: 0 ${RAIL_SPACING}px;
  height: 100%;
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
`;

type AbsoluteContainerProps = {
  bottomInset: number;
};
const AbsoluteContainer = styled(Column)<AbsoluteContainerProps>`
  position: absolute;
  bottom: ${({ bottomInset }) => bottomInset + TAB_BAR_HEIGHT + 16}px; ;
`;

const ActionPill = styled(Pill)`
  min-width: 100px;
`;

const initialFormValues: FormValues = {
  note: '',
};

const TransactionWithUser: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<HomeStackParamList, SCREENS.TRANSACTION_WITH_USER>
    >();

  const route =
    useRoute<RouteProp<HomeStackParamList, SCREENS.TRANSACTION_WITH_USER>>();

  const theme = useTheme();

  const { bottom } = useSafeAreaInsets();

  const { user } = useContext(UserContext);

  const [getUserFromUsername, { data, loading, error }] =
    useGetUserFromUsernameLazyQuery();

  const { username, type } = route.params;

  useEffect(() => {
    getUserFromUsername({
      variables: { data: { username } },
    });
  }, [username]);

  const [send, sendResult] = useSendEmoney();
  const [request, requestResult] = useRequestEmoney();

  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState<FullTransactionFragment>();

  const selectedUser = data?.getUserFromUsername;

  const goBack = () => navigation.pop();

  const handleSubmit = async ({ note }: FormValues) => {
    if (validateTransaction({ amount, type, user }) && selectedUser) {
      const args = {
        amount,
        note,
        recipientId: selectedUser._id,
      };
      const { data, errors } =
        type === P2P_Transaction_Type.Request
          ? await request(args)
          : await send(args);
      if (data) {
        setResult(data);
      } else if (errors) {
        Alert.alert('Something went wrong.', errors[0].message);
      }
    }
  };

  const handleComplete = () => navigation.navigate(SCREENS.HOME);

  const actionWord = type === P2P_Transaction_Type.Request ? 'Request' : 'Send';

  return !result ? (
    <Screen>
      <Container alignItems="center">
        <Column fullWidth>
          <TouchableOpacity onPress={goBack}>
            <Ionicons name="arrow-back" size={32} />
          </TouchableOpacity>
        </Column>
        <Spacer height={8} />
        <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
          {(props) => (
            <>
              {data ? (
                <FilledUser user={data.getUserFromUsername} />
              ) : loading ? (
                <LoadingBox
                  width={200}
                  height={
                    theme.typography[NAME_TAG].lineHeight +
                    theme.typography[USERNAME_TAG].lineHeight
                  }
                />
              ) : error ? (
                <Typography tag="h5">We couldn't get that user</Typography>
              ) : null}
              <Spacer height={16} />
              <NoteField hideField={false} {...props} />
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
                  {sendResult.loading || requestResult.loading ? (
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
            </>
          )}
        </Formik>
      </Container>
    </Screen>
  ) : (
    <TransactionSuccess
      description={buildSuccessDescription({
        recipientName: `${selectedUser?.firstName}\u00a0${selectedUser?.lastName}`,
        amount,
        type,
      })}
      type={type}
      onComplete={handleComplete}
    />
  );
};

export default TransactionWithUser;
