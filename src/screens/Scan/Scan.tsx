import React from 'react';

import MainHeader from '../../components/MainHeader';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';

const Scan: React.FC = () => {
  return (
    <Screen>
      <MainHeader />
      <Spacer height={16} />
    </Screen>
  );
};

export default Scan;
