import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  RootStackParamList,
  RootStackScreenConfigs,
  RootStackScreenNames,
} from '../utils/screenConfigs/RootStack';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator>
      {RootStackScreenNames.map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          {...RootStackScreenConfigs[name]}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RootStack;
