import React from 'react';

import Flex, { FlexProps } from '../Flex';

const Column: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex {...props} flexDirection="column">
      {children}
    </Flex>
  );
};

export default Column;
