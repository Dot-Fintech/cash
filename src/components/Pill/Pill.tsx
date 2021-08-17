import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components';

import { Colors } from '../../theme';
import Typography from '../Typography';

const HEIGHT = 40;

const Container = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${HEIGHT}px;
  border-radius: ${HEIGHT / 2}px;
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 8px;
`;

type Props = TouchableOpacityProps;

const Pill: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Typography tag="h6" color={Colors.white}>
        {children}
      </Typography>
    </Container>
  );
};

export default Pill;
