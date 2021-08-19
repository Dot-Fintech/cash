import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Banking from '../../screens/Banking';
import Metrics from '../../screens/Metrics';
import Notifications from '../../screens/Notifications';
import Scan from '../../screens/Scan';
import ExploreTabs from '../ExploreTabs';
import HomeStack from '../HomeStack';
import MoneyStack from '../MoneyStack';
import ProfileStack from '../ProfileStack';
import { NAVIGATORS } from '../utils/enums/navigators';
import { SCREENS } from '../utils/enums/screens';
import { MainTabsParamList } from '../utils/paramLists/MainTabs';
import TabBar from './TabBar';

const Tabs = createBottomTabNavigator<MainTabsParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tabs.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        component={HomeStack}
        name={NAVIGATORS.HOME_STACK}
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        component={ExploreTabs}
        name={NAVIGATORS.EXPLORE_TABS}
        options={{ title: 'Explore' }}
      />
      <Tabs.Screen
        component={MoneyStack}
        name={NAVIGATORS.MONEY_STACK}
        options={{ title: 'Money' }}
      />
      <Tabs.Screen
        component={Metrics}
        name={SCREENS.METRICS}
        options={{ title: 'Metrics' }}
      />
      <Tabs.Screen
        component={ProfileStack}
        name={NAVIGATORS.PROFILE_STACK}
        options={{ title: 'Profile' }}
      />
      <Tabs.Screen
        component={Banking}
        name={SCREENS.BANKING}
        options={{ title: '' }}
      />
      <Tabs.Screen
        component={Scan}
        name={SCREENS.SCAN}
        options={{ title: '' }}
      />
      <Tabs.Screen
        component={Notifications}
        name={SCREENS.NOTIFICATIONS}
        options={{ title: '' }}
      />
    </Tabs.Navigator>
  );
};

export default MainTabs;
