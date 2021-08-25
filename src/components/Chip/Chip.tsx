import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { css, useTheme } from 'styled-components';

import { Color, Colors } from '../../theme';
import Typography from '../Typography';

export const CHIP_HEIGHT = 32;

type ContainerProps = {
  isSelected?: boolean;
  variant?: 'color' | 'neutral';
};
const Container = styled(TouchableOpacity)<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  height: ${CHIP_HEIGHT}px;
  border-radius: ${CHIP_HEIGHT / 2}px;
  background: ${({ theme, variant }) =>
    (variant === 'neutral'
      ? theme.name === 'light'
        ? Colors.white
        : Colors.black
      : theme.colors.main.secondary
    ).toString()};
  ${({ isSelected, theme }) =>
    isSelected
      ? css`
          box-shadow: 4px 4px
            ${(theme.name === 'light'
              ? new Color({ ...Colors.black, opacity: 0.1 })
              : new Color({ r: 30, g: 30, b: 30 })
            ).toString()};
        `
      : ''}
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
