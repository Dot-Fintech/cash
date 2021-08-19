import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import styled, { useTheme } from 'styled-components';

import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { Colors } from '../../theme';
import { IconName } from '../../utils/types/Ionicons';

const ICON_SIZE = 32;

const MoneyWrapper = styled(LinearGradient)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  border-radius: ${ICON_SIZE / 2}px;
  margin-bottom: 3px;
`;

type Props = {
  name: IconName | 'money';
  focused: boolean;
};

const TabBarIcon: React.FC<Props> = ({ focused, name }) => {
  const theme = useTheme();

  return name !== 'money' ? (
    <Ionicons
      name={name}
      size={ICON_SIZE}
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
          : [Colors.transparent.toString(), Colors.transparent.toString()]
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
