import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Typography from '../Typography';

const NumberButton = styled(Button)`
  width: 33%;
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
    <NumberButton onPress={handleClick}>
      <Typography tag="h2">{value}</Typography>
    </NumberButton>
  );
};

export default Number;
