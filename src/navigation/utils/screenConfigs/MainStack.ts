import MainHeader from '../../../components/MainHeader';
import Banking from '../../../screens/Banking';
import Notifications from '../../../screens/Notifications';
import Scan from '../../../screens/Scan';
import MainTabs from '../../MainTabs';
import { NAVIGATORS } from '../enums/navigators';
import { SCREENS } from '../enums/screens';
import { StackScreenConfig } from '../types/ScreenConfig';

const BankingConfig: StackScreenConfig = {
  component: Banking,
  options: { headerShown: false },
};

const ScanConfig: StackScreenConfig = {
  component: Scan,
  options: { headerShown: false },
};

const NotificationsConfig: StackScreenConfig = {
  component: Notifications,
  options: { headerShown: false },
};

const MainTabsConfig: StackScreenConfig = {
  component: MainTabs,
  options: { header: MainHeader },
};

export const MainStackScreenConfigs = {
  [SCREENS.BANKING]: BankingConfig,
  [SCREENS.SCAN]: ScanConfig,
  [SCREENS.NOTIFICATIONS]: NotificationsConfig,
  [NAVIGATORS.MAIN_TABS]: MainTabsConfig,
};

export const MainStackScreenNames = Object.keys(
  MainStackScreenConfigs,
) as (keyof typeof MainStackScreenConfigs)[];

export type MainStackParamList = {
  [SCREENS.BANKING]: undefined;
  [SCREENS.SCAN]: undefined;
  [SCREENS.NOTIFICATIONS]: undefined;
  [NAVIGATORS.MAIN_TABS]: undefined;
};
