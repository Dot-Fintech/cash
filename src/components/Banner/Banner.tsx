import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components';

import { Color } from '../../theme';
import { Colors } from '../../theme/utils';
import Row from '../Row';
import Spacer from '../Spacer';
import Typography from '../Typography';

type ContainerProps = {
  color: Color;
  paddingTop?: number;
};
const Container = styled(View)<ContainerProps>`
  background-color: ${({ color }) => color.toString()};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ paddingTop }) =>
    paddingTop ? `${paddingTop}px 16px 8px` : '8px'};
`;

export type Props = {
  isOpen: boolean;
  close: () => void;
  color?: Color;
  alert?: boolean;
};

const Banner: React.FC<Props> = ({ children, isOpen, close, color, alert }) => {
  const { top } = useSafeAreaInsets();

  return isOpen ? (
    <Container color={color ?? Colors.white} paddingTop={top}>
      <Row justifyContent="center" alignItems="center" fullWidth>
        {alert && (
          <>
            <Ionicons color={Colors.white.toString()} name="alert" size={16} />
            <Spacer width={8} />
          </>
        )}
        <Typography tag="p" color={Colors.white}>
          {children}
        </Typography>
      </Row>
      <TouchableOpacity onPress={close}>
        <Ionicons
          color={Colors.white.toString()}
          name="close-circle"
          size={16}
        />
      </TouchableOpacity>
    </Container>
  ) : null;
};

export default Banner;
