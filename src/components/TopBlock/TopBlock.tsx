import styled from 'styled-components';

import Column from '../Column';

export const TOP_BLOCK_HEIGHT = 264;

const TopBlock = styled(Column)`
  position: absolute;
  top: 0px;

  width: 100vw;
  height: ${TOP_BLOCK_HEIGHT}px;

  background-color: ${({ theme }) => theme.colors.main.primary.toString()};
  background-image: ${({ theme }) =>
    `linear-gradient(120deg, ${theme.colors.main.primary.toString()} 0%, ${theme.colors.main.secondary.toString()} 100%)`};
`;

export default TopBlock;
