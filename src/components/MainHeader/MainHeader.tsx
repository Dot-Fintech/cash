import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import { SCREENS } from '../../navigation/utils/enums/screens';
import { MainTabsParamList } from '../../navigation/utils/paramLists/MainTabs';
import { Color, Colors } from '../../theme';
import Row from '../Row';

const VERTICAL_PADDING = 4;
const ICON_SIZE = 32;
export const MAIN_HEADER_HEIGHT = ICON_SIZE + 2 * VERTICAL_PADDING;

type ContainerProps = {
  insetTop: number;
};
const Container = styled(Row)<ContainerProps>`
  padding: ${VERTICAL_PADDING}px 8px;
  background-color: ${Colors.transparent.toString()};
`;

type Props = {
  iconColor: Color;
};

const MainHeader: React.FC<Props> = ({ iconColor }) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();

  const { top } = useSafeAreaInsets();

  const goToBanking = () => navigation.navigate(SCREENS.BANKING);
  const goToScan = () => navigation.navigate(SCREENS.SCAN);
  const goToNotifications = () => navigation.navigate(SCREENS.NOTIFICATIONS);

  return (
    <Container
      insetTop={top}
      justifyContent="space-between"
      alignItems="center"
      fullWidth
    >
      <TouchableOpacity onPress={goToBanking}>
        <Ionicons name="card" color={iconColor.toString()} size={ICON_SIZE} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToScan}>
        <Ionicons name="camera" color={iconColor.toString()} size={ICON_SIZE} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToNotifications}>
        <Ionicons
          name="notifications"
          color={iconColor.toString()}
          size={ICON_SIZE}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default MainHeader;
