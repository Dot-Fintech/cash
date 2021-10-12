import {
  P2P_Transaction_Type,
  UserListItemFragment,
} from '../../../generated/graphql';
import { SCREENS } from '../enums/screens';

export type HomeStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.TRANSACTION_SUMMARY]: { token: string };
  [SCREENS.USER_SUMMARY]: { username: string };
  [SCREENS.TRANSACTION_WITH_USER]: {
    user: UserListItemFragment;
    type: P2P_Transaction_Type;
  };
};
