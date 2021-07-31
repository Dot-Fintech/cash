import React from 'react';
import { SvgXml } from 'react-native-svg';

import { DesiredIconDimensions } from '../types';
import { getIconDimensions } from '../utils';
import { xml } from './xml';

const PhonePayIcon: React.FC<DesiredIconDimensions> = (props) => {
  const dimensions = getIconDimensions({ AR: 512 / 357.12, ...props });
  return <SvgXml xml={xml} {...dimensions} />;
};

export default PhonePayIcon;
