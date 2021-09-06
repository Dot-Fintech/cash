import React from 'react';

import { LoadingBox } from '../../../components/Loading';
import Row from '../../../components/Row';
import Spacer from '../../../components/Spacer';

const LoadingMessages: React.FC = () => {
  return (
    <>
      <Row fullWidth>
        <LoadingBox width={180} height={60} />
      </Row>
      <Spacer height={16} />
      <Row justifyContent="flex-end" fullWidth>
        <LoadingBox width={180} height={60} />
      </Row>
      <Spacer height={16} />
      <Row fullWidth>
        <LoadingBox width={180} height={60} />
      </Row>
      <Spacer height={16} />
      <Row justifyContent="flex-end" fullWidth>
        <LoadingBox width={180} height={60} />
      </Row>
      <Spacer height={16} />
    </>
  );
};

export default LoadingMessages;
