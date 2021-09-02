import { P2P_Transaction_Type } from '../../../generated/graphql';
import { SCREENS } from '../enums/screens';

export type MoneyStackParamList = {
  [SCREENS.MONEY]: undefined;
  [SCREENS.TRANSACTION_WITH_AMOUNT]: {
    amount: number;
    type: P2P_Transaction_Type;
  };
};
