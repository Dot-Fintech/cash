import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Typography from '../Typography';
import type { SlideSelectOption, SlideSelectVariant } from './types';
import { getOptionContainerColor, getOptionTextColor } from './utils';

export const OPTION_HEIGHT = 40;

type ContainerProps = {
  variant?: SlideSelectVariant;
  isSelected?: boolean;
};
const Container = styled(TouchableOpacity)<ContainerProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${OPTION_HEIGHT}px;
  border-radius: ${OPTION_HEIGHT / 2}px;

  background-color: ${({ theme, variant, isSelected }) =>
    getOptionContainerColor(theme, variant, isSelected).toString()};
`;

type Props = TouchableOpacityProps &
  ContainerProps & {
    option: SlideSelectOption;
  };

const Option: React.FC<Props> = ({ option, ...props }) => {
  const theme = useTheme();

  return (
    <Container {...props}>
      <Typography
        tag="h6"
        color={getOptionTextColor(theme, props.variant, props.isSelected)}
      >
        {option.label}
      </Typography>
    </Container>
  );
};

export default Option;
