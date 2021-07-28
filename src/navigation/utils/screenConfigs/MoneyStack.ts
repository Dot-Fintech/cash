import Money from '../../../screens/Money';
import TransactionWithAmount from '../../../screens/TransactionWithAmount';
import { SCREENS } from '../enums/screens';
import { StackScreenConfig } from '../types/ScreenConfig';

const MoneyConfig: StackScreenConfig = {
  component: Money,
  options: { headerShown: false },
};

const TransactionWithAmountConfig: StackScreenConfig = {
  component: TransactionWithAmount,
  options: { headerShown: false },
};

export const MoneyStackScreenConfigs = {
  [SCREENS.MONEY]: MoneyConfig,
  [SCREENS.TRANSACTION_WITH_AMOUNT]: TransactionWithAmountConfig,
};

export const MoneyStackScreenNames = Object.keys(
  MoneyStackScreenConfigs,
) as (keyof typeof MoneyStackScreenConfigs)[];

export type MoneyStackParamList = {
  [SCREENS.MONEY]: undefined;
  [SCREENS.TRANSACTION_WITH_AMOUNT]: { amount: number };
};
