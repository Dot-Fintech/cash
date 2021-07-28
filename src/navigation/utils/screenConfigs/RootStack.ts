import Landing from '../../../screens/Landing';
import Login from '../../../screens/Login';
import MainStack from '../../MainStack';
import SignUpStack from '../../SignUpStack';
import { NAVIGATORS } from '../enums/navigators';
import { SCREENS } from '../enums/screens';
import { StackScreenConfig } from '../types/ScreenConfig';

const LandingConfig: StackScreenConfig = {
  component: Landing,
  options: { headerShown: false },
};

const LoginConfig: StackScreenConfig = {
  component: Login,
  options: { headerShown: false },
};

const MainStackConfig: StackScreenConfig = {
  component: MainStack,
  options: { headerShown: false, gestureEnabled: false },
};

const SignUpStackConfig: StackScreenConfig = {
  component: SignUpStack,
  options: { headerShown: false },
};

export const RootStackScreenConfigs = {
  [SCREENS.LANDING]: LandingConfig,
  [SCREENS.LOGIN]: LoginConfig,
  [NAVIGATORS.MAIN_STACK]: MainStackConfig,
  [NAVIGATORS.SIGNUP_STACK]: SignUpStackConfig,
};

export const RootStackScreenNames = Object.keys(
  RootStackScreenConfigs,
) as (keyof typeof RootStackScreenConfigs)[];

export type RootStackParamList = {
  [SCREENS.LANDING]: undefined;
  [SCREENS.LOGIN]: undefined;
  [NAVIGATORS.MAIN_STACK]: undefined;
  [NAVIGATORS.SIGNUP_STACK]: undefined;
};
