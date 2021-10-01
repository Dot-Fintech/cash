import React from 'react';
import { Dimensions } from 'react-native';

import BigPayIcon from '../../icons/BigPayIcon';
import Column from '../Column';
import Spacer from '../Spacer';
import Typography from '../Typography';

const { width } = Dimensions.get('window');

type Props = {
  title: string;
  description: string;
};

const EmptyState: React.FC<Props> = ({ title, description }) => {
  return (
    <Column justifyContent="center" alignItems="center" fullWidth>
      <Typography tag="h4" textAlign="center">
        {title}
      </Typography>
      <Spacer height={16} />
      <BigPayIcon width={width / 3} />
      <Spacer height={16} />
      <Typography tag="h6" textAlign="center">
        {description}
      </Typography>
    </Column>
  );
};

export default EmptyState;
