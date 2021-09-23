import React from 'react';

import { Time_Frame } from '../../generated/graphql';
import Chip from '../Chip';
import Row from '../Row';
import Spacer from '../Spacer';
import { getTimeFrameSymbol } from './utils';

type Props = {
  selectedTimeFrameState: [
    Time_Frame,
    React.Dispatch<React.SetStateAction<Time_Frame>>,
  ];
};

const TimeFramePicker: React.FC<Props> = ({ selectedTimeFrameState }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = selectedTimeFrameState;

  return (
    <Row fullWidth>
      <Chip
        onPress={() => setSelectedTimeFrame(Time_Frame.OneWeek)}
        isSelected={Time_Frame.OneWeek === selectedTimeFrame}
      >
        {getTimeFrameSymbol(Time_Frame.OneWeek)}
      </Chip>
      <Spacer width={16} />
      <Chip
        onPress={() => setSelectedTimeFrame(Time_Frame.OneMonth)}
        isSelected={Time_Frame.OneMonth === selectedTimeFrame}
      >
        {getTimeFrameSymbol(Time_Frame.OneMonth)}
      </Chip>
      <Spacer width={16} />
      <Chip
        onPress={() => setSelectedTimeFrame(Time_Frame.ThreeMonths)}
        isSelected={Time_Frame.ThreeMonths === selectedTimeFrame}
      >
        {getTimeFrameSymbol(Time_Frame.ThreeMonths)}
      </Chip>
      <Spacer width={16} />
      <Chip
        onPress={() => setSelectedTimeFrame(Time_Frame.SixMonths)}
        isSelected={Time_Frame.SixMonths === selectedTimeFrame}
      >
        {getTimeFrameSymbol(Time_Frame.SixMonths)}
      </Chip>
    </Row>
  );
};

export default TimeFramePicker;
