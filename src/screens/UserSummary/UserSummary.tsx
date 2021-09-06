import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components';

import BottomBlock, {
  BOTTOM_BLOCK_BORDER_RADIUS,
} from '../../components/BottomBlock';
import Button from '../../components/Button';
import Column from '../../components/Column';
import Pill from '../../components/Pill';
import ProfilePhoto from '../../components/ProfilePhoto';
import Row from '../../components/Row';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import TopBlock, { TOP_BLOCK_HEIGHT } from '../../components/TopBlock';
import Typography from '../../components/Typography';
import {
  P2P_Transaction_Type,
  useGetUserFromUsernameLazyQuery,
} from '../../generated/graphql';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/paramLists/HomeStack';
import { RAIL_SPACING } from '../../styles/spacing';
import { Colors } from '../../theme';
import ChatTransactions from './ChatTransactions';
import ConnectionBanner, { CONNECTION_BANNER_HEIGHT } from './ConnectionBanner';

const BANNER_SPACING = 16;

const containerStyles = css`
  padding: 0 ${RAIL_SPACING}px;
`;

type TopContainerProps = {
  topInset: number;
};
const TopContainer = styled(Column)<TopContainerProps>`
  ${containerStyles}
  padding-top: ${({ topInset }) => topInset}px;
  height: ${TOP_BLOCK_HEIGHT - BOTTOM_BLOCK_BORDER_RADIUS}px;
`;

const TopRowItemWrapper = styled(Column)`
  width: 33.33.%;
`;

const InteractPill = styled(Pill)`
  width: 100px;
`;

const TransactionsWrapper = styled(Column)`
  ${containerStyles}
  height: ${Dimensions.get('window').height -
  TOP_BLOCK_HEIGHT -
  (CONNECTION_BANNER_HEIGHT - BOTTOM_BLOCK_BORDER_RADIUS) -
  BANNER_SPACING}px;
`;

const UserSummary: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParamList, SCREENS.USER_SUMMARY>>();

  const navigation =
    useNavigation<
      StackNavigationProp<HomeStackParamList, SCREENS.USER_SUMMARY>
    >();

  const { username } = route.params;

  const { top } = useSafeAreaInsets();

  const [getUserFromUsername, { data, error }] =
    useGetUserFromUsernameLazyQuery();

  useEffect(() => {
    getUserFromUsername({
      variables: { data: { username } },
    });
  }, [username]);

  if (error) {
    navigation.pop();
  }

  const goBack = () => navigation.pop();

  const goToRequest = () => {
    if (data) {
      navigation.push(SCREENS.TRANSACTION_WITH_USER, {
        userId: data?.getUserFromUsername._id,
        type: P2P_Transaction_Type.Request,
      });
    }
  };

  const goToSend = () => {
    if (data) {
      navigation.push(SCREENS.TRANSACTION_WITH_USER, {
        userId: data?.getUserFromUsername._id,
        type: P2P_Transaction_Type.Send,
      });
    }
  };

  const user = data?.getUserFromUsername;

  return (
    <Screen>
      <>
        <TopBlock>
          <TopContainer
            topInset={top}
            justifyContent="center"
            alignItems="center"
          >
            <Row justifyContent="space-between" fullWidth>
              <TopRowItemWrapper>
                <Button onPress={goBack}>
                  <Ionicons
                    size={32}
                    name="arrow-back"
                    color={Colors.white.toString()}
                  />
                </Button>
              </TopRowItemWrapper>
              <TopRowItemWrapper alignItems="center">
                <ProfilePhoto
                  size={80}
                  uri={user?.profilePhotoUrl}
                  style="light"
                />
              </TopRowItemWrapper>
              <TopRowItemWrapper />
            </Row>
            <Spacer height={8} />
            <Typography tag="h5" color={Colors.white} textAlign="center">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Spacer height={8} />
            <Typography tag="h6" color={Colors.white}>
              @{user?.username}
            </Typography>
            <Spacer height={8} />
            <Row justifyContent="space-around" fullWidth>
              <InteractPill onPress={goToRequest} variant="translucent">
                Request
              </InteractPill>
              <InteractPill onPress={goToSend} variant="translucent">
                Send
              </InteractPill>
            </Row>
          </TopContainer>
        </TopBlock>
        <BottomBlock>
          {user && <ConnectionBanner user={user} />}
          <Spacer height={BANNER_SPACING} />
          <TransactionsWrapper>
            {user && <ChatTransactions user={user} />}
          </TransactionsWrapper>
        </BottomBlock>
      </>
    </Screen>
  );
};

export default UserSummary;
