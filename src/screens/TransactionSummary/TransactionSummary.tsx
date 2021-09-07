import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Button from '../../components/Button';
import Column from '../../components/Column';
import { LoadingList } from '../../components/Loading';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { useGetTransactionFromTokenLazyQuery } from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/paramLists/HomeStack';
import BankTransactionInfo from './BankTransactionInfo';
import P2PTransactionInfo from './P2PTransactionInfo';

const RAIL_SPACING = 16;

const Container = styled(Column)`
  padding: 16px ${RAIL_SPACING}px 0;
`;

const TransactionSummary: React.FC = () => {
  const route =
    useRoute<RouteProp<HomeStackParamList, SCREENS.TRANSACTION_SUMMARY>>();

  const navigation =
    useNavigation<
      StackNavigationProp<HomeStackParamList, SCREENS.TRANSACTION_SUMMARY>
    >();

  const theme = useTheme();

  const [getTransaction, { data, loading, error }] =
    useGetTransactionFromTokenLazyQuery();

  useEffect(() => {
    getTransaction({ variables: { data: { token: route.params.token } } });
  }, []);

  const goBack = () => navigation.pop();

  return (
    <Screen>
      <Container>
        <Row alignItems="center" fullWidth>
          <Button onPress={goBack}>
            <Ionicons
              name="arrow-back"
              size={32}
              color={theme.colors.text.primary.toString()}
            />
          </Button>
          <Spacer width={16} />
          <Typography tag="h2">Transaction</Typography>
        </Row>
        <Spacer height={16} />
        {data ? (
          data.getTransactionFromToken.bank ? (
            <BankTransactionInfo
              {...data.getTransactionFromToken}
              source={data.getTransactionFromToken.bank}
            />
          ) : data.getTransactionFromToken.p2p ? (
            <P2PTransactionInfo
              {...data.getTransactionFromToken}
              source={data.getTransactionFromToken.p2p}
            />
          ) : null
        ) : loading ? (
          <LoadingList
            width={Dimensions.get('window').width - 2 * RAIL_SPACING}
            numRows={6}
          />
        ) : error ? (
          <Column alignItems="center" fullWidth>
            <Typography tag="h4" textAlign="center">
              Something went wrong
            </Typography>
            <Spacer height={16} />
            <Typography tag="h5" textAlign="center">
              We could not fetch the transfer
            </Typography>
            <Spacer height={16} />
            <Typography
              tag="p"
              textAlign="center"
              color={theme.colors.error.primary}
            >
              {error.message}
            </Typography>
          </Column>
        ) : null}
      </Container>
    </Screen>
  );
};

export default TransactionSummary;
