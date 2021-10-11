import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import Typography from '../Typography';

const NumberButton = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 33%;
  padding: 0;
`;

type Props = {
  value: number;
  onPress: (value: number) => void;
};

const Number: React.FC<Props> = ({ value, onPress }) => {
  const handleClick = () => {
    onPress(value);
  };

  return (
    <NumberButton onPress={handleClick}>
      <Typography tag="h2">{value}</Typography>
    </NumberButton>
  );
};

export default Number;
