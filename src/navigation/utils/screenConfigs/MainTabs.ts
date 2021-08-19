import Banking from '../../../screens/Banking';
import Metrics from '../../../screens/Metrics';
import Notifications from '../../../screens/Notifications';
import Scan from '../../../screens/Scan';
import ExploreTabs from '../../ExploreTabs';
import HomeStack from '../../HomeStack';
import MoneyStack from '../../MoneyStack';
import ProfileStack from '../../ProfileStack';
import { NAVIGATORS } from '../enums/navigators';
import { SCREENS } from '../enums/screens';
import { TabScreenConfig } from '../types/ScreenConfig';

const HomeStackConfig: TabScreenConfig = {
  component: HomeStack,
  options: {
    title: 'Home',
  },
};

const ExploreTabsConfig: TabScreenConfig = {
  component: ExploreTabs,
  options: {
    title: 'Explore',
  },
};

const MoneyStackConfig: TabScreenConfig = {
  component: MoneyStack,
  options: {
    title: 'Money',
  },
};

const MetricsConfig: TabScreenConfig = {
  component: Metrics,
  options: {
    title: 'Metrics',
  },
};

const ProfileConfig: TabScreenConfig = {
  component: ProfileStack,
  options: {
    title: 'Profile',
  },
};

const BankingConfig: TabScreenConfig = {
  component: Banking,
  options: { title: '' },
};

const ScanConfig: TabScreenConfig = {
  component: Scan,
  options: { title: '' },
};

const NotificationsConfig: TabScreenConfig = {
  component: Notifications,
  options: { title: '' },
};

export const MainTabsScreenConfigs = {
  [NAVIGATORS.HOME_STACK]: HomeStackConfig,
  [NAVIGATORS.EXPLORE_TABS]: ExploreTabsConfig,
  [NAVIGATORS.MONEY_STACK]: MoneyStackConfig,
  [SCREENS.METRICS]: MetricsConfig,
  [NAVIGATORS.PROFILE_STACK]: ProfileConfig,
  [SCREENS.BANKING]: BankingConfig,
  [SCREENS.SCAN]: ScanConfig,
  [SCREENS.NOTIFICATIONS]: NotificationsConfig,
};

export const MainTabsScreenNames = Object.keys(
  MainTabsScreenConfigs,
) as (keyof typeof MainTabsScreenConfigs)[];

export type MainTabsParamList = {
  [NAVIGATORS.HOME_STACK]: undefined;
  [NAVIGATORS.EXPLORE_TABS]: undefined;
  [NAVIGATORS.MONEY_STACK]: undefined;
  [SCREENS.METRICS]: undefined;
  [NAVIGATORS.PROFILE_STACK]: undefined;
  [SCREENS.BANKING]: undefined;
  [SCREENS.SCAN]: undefined;
  [SCREENS.NOTIFICATIONS]: undefined;
};
