import React from 'react';

import Row from '../Row';
import Spacer from '../Spacer';
import LoadingBox from './LoadingBox';

type Props = {
  amount: number;
};

const LoadingChips: React.FC<Props> = ({ amount }) => {
  const chips = new Array(amount).fill(null);

  return (
    <Row fullWidth>
      {chips.map((_, index) => (
        <React.Fragment key={index}>
          <LoadingBox width={64} height={20} />
          {index !== amount - 1 && <Spacer width={16} />}
        </React.Fragment>
      ))}
    </Row>
  );
};

export default LoadingChips;
