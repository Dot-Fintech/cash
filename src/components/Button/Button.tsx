import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { css } from 'styled-components';

import { Color } from '../../theme/colors/types';
import { Colors } from '../../theme/utils/Colors';

type ContainerProps = {
  color?: Color;
  variant?: 'default' | 'lean';
  width?: number;
  height?: number;
};
const Container = styled(TouchableOpacity)<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ width }) => (width ? `width: ${width}px;` : '')}
  ${({ height }) => (height ? `height: ${height}px;` : '')}
  ${({ variant }) => css`
    min-width: ${variant === 'lean' ? 40 : 64}px;
    min-height: ${variant === 'lean' ? 24 : 40}px;
  `}

  border-radius: 4px;
  border: none;
  padding: ${({ variant }) => (variant === 'lean' ? 0 : '12px')};

  background-color: ${({ color, variant, theme }) =>
    color?.toString() ??
    (variant === 'lean'
      ? Colors.transparent.toString()
      : theme.colors.main.secondary.toString())};
`;

type TextProps = {
  disabled?: boolean;
};
const ButtonText = styled(Text)<TextProps>`
  font-family: SourceSansPro_400Regular;
  color: ${({ disabled, theme }) =>
    disabled
      ? new Color({
          ...theme.colors.background.primary,
          opacity: 0.5,
        }).toString()
      : theme.colors.background.primary.toString()};
  font-size: 18px;
  line-height: 18px;
  margin: 0;
`;

type Props = TouchableOpacityProps & ContainerProps & TextProps;

const Button: React.FC<Props> = ({ children, color, ...props }) => {
  return (
    <Container
      {...props}
      color={color}
      variant={typeof children === 'string' ? 'default' : 'lean'}
    >
      {typeof children === 'string' ? (
        <ButtonText disabled={props.disabled}>{children}</ButtonText>
      ) : (
        children
      )}
    </Container>
  );
};

export default Button;
