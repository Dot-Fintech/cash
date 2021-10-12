import {
  Bank_Transaction_Type,
  FullCardFragment,
} from '../../../generated/graphql';
import { SCREENS } from '../enums/screens';

/**
 * If adding a new screen to the param list,
 * also add it to the BANKING_SCREENS array.
 * (See MainHeader.tsx)
 */
export type BankingStackParamList = {
  [SCREENS.BANKING]: undefined;
  [SCREENS.TRANSACTION_WITH_CARD]: {
    card: FullCardFragment;
    type: Bank_Transaction_Type;
  };
};

export const BANKING_SCREENS: string[] = [
  SCREENS.BANKING,
  SCREENS.TRANSACTION_WITH_CARD,
];
