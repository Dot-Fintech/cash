import { SCREENS } from '../enums/screens';

export type MoneyStackParamList = {
  [SCREENS.MONEY]: undefined;
  [SCREENS.TRANSACTION_WITH_AMOUNT]: { amount: number };
};
