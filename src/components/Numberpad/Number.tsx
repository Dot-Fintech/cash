import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components';

import Button from '../Button';
import Typography from '../Typography';

const NumberButton = styled(Button)`
  width: 100%;
  padding: 0;
`;

type Props = {
  value: number;
  onClick: (value: number) => void;
};

const Number: React.FC<Props> = ({ value, onClick }) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <NumberButton variant="lean" onPress={handleClick}>
      <Typography tag="h2" color={Colors.white}>
        {value}
      </Typography>
    </NumberButton>
  );
};

export default Number;
