import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import {
  ExploreTabsParamList,
  ExploreTabsScreenConfigs,
  ExploreTabsScreenNames,
} from '../utils/screenConfigs/ExploreTabs';

const Tabs = createBottomTabNavigator<ExploreTabsParamList>();

const ExploreTabs: React.FC = () => {
  return (
    <Tabs.Navigator>
      {ExploreTabsScreenNames.map((name) => (
        <Tabs.Screen
          key={name}
          name={name}
          {...ExploreTabsScreenConfigs[name]}
        />
      ))}
    </Tabs.Navigator>
  );
};

export default ExploreTabs;
