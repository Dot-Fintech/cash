import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { useTheme } from 'styled-components';

import { Color, Colors } from '../../theme';
import Typography from '../Typography';

const HEIGHT = 40;

type ContainerProps = {
  variant?: 'color' | 'translucent';
};
const Container = styled(TouchableOpacity)<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${HEIGHT}px;
  border-radius: ${HEIGHT / 2}px;
  background-color: ${({ theme, variant }) =>
    variant === 'translucent'
      ? new Color({ r: 0, g: 0, b: 0, opacity: 0.1 }).toString()
      : theme.colors.background.secondary.toString()};
  padding: 8px;
`;

type Props = TouchableOpacityProps & ContainerProps;

const Pill: React.FC<Props> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <Container {...props}>
      <Typography
        tag="h6"
        color={
          props.variant === 'translucent'
            ? Colors.white
            : theme.colors.main.secondary
        }
      >
        {children}
      </Typography>
    </Container>
  );
};

export default Pill;
