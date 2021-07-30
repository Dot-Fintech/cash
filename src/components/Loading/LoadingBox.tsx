import React from 'react';
import { View } from 'react-native';
import styled, { keyframes, useTheme } from 'styled-components';

import type { Color } from '../../theme';
import { getAnimationColors } from './utils';

type ContainerProps = {
  width: number;
  height: number;
};
const Container = styled(View)<ContainerProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) =>
    theme.colors.background.secondary.toString()};

  position: relative;
  border-radius: 8px;
`;

const animation = (
  width: number,
  primary: Color,
  secondary: Color,
) => keyframes`
  0% {
    background-color: ${primary.toString()};
    width: 0;
    left: 0;
  }
  25%{
    background-color: ${primary.toString()};
    width: ${width}px;
    left: 0;
  }
  50%{
    background-color: ${secondary.toString()};
    width: 0;
    left: ${width}px;
  }
  75% {
    background-color: ${secondary.toString()};
    width: ${width}px;
    left: 0;
  }
  100% {
    background-color: ${primary.toString()};
    width: 0;
    left: 0;
  }
`;

type AnimationProps = {
  width: number;
  height: number;
  primary: Color;
  secondary: Color;
};
const Animation = styled(View)<AnimationProps>`
  height: ${({ height }) => height}px;

  animation: ${({ width, primary, secondary }) =>
      animation(width, primary, secondary)}
    2s ease infinite;

  position: absolute;
  border-radius: 8px;
  width: 0;
`;

type Props = {
  width: number;
  height: number;
};

const Box: React.FC<Props> = ({ width, height }) => {
  const theme = useTheme();

  const { primary, secondary } = getAnimationColors(theme);

  return (
    <Container width={width} height={height}>
      <Animation
        width={width}
        height={height}
        primary={primary}
        secondary={secondary}
      />
    </Container>
  );
};

export default Box;
