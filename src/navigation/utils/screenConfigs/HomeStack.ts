import Home from '../../../screens/Home';
import TransactionWithUser from '../../../screens/TransactionWithUser';
import UserSummary from '../../../screens/UserSummary';
import { SCREENS } from '../enums/screens';
import { StackScreenConfig } from '../types/ScreenConfig';

const HomeConfig: StackScreenConfig = {
  component: Home,
  options: { headerShown: false },
};

const UserSummaryConfig: StackScreenConfig = {
  component: UserSummary,
  options: { headerShown: false },
};

const TransactionWithUserConfig: StackScreenConfig = {
  component: TransactionWithUser,
  options: { headerShown: false },
};

export const HomeStackScreenConfigs = {
  [SCREENS.HOME]: HomeConfig,
  [SCREENS.USER_SUMMARY]: UserSummaryConfig,
  [SCREENS.TRANSACTION_WITH_USER]: TransactionWithUserConfig,
};

export const HomeStackScreenNames = Object.keys(
  HomeStackScreenConfigs,
) as (keyof typeof HomeStackScreenConfigs)[];

export type HomeStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.USER_SUMMARY]: { userId: string };
  [SCREENS.TRANSACTION_WITH_USER]: { userId: string };
};
