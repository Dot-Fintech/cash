import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

import BigPayIcon from '../../icons/BigPayIcon';
import Column from '../Column';
import Spacer from '../Spacer';
import { TOP_BLOCK_HEIGHT } from '../TopBlock';
import Typography from '../Typography';

const Container = styled(Column)`
  height: ${Dimensions.get('window').height - TOP_BLOCK_HEIGHT}px;
`;

type Props = {
  title: string;
  description: string;
};

const EmptyState: React.FC<Props> = ({ title, description }) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsHidden(false), 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return !isHidden ? (
    <Container justifyContent="center" alignItems="center" fullWidth>
      <Typography tag="h4" textAlign="center">
        {title}
      </Typography>
      <Spacer height={16} />
      <BigPayIcon width={window.innerWidth / 3} />
      <Spacer height={16} />
      <Typography tag="h6" textAlign="center">
        {description}
      </Typography>
    </Container>
  ) : null;
};

export default EmptyState;
