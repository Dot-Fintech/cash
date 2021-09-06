import { Dimensions } from 'react-native';

import { RAIL_SPACING } from '../../../styles/spacing';

export const RESULTS_CONTAINER_PADDING = 16;
export const LABEL_WRAPPER_WIDTH = 48;
export const LABEL_SPACER_WIDTH = 8;
export const TEXT_FIELD_WIDTH =
  Dimensions.get('window').width -
  (RESULTS_CONTAINER_PADDING * 2 + RAIL_SPACING * 2 + LABEL_WRAPPER_WIDTH);
