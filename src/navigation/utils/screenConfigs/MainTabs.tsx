import React from 'react';

import TabBarIcon from '../../../components/TabBarIcon';
import TabBarLabel from '../../../components/TabBarLabel';
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
  options: {
    tabBarIcon: (props) => <TabBarIcon name="home" {...props} />,
    tabBarLabel: (props) => <TabBarLabel text="Home" {...props} />,
  },
};

const ExploreTabsConfig: TabScreenConfig = {
  component: ExploreTabs,
  options: {
    tabBarIcon: (props) => <TabBarIcon name="compass" {...props} />,
    tabBarLabel: (props) => <TabBarLabel text="Explore" {...props} />,
  },
};

const MoneyStackConfig: TabScreenConfig = {
  component: MoneyStack,
  options: {
    tabBarIcon: (props) => <TabBarIcon name="money" {...props} />,
    tabBarLabel: () => null,
  },
};

const MetricsConfig: TabScreenConfig = {
  component: Metrics,
  options: {
    tabBarIcon: (props) => <TabBarIcon name="trending-up" {...props} />,
    tabBarLabel: (props) => <TabBarLabel text="Metrics" {...props} />,
  },
};

const ProfileConfig: TabScreenConfig = {
  component: ProfileStack,
  options: {
    tabBarIcon: (props) => <TabBarIcon name="person" {...props} />,
    tabBarLabel: (props) => <TabBarLabel text="Profile" {...props} />,
  },
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
