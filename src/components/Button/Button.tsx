import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components';

import { Color } from '../../theme/colors/types';
import { useButtonLinearGradient } from './utils';

const MIN_HEIGHT = 40;

type ContainerProps = {
  width?: number;
  height?: number;
};
const Container = styled(LinearGradient)<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ width }) => (width ? `width: ${width}px;` : '')}
  ${({ height }) => (height ? `height: ${height}px;` : '')}

  min-width: 64px;
  min-height: ${MIN_HEIGHT}px;
  border-radius: ${({ height }) => (height ? height / 2 : MIN_HEIGHT / 2)}px;
  border: none;
  padding: 8px;
`;

type TextProps = {
  disabled?: boolean;
};
const ButtonText = styled(Text)<TextProps>`
  font-family: SourceSansPro_400Regular;
  color: ${({ disabled, theme }) =>
    disabled
      ? new Color({
          ...theme.colors.text.primary,
          opacity: 0.5,
        }).toString()
      : theme.colors.text.primary.toString()};
  font-size: 18px;
  line-height: 18px;
  margin: 0;
  padding: 0;
`;

type Props = TouchableOpacityProps &
  ContainerProps &
  TextProps & {
    children: string;
    color?: Color;
  };

const Button: React.FC<Props> = ({ children, color, ...props }) => {
  const { first, second } = useButtonLinearGradient();

  return (
    <TouchableOpacity {...props}>
      <Container
        colors={
          color ? [color.toString()] : [first.toString(), second.toString()]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <ButtonText disabled={props.disabled}>{children}</ButtonText>
      </Container>
    </TouchableOpacity>
  );
};

export default Button;
