import React from 'react';

import Flex, { FlexProps } from '../Flex';

const Row: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex {...props} flexDirection="row">
      {children}
    </Flex>
  );
};

export default Row;
