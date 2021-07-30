import React from 'react';

import Column from '../Column';
import Spacer from '../Spacer';
import LoadingBox from './LoadingBox';

type Props = {
  width: number;
  numRows: number;
};

const LoadingList: React.FC<Props> = ({ width, numRows }) => {
  const rows = new Array(numRows).fill(null);

  return (
    <>
      {rows.map((_, index) => (
        <Column key={index}>
          {index > 0 && <Spacer height={16} />}
          <LoadingBox width={width} height={60} />
        </Column>
      ))}
    </>
  );
};

export default LoadingList;
