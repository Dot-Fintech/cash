import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { css, useTheme } from 'styled-components';

import BottomBlock from '../../components/BottomBlock';
import Column from '../../components/Column';
import Error from '../../components/Error';
import { LoadingList } from '../../components/Loading';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import TopBlock from '../../components/TopBlock';
import TransactionSuccess from '../../components/TransactionSuccess';
import Typography from '../../components/Typography';
import UserListItem from '../../components/UserListItem';
import {
  FullTransactionFragment,
  P2P_Transaction_Type,
  useInteractionsLazyQuery,
  UserListItemFragment,
} from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { MoneyStackParamList } from '../../navigation/utils/paramLists/MoneyStack';
import { RAIL_SPACING } from '../../styles/spacing';
import NoteField from './fields/Note';
import SearchField from './fields/Search';
import Header from './Header';
import { FormValues } from './types';
import {
  buildSuccessDescription,
  useRequestEmoney,
  useSendEmoney,
} from './utils';

const { width } = Dimensions.get('window');

const containerStyles = css`
  height: 100%;
  padding: 16px ${RAIL_SPACING}px;
`;

type TopContainerProps = {
  topInset: number;
};
const TopContainer = styled(Column)<TopContainerProps>`
  ${containerStyles}
  padding-top: ${({ topInset }) => `${topInset}px`};
`;

const BottomContainer = styled(Column)`
  ${containerStyles}
`;

const initialFormValues: FormValues = {
  search: '',
  note: '',
};

const TransactionWithAmount: React.FC = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<MoneyStackParamList, SCREENS.TRANSACTION_WITH_AMOUNT>
    >();

  const route =
    useRoute<RouteProp<MoneyStackParamList, SCREENS.TRANSACTION_WITH_AMOUNT>>();

  const { amount, type } = route.params;

  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  const [getInteractions, { data, loading, error }] =
    useInteractionsLazyQuery();

  useEffect(() => {
    getInteractions({
      variables: { pageData: { pageNumber: 0, pageSize: 5 } },
    });
  }, []);

  const [send, sendResult] = useSendEmoney();
  const [request, requestResult] = useRequestEmoney();

  const [selectedUser, setSelectedUser] = useState<UserListItemFragment>();
  const [result, setResult] = useState<FullTransactionFragment>();
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async ({ note }: FormValues) => {
    if (selectedUser?._id) {
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

  const handleUserClick = (user: UserListItemFragment) => {
    setSelectedUser(user);
  };

  const handleComplete = () => navigation.navigate(SCREENS.MONEY);

  return !result ? (
    <Screen>
      <TopBlock>
        <TopContainer topInset={top}>
          <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
            {(props) => (
              <>
                <Header
                  amount={amount}
                  type={type}
                  loading={sendResult.loading || requestResult.loading}
                  {...props}
                />
                <Spacer height={16} />
                <SearchField
                  type={type}
                  userState={[selectedUser, setSelectedUser]}
                  showResultsState={[showResults, setShowResults]}
                  variant="white"
                  {...props}
                />
                <Spacer height={16} />
                <NoteField hideField={showResults} variant="white" {...props} />
              </>
            )}
          </Formik>
        </TopContainer>
      </TopBlock>
      <BottomBlock>
        <BottomContainer>
          <Typography tag="h4" color={theme.colors.main.secondary}>
            Recents
          </Typography>
          <Spacer height={8} />
          {data ? (
            <FlatList
              data={data.getInteractions.interactions}
              keyExtractor={(interaction) => interaction._id}
              renderItem={({ item, index }) => (
                <>
                  {index > 0 && <Spacer height={8} />}
                  <UserListItem
                    user={item.otherUser}
                    onPress={handleUserClick}
                  />
                </>
              )}
            />
          ) : loading ? (
            <LoadingList width={width - 2 * RAIL_SPACING} numRows={5} />
          ) : error ? (
            <Column alignItems="center" fullWidth>
              <Error
                error={error}
                message="We can't get those users right now."
              />
            </Column>
          ) : null}
        </BottomContainer>
      </BottomBlock>
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

export default TransactionWithAmount;
