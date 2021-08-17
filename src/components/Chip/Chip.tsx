import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { useTheme } from 'styled-components';

import { Color, Colors } from '../../theme';
import Typography from '../Typography';

const HEIGHT = 32;

type ContainerProps = {
  isSelected?: boolean;
  variant?: 'color' | 'neutral';
};
const Container = styled(TouchableOpacity)<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 8px;
  height: ${HEIGHT}px;
  border-radius: ${HEIGHT / 2}px;
  background: ${({ theme, variant }) =>
    (variant === 'neutral'
      ? theme.name === 'light'
        ? Colors.white
        : Colors.black
      : theme.colors.main.secondary
    ).toString()};
  box-shadow: ${({ isSelected, theme }) =>
    isSelected
      ? `4px 4px ${(theme.name === 'light'
          ? new Color({ ...Colors.black, opacity: 0.1 })
          : new Color({ r: 30, g: 30, b: 30 })
        ).toString()}`
      : 'none'};
`;

type Props = TouchableOpacityProps & ContainerProps;

const Chip: React.FC<Props> = ({ children, variant = 'neutral', ...props }) => {
  const theme = useTheme();

  return (
    <Container {...props} variant={variant}>
      <Typography
        tag="h6"
        color={
          variant === 'neutral'
            ? theme.colors.main.secondary
            : theme.name === 'light'
            ? Colors.white
            : Colors.black
        }
      >
        {children}
      </Typography>
    </Container>
  );
};

export default Chip;
