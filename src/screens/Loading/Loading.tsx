import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

import BottomBlock from '../../components/BottomBlock';
import Column from '../../components/Column';
import { LoadingChips, LoadingList } from '../../components/Loading';
import Spacer from '../../components/Spacer';
import TopBlock from '../../components/TopBlock';
import { RAIL_SPACING } from '../../styles/spacing';

const { width } = Dimensions.get('window');

const BottomContainer = styled(Column)`
  padding: 16px;
`;

const LoadingScreen: React.FC = () => {
  return (
    <>
      <TopBlock />
      <BottomBlock>
        <BottomContainer>
          <LoadingChips amount={4} />
          <Spacer height={16} />
          <LoadingList width={width - 2 * RAIL_SPACING} numRows={6} />
        </BottomContainer>
      </BottomBlock>
    </>
  );
};

export default LoadingScreen;
