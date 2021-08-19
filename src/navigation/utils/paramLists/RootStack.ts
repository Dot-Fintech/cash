import { NAVIGATORS } from '../enums/navigators';
import { SCREENS } from '../enums/screens';

export type RootStackParamList = {
  [SCREENS.LANDING]: undefined;
  [SCREENS.LOGIN]: undefined;
  [NAVIGATORS.MAIN_TABS]: undefined;
  [NAVIGATORS.SIGNUP_STACK]: undefined;
};
