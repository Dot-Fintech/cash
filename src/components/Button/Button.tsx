import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components';

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

  min-width: ${({ variant }) => (variant === 'lean' ? '0px' : '64px')};
  min-height: ${({ variant }) => (variant === 'lean' ? '0px' : '40px')};
  ${({ width }) => (width ? `width: ${width}px;` : '')}
  ${({ height }) => (height ? `height: ${height}px;` : '')}

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
  color: ${({ disabled }) =>
    disabled
      ? new Color({ ...Colors.white, opacity: 0.5 }).toString()
      : Colors.white.toString()};
  font-size: 18px;
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
