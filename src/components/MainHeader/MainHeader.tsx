import { Ionicons } from '@expo/vector-icons';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import { SCREENS } from '../../navigation/utils/enums/screens';
import { Color, Colors } from '../../theme';
import Row from '../Row';

const VERTICAL_PADDING = 4;
const ICON_SIZE = 32;
export const HEADER_HEIGHT = ICON_SIZE + 2 * VERTICAL_PADDING;

type ContainerProps = {
  insetTop: number;
};
const Container = styled(Row)<ContainerProps>`
  position: absolute;
  top: ${({ insetTop }) => insetTop}px;
  padding: ${VERTICAL_PADDING}px 8px;
  background-color: ${Colors.transparent.toString()};
`;

type Props = StackHeaderProps & {
  iconColor: Color;
};

const MainHeader: React.FC<Props> = ({ iconColor, navigation }) => {
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
