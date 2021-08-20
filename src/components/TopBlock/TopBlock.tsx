import { Dimensions } from 'react-native';
import styled from 'styled-components';

import Column from '../Column';

export const TOP_BLOCK_HEIGHT = 264;

const TopBlock = styled(Column)`
  position: absolute;
  top: 0;
  width: ${Dimensions.get('window').width}px;
  height: ${TOP_BLOCK_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.main.primary.toString()};
`;

export default TopBlock;
