import { DailyBalance } from '../../generated/graphql';

export const data: DailyBalance[] = [
  { date: new Date(2021, 9, 1), balance: 0 },
  { date: new Date(2021, 9, 2), balance: 0 },
  { date: new Date(2021, 9, 3), balance: 100 },
  { date: new Date(2021, 9, 4), balance: 70 },
  { date: new Date(2021, 9, 5), balance: 200 },
  { date: new Date(2021, 9, 6), balance: 200 },
];
