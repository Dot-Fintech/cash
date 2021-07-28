import ExplorePeople from '../../../screens/ExplorePeople';
import ExploreStores from '../../../screens/ExploreStores';
import { SCREENS } from '../enums/screens';
import { TabScreenConfig } from '../types/ScreenConfig';

const ExploreStoresConfig: TabScreenConfig = {
  component: ExploreStores,
  options: { tabBarVisible: false },
};

const ExplorePeopleConfig: TabScreenConfig = {
  component: ExplorePeople,
  options: { tabBarVisible: false },
};

export const ExploreTabsScreenConfigs = {
  [SCREENS.EXPLORE_STORES]: ExploreStoresConfig,
  [SCREENS.EXPLORE_PEOPLE]: ExplorePeopleConfig,
};

export const ExploreTabsScreenNames = Object.keys(
  ExploreTabsScreenConfigs,
) as (keyof typeof ExploreTabsScreenConfigs)[];

export type ExploreTabsParamList = {
  [SCREENS.EXPLORE_STORES]: undefined;
  [SCREENS.EXPLORE_PEOPLE]: undefined;
};
