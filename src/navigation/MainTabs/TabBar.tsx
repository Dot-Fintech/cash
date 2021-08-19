import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components';

import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { Colors } from '../../theme';
import TabBarIcon from './TabBarIcon';
import { getTabBarIconName } from './utils';

type ContainerProps = {
  insetBottom: number;
};
const Container = styled(Row)<ContainerProps>`
  position: absolute;
  bottom: ${({ insetBottom }) => insetBottom}px;
  background-color: ${Colors.transparent.toString()};
  margin-bottom: 4px;
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
        const { options } = descriptors[route.key];

        const label = options.title;

        const isFocused = state.index === index;

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

        const iconName = getTabBarIconName(route.name);

        return label ? (
          <Tab
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {iconName && (
              <>
                <TabBarIcon name={iconName} focused={isFocused} />
                <Spacer height={4} />
              </>
            )}
            <Typography
              tag="sp"
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
