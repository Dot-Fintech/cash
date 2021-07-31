import React from 'react';
import { SvgXml } from 'react-native-svg';

import { xml } from './xml';

type Props = {
  width?: number;
  height?: number;
};

const PhoneSendIcon: React.FC<Props> = (props) => {
  return <SvgXml xml={xml} {...props} />;
};

export default PhoneSendIcon;