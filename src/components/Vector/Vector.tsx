import React from 'react';
import { Image } from 'react-native';

import { DesiredIconDimensions, VectorIcon } from './types';
import { getIconDimensions } from './utils';

type Props = DesiredIconDimensions & {
  vectorIcon: VectorIcon;
};

const Vector: React.FC<Props> = ({ vectorIcon, ...props }) => {
  const { src, AR } = vectorIcon;

  const { width, height } = getIconDimensions({ AR, ...props });

  return (
    <Image source={{ uri: src, width, height }} width={width} height={height} />
  );
};

export default Vector;
