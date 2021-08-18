import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React from 'react';
import { useTheme } from 'styled-components';

import Typography from '../Typography';

type Props = {
  text: string;
  focused: boolean;
  color: string;
  position: LabelPosition;
};

const TabBarLabel: React.FC<Props> = ({ focused, text }) => {
  const theme = useTheme();

  return (
    <Typography
      tag="sp"
      color={focused ? theme.colors.main.secondary : undefined}
    >
      {text}
    </Typography>
  );
};

export default TabBarLabel;
