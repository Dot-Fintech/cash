import { Dimensions } from 'react-native';
import { css } from 'styled-components';

import { RAIL_SPACING } from '../../styles/spacing';

const { width } = Dimensions.get('window');

const CARD_AR = 1.5;
const CARD_PADDING = 8;
export const CARD_WIDTH = width - 2 * RAIL_SPACING;
export const CARD_HEIGHT = CARD_WIDTH / CARD_AR;

export const cardStyles = css`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  padding: ${CARD_PADDING}px;
  border-radius: 8px;
`;
