import { SCREENS } from '../enums/screens';

export type HomeStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.USER_SUMMARY]: { userId: string };
  [SCREENS.TRANSACTION_WITH_USER]: { userId: string };
};
