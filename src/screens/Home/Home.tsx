import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SlidingUpPanel from 'rn-sliding-up-panel';
import styled, { useTheme } from 'styled-components';

import Column from '../../components/Column';
import MainHeader, { MAIN_HEADER_HEIGHT } from '../../components/MainHeader';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { UserContext } from '../../context/user/state';
import { UserListItemFragment } from '../../generated/graphql';
import { TAB_BAR_HEIGHT } from '../../navigation/MainTabs/TabBar';
import { SCREENS } from '../../navigation/utils/enums/screens';
import { HomeStackParamList } from '../../navigation/utils/paramLists/HomeStack';
import { RAIL_SPACING } from '../../styles/spacing';
import { Color } from '../../theme';
import { formatter } from '../../utils/money';
import People from './People';
import Transactions from './Transactions';

const INITIAL_PANEL_HEIGHT = 200;

const Container = styled(Column)`
  padding: 8px ${RAIL_SPACING}px 0;
`;

const TransactionContainer = styled(Column)`
  height: 100%;
  padding: 16px 0;
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
  border-radius: 24px;
  box-shadow: 0px -5px 2px ${({ theme }) => new Color({ ...theme.colors.text.primary, opacity: 0.125 }).toString()};
`;

const TAB_HEIGHT = 6;
const Tab = styled(View)`
  width: 100px;
  height: ${TAB_HEIGHT}px;
  border-radius: ${TAB_HEIGHT / 2}px;
  background-color: ${({ theme }) =>
    theme.colors.background.secondary.toString()};
`;

const Home: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, SCREENS.HOME>>();

  const theme = useTheme();

  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const { user } = useContext(UserContext);

  const goToUser = (user: UserListItemFragment) =>
    navigation.push(SCREENS.USER_SUMMARY, { username: user.username });

  const draggableHeight = height - top - MAIN_HEADER_HEIGHT - 8;

  return (
    <Screen>
      <MainHeader iconColor={theme.colors.text.primary} />
      <Container>
        <Column alignItems="center" fullWidth>
          <Typography tag="h6">Welcome back, {user?.firstName}</Typography>
          <Spacer height={16} />
          <Typography tag="h2">
            {formatter.format(user?.primaryAccount.balance ?? 0)}
          </Typography>
          {user?.primaryAccount.frozen && (
            <>
              <Spacer height={8} />
              <Ionicons name="snow" size={36} />
            </>
          )}
        </Column>
        <Spacer height={16} />
        <People goToUser={goToUser} />
      </Container>
      <SlidingUpPanel
        draggableRange={{
          top: draggableHeight,
          bottom: bottom + TAB_BAR_HEIGHT + INITIAL_PANEL_HEIGHT,
        }}
        animatedValue={new Animated.Value(INITIAL_PANEL_HEIGHT)}
        backdropOpacity={0.2}
        snappingPoints={[200]}
        height={draggableHeight}
        friction={0.9}
      >
        <TransactionContainer>
          <Column alignItems="center" fullWidth>
            <Tab />
          </Column>
          <Spacer height={16} />
          <Transactions />
        </TransactionContainer>
      </SlidingUpPanel>
    </Screen>
  );
};

export default Home;
