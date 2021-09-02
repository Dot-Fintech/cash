import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components';

import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { typography } from '../../theme';
import TabBarIcon, { TAB_BAR_ICON_SIZE } from './TabBarIcon';
import { getTabBarIconName } from './utils';

const PADDING_TOP = 8;
const LABEL_SPACING = 4;
const LABEL_TAG = 'sp';

export const TAB_BAR_HEIGHT =
  PADDING_TOP +
  TAB_BAR_ICON_SIZE +
  LABEL_SPACING +
  typography[LABEL_TAG].lineHeight;

type ContainerProps = {
  insetBottom: number;
};
const Container = styled(Row)<ContainerProps>`
  padding-bottom: ${({ insetBottom }) => insetBottom}px;
  padding-top: ${PADDING_TOP}px;
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
`;

const Tab = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useTheme();

  const { bottom } = useSafeAreaInsets();

  return (
    <Container insetBottom={bottom} justifyContent="space-around" fullWidth>
      {state.routes.map((route, index) => {
        const label = descriptors[route.key].options.title;
        const isFocused = state.index === index;
        const iconName = getTabBarIconName(route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return label ? (
          <Tab key={route.key} onPress={onPress} onLongPress={onLongPress}>
            {iconName && (
              <>
                <TabBarIcon name={iconName} focused={isFocused} />
                <Spacer height={LABEL_SPACING} />
              </>
            )}
            <Typography
              tag={LABEL_TAG}
              color={
                isFocused
                  ? theme.colors.main.secondary
                  : theme.colors.text.primary
              }
            >
              {label}
            </Typography>
          </Tab>
        ) : null;
      })}
    </Container>
  );
};

export default TabBar;
