import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import styled, { useTheme } from 'styled-components';

import { Colors } from '../../theme';
import { IconName } from '../../utils/types/Ionicons';
import Spacer from '../Spacer';
import Typography from '../Typography';

const MONEY_ICON_SIZE = 40;

const MoneyWrapper = styled(LinearGradient)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${MONEY_ICON_SIZE}px;
  height: ${MONEY_ICON_SIZE}px;
  border-radius: ${MONEY_ICON_SIZE / 2}px;
`;

type Props = {
  name: IconName | 'money';
  focused: boolean;
  size: number;
};

const TabBarIcon: React.FC<Props> = ({ focused, name, size }) => {
  const theme = useTheme();

  return name !== 'money' ? (
    <Ionicons
      name={name}
      size={size}
      color={
        focused
          ? theme.colors.main.secondary.toString()
          : theme.colors.text.primary.toString()
      }
    />
  ) : (
    <MoneyWrapper
      colors={
        focused
          ? [
              theme.colors.main.primary.toString(),
              theme.colors.main.secondary.toString(),
            ]
          : [Colors.white.toString(), Colors.white.toString()]
      }
    >
      <Spacer width={2} />
      <Typography
        tag="h4"
        color={focused ? Colors.white : theme.colors.text.primary}
      >
        $
      </Typography>
    </MoneyWrapper>
  );
};

export default TabBarIcon;
