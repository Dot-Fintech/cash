import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components';

import { NAVIGATORS } from '../../navigation/utils/enums/navigators';
import { SCREENS } from '../../navigation/utils/enums/screens';
import {
  BANKING_SCREENS,
  BankingStackParamList,
} from '../../navigation/utils/paramLists/BankingStack';
import { MainTabsParamList } from '../../navigation/utils/paramLists/MainTabs';
import { Color, Colors } from '../../theme';
import Row from '../Row';

const VERTICAL_PADDING = 4;
const ICON_SIZE = 32;
export const MAIN_HEADER_HEIGHT = ICON_SIZE + 2 * VERTICAL_PADDING;

type ContainerProps = { insetTop: number };
const Container = styled(Row)<ContainerProps>`
  min-height: ${MAIN_HEADER_HEIGHT}px;
  padding: ${VERTICAL_PADDING}px 16px;
  background-color: ${Colors.transparent.toString()};
`;

type Props = {
  iconColor?: Color;
};

const MainHeader: React.FC<Props> = ({ iconColor }) => {
  const theme = useTheme();

  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();

  const route =
    useRoute<
      RouteProp<
        MainTabsParamList & BankingStackParamList,
        keyof MainTabsParamList | keyof BankingStackParamList
      >
    >();

  const { top } = useSafeAreaInsets();

  const goToBanking = () => navigation.navigate(NAVIGATORS.BANKING_STACK);
  const goToScan = () => navigation.navigate(SCREENS.SCAN);
  const goToNotifications = () => navigation.navigate(SCREENS.NOTIFICATIONS);

  const baseIconColor = iconColor ? iconColor : theme.colors.text.primary;

  return (
    <Container
      insetTop={top}
      justifyContent="space-between"
      alignItems="center"
      fullWidth
    >
      <TouchableOpacity onPress={goToBanking}>
        <Ionicons
          name="card"
          color={(BANKING_SCREENS.includes(route.name)
            ? theme.colors.main.secondary
            : baseIconColor
          ).toString()}
          size={ICON_SIZE}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToScan}>
        <Ionicons
          name="camera"
          color={(route.name === SCREENS.SCAN
            ? theme.colors.main.secondary
            : baseIconColor
          ).toString()}
          size={ICON_SIZE}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToNotifications}>
        <Ionicons
          name="notifications"
          color={(route.name === SCREENS.NOTIFICATIONS
            ? theme.colors.main.secondary
            : baseIconColor
          ).toString()}
          size={ICON_SIZE}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default MainHeader;
