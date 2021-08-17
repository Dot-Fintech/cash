import { moneyFloor, moneyRound } from '../../utils/money';

export const pushValue = (amount: number, value: number): number =>
  value > 0 ? moneyRound(amount * 10 + value / 100) : moneyFloor(amount * 10);

export const popValue = (amount: number): number => {
  if (amount <= 0) return 0;
  const centsString = String(amount).split('.')[1];
  const cent =
    centsString && centsString.length > 1 ? parseFloat(centsString[1]) : 0;
  return moneyRound((amount - cent / 100) / 10);
};
