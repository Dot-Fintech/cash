import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled, { useTheme } from 'styled-components';

import Column from '../../components/Column';
import DailyBalancesChart from '../../components/DailyBalancesChart';
import MainHeader from '../../components/MainHeader';
import Screen from '../../components/Screen';
import Spacer from '../../components/Spacer';
import TimeFramePicker from '../../components/TimeFramePicker';
import Typography from '../../components/Typography';
import { Time_Frame } from '../../generated/graphql';
import { RAIL_SPACING } from '../../styles/spacing';

const { width } = Dimensions.get('window');

const Container = styled(Column)`
  padding-top: 16px;
`;

const ContentContainer = styled(Column)`
  padding: 16px ${RAIL_SPACING}px 0;
`;

const Metrics: React.FC = () => {
  const theme = useTheme();

  const selectedTimeFrameState = useState(Time_Frame.OneWeek);

  return (
    <Screen>
      <MainHeader iconColor={theme.colors.text.primary} />
      <Container>
        <ContentContainer>
          <Typography tag="h4">Balance</Typography>
        </ContentContainer>
        <Spacer height={8} />
        <DailyBalancesChart
          width={width}
          height={400}
          selectedTimeFrameState={selectedTimeFrameState}
        />
        <Spacer height={16} />
        <ContentContainer>
          <TimeFramePicker selectedTimeFrameState={selectedTimeFrameState} />
        </ContentContainer>
      </Container>
    </Screen>
  );
};

export default Metrics;
