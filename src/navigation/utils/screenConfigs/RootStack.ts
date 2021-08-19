import MainHeader from '../../../components/MainHeader';
import Landing from '../../../screens/Landing';
import Login from '../../../screens/Login';
import MainTabs from '../../MainTabs';
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

const MainTabsConfig: StackScreenConfig = {
  component: MainTabs,
  options: { header: MainHeader, gestureEnabled: false },
};

const SignUpStackConfig: StackScreenConfig = {
  component: SignUpStack,
  options: { headerShown: false },
};

export const RootStackScreenConfigs = {
  [SCREENS.LANDING]: LandingConfig,
  [SCREENS.LOGIN]: LoginConfig,
  [NAVIGATORS.MAIN_TABS]: MainTabsConfig,
  [NAVIGATORS.SIGNUP_STACK]: SignUpStackConfig,
};

export const RootStackScreenNames = Object.keys(
  RootStackScreenConfigs,
) as (keyof typeof RootStackScreenConfigs)[];

export type RootStackParamList = {
  [SCREENS.LANDING]: undefined;
  [SCREENS.LOGIN]: undefined;
  [NAVIGATORS.MAIN_TABS]: undefined;
  [NAVIGATORS.SIGNUP_STACK]: undefined;
};
