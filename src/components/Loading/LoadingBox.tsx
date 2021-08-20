import React from 'react';
import { useRef } from 'react';
import { Animated, View } from 'react-native';
import styled from 'styled-components';

import { Color } from '../../theme';

const ANIMATION_DURATION = 1000;

type ContainerProps = {
  width: number;
  height: number;
};
const Container = styled(View)<ContainerProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ theme }) =>
    theme.colors.background.secondary.toString()};
  border-radius: 8px;
  overflow: hidden;
`;

type AnimationProps = {
  height: number;
  width: number;
};
const Animation = styled(Animated.View)<AnimationProps>`
  height: ${({ height }) => height}px;
  border-radius: 8px;
  background-color: ${({ theme }) =>
    new Color({
      ...theme.colors.text.secondary,
      opacity: 0.2,
    }).toString()};
`;

type Props = {
  width: number;
  height: number;
};

const Box: React.FC<Props> = ({ width, height }) => {
  const positionAnimation = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.sequence([
      Animated.timing(positionAnimation, {
        toValue: width,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(positionAnimation, {
        toValue: -width,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  return (
    <Container width={width} height={height}>
      <Animation
        style={{
          transform: [{ translateX: positionAnimation }],
        }}
        width={width}
        height={height}
      />
    </Container>
  );
};

export default Box;
