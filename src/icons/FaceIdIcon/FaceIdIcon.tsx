import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from 'styled-components';

import { DesiredIconDimensions } from '../types';
import { getIconDimensions } from '../utils';
import { buildXml } from './xml';

const FaceIdIcon: React.FC<DesiredIconDimensions> = (props) => {
  const theme = useTheme();
  const dimensions = getIconDimensions({ AR: 1, ...props });
  return <SvgXml xml={buildXml(theme.colors.text.primary)} {...dimensions} />;
};

export default FaceIdIcon;
