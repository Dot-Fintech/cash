import { Time_Frame } from '../../generated/graphql';

export const getTimeFrameSymbol = (timeFrame: Time_Frame): string => {
  switch (timeFrame) {
    case Time_Frame.OneWeek:
      return '1W';
    case Time_Frame.OneMonth:
      return '1M';
    case Time_Frame.ThreeMonths:
      return '3M';
    case Time_Frame.SixMonths:
      return '6M';
    case Time_Frame.OneYear:
      return '1Y';
  }
};
