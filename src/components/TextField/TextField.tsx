import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styled, { css, useTheme } from 'styled-components';

import { Color } from '../../theme';
import Row from '../Row';
import Spacer from '../Spacer';

type ContainerProps = {
  borderColor: Color;
};
const Container = styled(Row)<ContainerProps>`
  padding: 12px;
  border: solid 2px ${({ borderColor }) => borderColor?.toString()};
  border-radius: 3px;
`;

type InputProps = {
  color: Color;
};
const Input = styled(TextInput)<InputProps>`
  ${({ color, theme }) => css`
    font-family: ${theme.typography.p.fontFamily};
    font-size: ${theme.typography.p.fontSize}px;
    font-weight: ${theme.typography.p.fontWeight};
    line-height: ${theme.typography.p.lineHeight}px;
    letter-spacing: ${theme.typography.p.letterSpacing}px;
    color: ${color.toString()};
  `}

  border: none;
  width: 100%;
`;

export type Props = TextInputProps & {
  color?: Color;
  borderColor?: Color;
  search?: boolean;
  fullWidth?: boolean;
};

const TextField: React.FC<Props> = ({
  color,
  borderColor,
  search,
  fullWidth,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Container
      alignItems="center"
      borderColor={borderColor ?? theme.colors.main.secondary}
      fullWidth={fullWidth}
    >
      {search && (
        <>
          <Ionicons name="search" size={32} />
          <Spacer width={4} />
        </>
      )}
      <Input {...props} color={color ?? theme.colors.text.primary} />
    </Container>
  );
};

export default TextField;
