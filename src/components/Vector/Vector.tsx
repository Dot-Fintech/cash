import React from 'react';

import { DesiredIconDimensions, VectorIcon } from './types';
import { getIconDimensions } from './utils';

type Props = DesiredIconDimensions & {
  vectorIcon: VectorIcon;
};

const Vector: React.FC<Props> = ({ vectorIcon, ...props }) => {
  const { src, AR } = vectorIcon;
  const Icon = src;

  const { width, height } = getIconDimensions({ AR, ...props });

  return <Icon width={width} height={height} />;
};

export default Vector;
