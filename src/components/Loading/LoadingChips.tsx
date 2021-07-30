import React from 'react';

import Row from '../Row';
import Spacer from '../Spacer';
import LoadingBox from './LoadingBox';

const LoadingChips: React.FC = () => {
  return (
    <Row fullWidth>
      <LoadingBox width={64} height={20} />
      <Spacer width={16} />
      <LoadingBox width={64} height={20} />
      <Spacer width={16} />
      <LoadingBox width={64} height={20} />
    </Row>
  );
};

export default LoadingChips;
