import { SCREENS } from '../enums/screens';

export type HomeStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.TRANSACTION_SUMMARY]: { id: string };
  [SCREENS.USER_SUMMARY]: { id: string };
  [SCREENS.TRANSACTION_WITH_USER]: { userId: string };
};
