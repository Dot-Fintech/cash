import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ExplorePeople from '../../screens/ExplorePeople';
import ExploreStores from '../../screens/ExploreStores';
import { SCREENS } from '../utils/enums/screens';
import { ExploreTabsParamList } from '../utils/paramLists/ExploreTabs';

const Tabs = createBottomTabNavigator<ExploreTabsParamList>();

const ExploreTabs: React.FC = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        component={ExploreStores}
        name={SCREENS.EXPLORE_STORES}
        options={{ tabBarVisible: false }}
      />
      <Tabs.Screen
        component={ExplorePeople}
        name={SCREENS.EXPLORE_PEOPLE}
        options={{ tabBarVisible: false }}
      />
    </Tabs.Navigator>
  );
};

export default ExploreTabs;
