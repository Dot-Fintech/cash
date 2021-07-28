import Metrics from '../../../screens/Metrics';
import ExploreTabs from '../../ExploreTabs';
import HomeStack from '../../HomeStack';
import MoneyStack from '../../MoneyStack';
import ProfileStack from '../../ProfileStack';
import { NAVIGATORS } from '../enums/navigators';
import { SCREENS } from '../enums/screens';
import { TabScreenConfig } from '../types/ScreenConfig';

const HomeStackConfig: TabScreenConfig = {
  component: HomeStack,
};

const ExploreTabsConfig: TabScreenConfig = {
  component: ExploreTabs,
};

const MoneyStackConfig: TabScreenConfig = {
  component: MoneyStack,
};

const MetricsConfig: TabScreenConfig = {
  component: Metrics,
};

const ProfileConfig: TabScreenConfig = {
  component: ProfileStack,
};

export const MainTabsScreenConfigs = {
  [NAVIGATORS.HOME_STACK]: HomeStackConfig,
  [NAVIGATORS.EXPLORE_TABS]: ExploreTabsConfig,
  [NAVIGATORS.MONEY_STACK]: MoneyStackConfig,
  [SCREENS.METRICS]: MetricsConfig,
  [NAVIGATORS.PROFILE_STACK]: ProfileConfig,
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
};
