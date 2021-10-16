import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components';

import { useStyledLinearGradient } from '../../styles/linearGradient';
import { Colors } from '../../theme';
import { Color } from '../../theme/colors/types';

const MIN_HEIGHT = 40;

type ContainerProps = {
  width?: number;
  height?: number;
  fullWidth?: boolean;
};
const Container = styled(LinearGradient)<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ width, fullWidth }) =>
    fullWidth ? 'width: 100%;' : width ? `width: ${width}px;` : ''}
  ${({ height }) => (height ? `height: ${height}px;` : '')}

  min-width: 64px;
  min-height: ${MIN_HEIGHT}px;
  border-radius: ${({ height }) => (height ? height / 2 : MIN_HEIGHT / 2)}px;
  border: none;
  padding: 8px;
`;

type ButtonTextProps = { disabled?: boolean };
const ButtonText = styled(Text)<ButtonTextProps>`
  font-family: SourceSansPro_400Regular;
  color: ${({ disabled }) =>
    disabled
      ? new Color({
          ...Colors.white,
          opacity: 0.5,
        }).toString()
      : Colors.white.toString()};
  font-size: 18px;
  line-height: 18px;
  margin: 0;
  padding: 0;
`;

type Props = TouchableOpacityProps &
  ContainerProps & {
    children: string;
    color?: Color;
  };

const Button: React.FC<Props> = ({
  children,
  color,
  width,
  height,
  fullWidth,
  ...props
}) => {
  const { first, second } = useStyledLinearGradient();

  return (
    <TouchableOpacity style={fullWidth ? { width: '100%' } : {}} {...props}>
      <Container
        colors={
          color
            ? [color.toString(), color.toString()]
            : [first.toString(), second.toString()]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        {...{ width, height, fullWidth }}
      >
        <ButtonText disabled={props.disabled ?? undefined}>
          {children}
        </ButtonText>
      </Container>
    </TouchableOpacity>
  );
};

export default Button;
