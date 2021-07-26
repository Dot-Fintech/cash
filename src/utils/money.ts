export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const moneyFloor = (value: number): number =>
  Math.floor(value * 100) / 100;

export const moneyRound = (value: number): number =>
  Math.round(value * 100) / 100;
