import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from 'styled-components';

import { DesiredIconDimensions } from '../types';
import { getIconDimensions } from '../utils';
import { buildXml } from './xml';

const FingerprintIcon: React.FC<DesiredIconDimensions> = (props) => {
  const theme = useTheme();
  const dimensions = getIconDimensions({ AR: 362 / 512, ...props });
  return <SvgXml xml={buildXml(theme.colors.text.primary)} {...dimensions} />;
};

export default FingerprintIcon;
