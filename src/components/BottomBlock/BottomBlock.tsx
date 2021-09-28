import { Dimensions } from 'react-native';
import styled from 'styled-components';

import Column from '../Column';
import { TOP_BLOCK_HEIGHT } from '../TopBlock';

export const BOTTOM_BLOCK_BORDER_RADIUS = 20;

const { width, height } = Dimensions.get('window');

const BottomBlock = styled(Column)`
  position: absolute;
  bottom: 0;
  width: ${width}px;
  height: ${height - TOP_BLOCK_HEIGHT + BOTTOM_BLOCK_BORDER_RADIUS}px;
  border-radius: ${BOTTOM_BLOCK_BORDER_RADIUS}px;
  background-color: ${({ theme }) =>
    theme.colors.background.primary.toString()};
`;

export default BottomBlock;
