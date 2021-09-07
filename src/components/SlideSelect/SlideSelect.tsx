import React from 'react';
import styled from 'styled-components';

import Row from '../Row';
import Option, { OPTION_HEIGHT } from './Option';
import type { SlideSelectOption, SlideSelectVariant } from './types';

const Container = styled(Row)`
  border-radius: ${OPTION_HEIGHT / 2}px;
  min-height: ${OPTION_HEIGHT}px;
  overflow: hidden;
`;

type Props = {
  variant?: SlideSelectVariant;
  selectedOption: SlideSelectOption;
  setSelectedOption: (selectedOption: SlideSelectOption) => void;
  options: SlideSelectOption[];
};

const SlideSelect: React.FC<Props> = ({
  variant,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <Container fullWidth>
      {options.map((option) => (
        <Option
          key={option.id}
          option={option}
          isSelected={option.id === selectedOption.id}
          onPress={() => setSelectedOption(option)}
          variant={variant}
        />
      ))}
    </Container>
  );
};

export default SlideSelect;
