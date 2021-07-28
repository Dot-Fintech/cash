import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  HomeStackParamList,
  HomeStackScreenConfigs,
  HomeStackScreenNames,
} from '../utils/screenConfigs/HomeStack';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      {HomeStackScreenNames.map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          {...HomeStackScreenConfigs[name]}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
