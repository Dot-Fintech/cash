import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import {
  MainTabsParamList,
  MainTabsScreenConfigs,
  MainTabsScreenNames,
} from '../utils/screenConfigs/MainTabs';
import TabBar from './TabBar';

const Tabs = createBottomTabNavigator<MainTabsParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tabs.Navigator tabBar={(props) => <TabBar {...props} />}>
      {MainTabsScreenNames.map((name) => (
        <Tabs.Screen key={name} name={name} {...MainTabsScreenConfigs[name]} />
      ))}
    </Tabs.Navigator>
  );
};

export default MainTabs;
