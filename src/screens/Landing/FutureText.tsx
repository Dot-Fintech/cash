import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import Row from '../../components/Row';
import Spacer from '../../components/Spacer';
import Typography from '../../components/Typography';
import { ACTION_WORDS } from './utils';

const FutureText: React.FC = () => {
  const { colors } = useTheme();

  const [actionIndex, setActionIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActionIndex(
        actionIndex === ACTION_WORDS.length - 1 ? 0 : actionIndex + 1,
      );
    }, 2000);

    return () => clearTimeout(timeout);
  }, [actionIndex]);

  return (
    <Row>
      <Typography tag="h6">The future of</Typography>
      <Spacer width={4} />
      <Typography tag="h6" color={colors.main.primary}>
        {ACTION_WORDS[actionIndex]}
      </Typography>
      <Spacer width={4} />
      <Typography tag="h6">is finally here</Typography>
    </Row>
  );
};

export default FutureText;
