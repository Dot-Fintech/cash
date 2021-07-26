import { ViewProps } from 'react-native';

import { Props } from './Flex';

export type AlignmentValue =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type FlexProps = Omit<Props, 'flexDirection'> & ViewProps;
