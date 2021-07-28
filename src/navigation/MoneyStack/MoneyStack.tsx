import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  MoneyStackParamList,
  MoneyStackScreenConfigs,
  MoneyStackScreenNames,
} from '../utils/screenConfigs/MoneyStack';

const Stack = createStackNavigator<MoneyStackParamList>();

const MoneyStack: React.FC = () => {
  return (
    <Stack.Navigator>
      {MoneyStackScreenNames.map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          {...MoneyStackScreenConfigs[name]}
        />
      ))}
    </Stack.Navigator>
  );
};

export default MoneyStack;
